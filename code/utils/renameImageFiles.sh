#!/bin/bash
# Loop over every response.tiff file matching the pattern
for file in Kolhapur_Sentinel_Images/temp_201*/*/response.tiff; do
    # Get the parent folder two levels up (e.g. temp_2018_W01_2017-12-31)
    parent_dir=$(basename "$(dirname "$(dirname "$file")")")

    # Extract the date in the format YYYY-MM-DD from the parent folder's name
    date=$(echo "$parent_dir" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}')

    if [ -z "$date" ]; then
        echo "No date found in $parent_dir, skipping..."
        continue
    fi

    # Define the new file name at the top-level directory
    new_name="Kolhapur_Sentinel_Images/image_${date}.tiff"

    echo "Renaming $file to $new_name"
    mv "$file" "$new_name"
done

