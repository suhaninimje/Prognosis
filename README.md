# 🦟 Prognosis - Dengue Prediction System

Prognosis is a machine learning-powered web application designed to predict the number of dengue cases in a given region. It leverages spatial-temporal data and satellite imagery to provide insights for healthcare providers, enabling proactive measures against dengue outbreaks.

## 🌟 Features

- **Dengue Case Prediction**: Forecast dengue cases using real-time data.
- **Report Generation**: Users can generate and view past dengue predictions.
- **Credit-based System**: Users spend credits to generate reports.
- **Scalable Architecture**: Built with advanced AI and geospatial data analysis.

---

## 📄 Project Documentation

### 📌 1. Introduction

Dengue fever is a major public health concern in many tropical and subtropical regions. Prognosis aims to provide an AI-driven solution for forecasting dengue outbreaks using a combination of:

- **Historical Case Data**
- **Satellite Imagery**
- **Weather Patterns**
- **Geospatial Data**

The goal is to help hospitals and health organizations allocate resources effectively.

---

### 🗂️ Data Sources

Prognosis uses the following data sources for analysis:

- **Satellite Imagery** (Sentinel-Hub)
- **Weather Data** (Temperature, Humidity, Rainfall)
- **Geospatial Information** (GIS Mapping)
- **Historical Dengue Case Reports**

The data is processed through advanced machine learning algorithms to generate accurate predictions.

**Dataset created and used by us:** [Kaggle Dataset](https://kaggle.com/datasets/3cc33fe159b596b8457993ca6faf645677100d09466fdba24d93daac817ba19b)

---

### 🤖 Model and Prediction Process

1. **Data Collection & Preprocessing**
   - Weekly Sentinel-2 imagery and annotated JSONs are converted into structured CSV datasets.
   - Images are resized and matched with environmental and case data.

2. **Feature Engineering**
   - Extracted image data is flattened and reduced via PCA to retain key visual features.
   - Combined with epidemiological and environmental metadata.

3. **Machine Learning Model**
   - A deep learning LSTM model processes PCA-transformed image data to predict dengue cases.
   - The model uses sequential weekly features with learned temporal dependencies.

4. **Prediction Output**
   - Predictions are made for up to 5 weeks ahead based on the start epiweek provided.
   - Output is stored as a JSON file listing epiweeks and corresponding predicted case counts.

---

## 🖥️ User Interface & Functionality

- **Web Application**
  - Users enter a region to generate a dengue outbreak forecast.
  - Reports are generated and stored for future reference.

- **Credit-Based System**
  - Users are given a limited number of free predictions.
  - Additional predictions require credits (potential future monetization).

---

## 🚀 Getting Started

### 🛠️ Prerequisites

Ensure you have the following installed:

- Conda
- Git

### 📥 Installation

```bash
# Clone the repository
git clone https://github.com/suhaninimje/prognosis.git
cd prognosis

# Create Conda environment from environment.yml
conda env create -f environment.yml
conda activate prognosis

# Start the backend
python app.py

# (Optional) Start the frontend
cd frontend
npm install
npm run dev
```

---

## 🔧 API Endpoints

### 📨 POST /predict

- **Description:** Predicts dengue cases for a given region.
- **Request:**
```json
{
  "start_epiweek": 202401,
  "weeks_ahead": 5,
  "district_code": 530
}
```

- **Response:**
```json
[
  { "epiweek": 202401, "prediction": 8.38 },
  { "epiweek": 202402, "prediction": 4.92 },
  { "epiweek": 202403, "prediction": 3.32 },
  { "epiweek": 202404, "prediction": 2.35 },
  { "epiweek": 202405, "prediction": 1.77 }
]
```

---

### 📜 Predict Script (`predict_next_weeks.py`)

The `predict_next_weeks.py` script allows batch predictions from the trained LSTM model.

#### 🔑 Arguments:
- `--project_folder` : Where results (predictions) will be stored
- `--start_epiweek` : Epiweek to start predictions from
- `--weeks_ahead` : Number of weeks ahead to predict (default: 5)
- `--load_model_path` : Path to the saved LSTM model `.pth` file
- `--district_code` : District code for which prediction is needed

The script generates a JSON file in the specified `project_folder` with dengue case forecasts.

---

## 🏗️ Project Architecture

-**Pictographic Representation of the Model:** 

![WhatsApp Image 2025-03-23 at 00 32 28_f851da4d](https://github.com/user-attachments/assets/f38af5c4-7f17-432a-a553-cfe9ca02338a)
- **Backend:** Python (Flask)
- **Machine Learning Model:** Uses spatial-temporal data & satellite imagery
- **Frontend:** React.js (optional)![WhatsApp Image 2025-03-23 at 00 32 28_37afcbd4]

- **Database:** PostgreSQL (or preferred DB)

---

## 👩‍💻 Contributors

- **Suhani Nimje** - [GitHub](https://github.com/suhaninimje)
- **Aryan Mehta** - [GitHub](https://github.com/abm6761)
- **Abhimanyu Sareen** - [GitHub](https://github.com/CryptoRhinoGH)

---

## 📬 Contact

For any questions or collaboration inquiries, email: `prognosistoday@gmail.com`
