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
