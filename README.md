# Prognosis - Dengue Prediction System

Prognosis is a machine learning-powered web application designed to predict the number of dengue cases in a given region. It leverages spatial-temporal data and satellite imagery to provide insights for healthcare providers, enabling proactive measures against dengue outbreaks.

## **Features**
- **Dengue Case Prediction**: Forecast dengue cases using real-time data.
- **Report Generation**: Users can generate and view past dengue predictions.
- **Credit-based System**: Users spend credits to generate reports.
- **Scalable Architecture**: Built with advanced AI and geospatial data analysis.

---

## **Project Documentation**
### **1. Introduction**
Dengue fever is a major public health concern in many tropical and subtropical regions. Prognosis aims to provide an AI-driven solution for forecasting dengue outbreaks using a combination of:
- **Historical Case Data**
- **Satellite Imagery**
- **Weather Patterns**
- **Geospatial Data**

The goal is to help hospitals and health organizations allocate resources effectively.

---

### **Data Sources**
Prognosis uses the following data sources for analysis:
- **Satellite Imagery** (Sentinel-Hub)
- **Weather Data** (Temperature, Humidity, Rainfall)
- **Geospatial Information** (GIS Mapping)
- **Historical Dengue Case Reports**

The data is processed through advanced machine learning algorithms to generate accurate predictions.

---

### **Model and Prediction Process**
1. **Data Collection & Preprocessing**
   - Extract geospatial and temporal features.
   - Normalize and clean datasets.
2. **Feature Engineering**
   - Identify key variables impacting dengue outbreaks.
3. **Machine Learning Model**
   - Uses Random Forest, XGBoost, and LSTMs for time-series predictions.
4. **Prediction Output**
   - The model predicts the number of cases in a given region for up to 5 weeks in advance.

---

### **User Interface & Functionality**
- **Web Application**
  - Users enter a region to generate a dengue outbreak forecast.
  - Reports are generated and stored for future reference.
- **Credit-Based System**
  - Users are given a limited number of free predictions.
  - Additional predictions require credits (potential future monetization).

---

### **Future Enhancements**
- **Improved AI Model** with real-time data integration.
- **Expansion to Other Diseases** beyond dengue.
- **Mobile App Development** for accessibility.
- **Collaboration with Health Organizations** for real-world deployment.

---

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- Python 3.10 -- See environment.yml for more details
- Node.js (for frontend, if applicable)
- Git
- Virtual Environment (`conda`)

### Installation

```sh
# Clone the repository
git clone https://github.com/suhaninimje/prognosis.git
cd prognosis

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install backend dependencies
pip install -r requirements.txt

# Start the backend
python app.py

# (Optional) Start the frontend
cd frontend
npm install
npm run dev
```

## 🔧 API Endpoints
### **GET /predict**
- **Description:** Predicts dengue cases for a given region.
- **Request:**
```json
{
  "latitude": 19.076,
  "longitude": 72.8777,
  "date": "2025-04-01"
}
```
- **Response:**
```json
{
  "region": "Mumbai",
  "predicted_cases": 42,
  "confidence": 92.5
}
```

## 🏗️ Project Architecture
- **Backend:** Python (Flask/FastAPI)
- **Machine Learning Model:** Uses spatial-temporal data & satellite imagery
- **Frontend:** React.js (optional)
- **Database:** PostgreSQL (or preferred DB)

![Architecture Diagram](https://example.com/architecture-diagram.png)

## 📚 Documentation
For detailed documentation, visit the **[Prognosis Wiki](https://github.com/suhaninimje/prognosis/wiki)**.

## ⚡ Future Enhancements
- Expansion to other diseases like Malaria and Chikungunya
- Integration with government health databases
- Advanced AI models for better accuracy

---

## **Contributors**
- **Suhani Nimje** - [GitHub](https://github.com/suhaninimje)
- **Aryan Mehta** - [GitHub](https://github.com/abm6761)
- **Abhimanyu Sareen** - [GitHub](https://github.com/CryptoRhinoGH)

## 📬 Contact
For any questions or collaboration inquiries, email: `prognosistoday@gmail.com`
