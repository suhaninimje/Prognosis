import csv
import json
import os
import glob
from datetime import datetime
from epiweeks import Week  # Ensure this module is installed

# --- Step 1. List and sort image files from the directory ---
IMAGE_DIR = "Kolhapur_Sentinel_Images/images/530/"
image_pattern = os.path.join(IMAGE_DIR, "image_*.tiff")
image_files = glob.glob(image_pattern)

# Parse each image file's date and build a sorted list: [(date_obj, full_filepath), ...]
images = []
for file in image_files:
    base = os.path.basename(file)
    # Expecting filenames like "image_2018-01-10.tiff"
    try:
        date_str = base[len("image_"):-len(".tiff")]
        # Convert to a date object
        date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
        images.append((date_obj, file))
    except Exception as e:
        print(f"Warning: Could not parse date from {file}: {e}")

images.sort(key=lambda x: x[0])
if not images:
    raise ValueError("No valid image files found in the directory.")

# --- Step 2. Process CSV rows using the epiweek module ---
input_csv = "Kolhapur_Sentinel_Images/kolhapur_dengue_final.csv"  # Path to your CSV file
output_dir = "json_files"  # Output directory for JSON files
os.makedirs(output_dir, exist_ok=True)

# We use a pointer to assign images sequentially in our sorted list.
current_image_index = 0

with open(input_csv, newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        try:
            year = int(row['year'])
            week = int(row['week'])
        except Exception as e:
            print(f"Skipping row due to invalid year/week: {row}")
            continue
        
        epiweek_str = row['epiweek']  # e.g. "201801"
        avg_temp = float(row['avg_temp'])
        try:
            rain = float(row['rain'])
        except ValueError:
            rain = None
        cases = int(float(row['cases']))
        
        # --- Compute the epiweek start date using the epiweek module ---
        # Call startdate() to get a date object
        target_date = Week(year, week).startdate()
        
        # --- Step 3. Find the corresponding image ---
        assigned_image = None
        for i in range(current_image_index, len(images)):
            if images[i][0] >= target_date:
                assigned_image = images[i]
                current_image_index = i + 1  # move pointer for subsequent rows
                break
        # If no image is found, use the last available image.
        if assigned_image is None:
            assigned_image = images[-1]
        
        assigned_image_date_str = assigned_image[0].strftime("%Y-%m-%d")
        image_path = assigned_image[1]
        
        # --- Step 4. Determine outbreak starting date ---
        outbreak_csv = row['outbreak_starting_date'].strip()
        if outbreak_csv == "NA" or outbreak_csv == "":
            outbreak_date = assigned_image_date_str
        else:
            outbreak_date = outbreak_csv
        
        # --- Step 5. Build the JSON structure ---
        json_data = {
            "image_path": image_path,
            "district_code": 530,
            "epiweeks": int(epiweek_str),
            "outbreak_starting_date": outbreak_date,
            "dynamic": {
                "cases": {
                    "dengue_cases": cases
                },
                "environmental_data": {
                    "temperature": [avg_temp],
                    "precipitation": [rain] if rain is not None else [None]
                }
            }
        }
        
        # Write JSON file named as YYYYWW.json (e.g., "201801.json")
        json_filename = os.path.basename(image_path).replace(".tiff", ".json")
        output_filename = os.path.join(output_dir, json_filename)
        with open(output_filename, 'w') as outfile:
            json.dump(json_data, outfile, indent=4)
        print(f"Created {output_filename} using image date {assigned_image_date_str}")

