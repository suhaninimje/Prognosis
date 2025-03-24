import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useInView } from "react-intersection-observer";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "leaflet/dist/leaflet.css";
import "./predictionTool.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const PredictionChart = ({ data }) => {
    const chartData = {
      labels: data.map(item => `Epiweek ${item.epiweek}`), 
      datasets: [
        {
          label: "Prediction",
          data: data.map(item => item.prediction), 
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          tension: 0.1
        }
      ]
    };
  
    return (
      <div>
        <h3>Prediction for Dengue Cases</h3>
        <Line data={chartData} />
      </div>
    );
  };
  

const PredictionTool = () => {
    
    const stateMapping = {
        "01": { name: "Jammu & Kashmir", lat: 33.7782, lng: 76.5762 },
        "02": { name: "Himachal Pradesh", lat: 31.1048, lng: 77.1734 },
        "03": { name: "Punjab", lat: 31.1471, lng: 75.3412 },
        "04": { name: "Chandigarh", lat: 30.7333, lng: 76.7794 },
        "05": { name: "Uttarakhand", lat: 30.0668, lng: 79.0193 },
        "06": { name: "Haryana", lat: 29.0588, lng: 76.0856 },
        "07": { name: "NCT Of Delhi", lat: 28.7041, lng: 77.1025 },
        "08": { name: "Rajasthan", lat: 27.0238, lng: 74.2179 },
        "09": { name: "Uttar Pradesh", lat: 26.8467, lng: 80.9462 },
        "10": { name: "Bihar", lat: 25.0961, lng: 85.3131 },
        "11": { name: "Sikkim", lat: 27.532, lng: 88.5122 },
        "12": { name: "Arunachal Pradesh", lat: 28.218, lng: 94.7278 },
        "13": { name: "Nagaland", lat: 26.1584, lng: 94.5624 },
        "14": { name: "Manipur", lat: 24.6637, lng: 93.9063 },
        "15": { name: "Mizoram", lat: 23.1645, lng: 92.9376 },
        "16": { name: "Tripura", lat: 23.9408, lng: 91.9882 },
        "17": { name: "Meghalaya", lat: 25.467, lng: 91.3662 },
        "18": { name: "Assam", lat: 26.2006, lng: 92.9376 },
        "19": { name: "West Bengal", lat: 22.9868, lng: 87.855 },
        "20": { name: "Jharkhand", lat: 23.6102, lng: 85.2799 },
        "21": { name: "Odisha", lat: 20.9517, lng: 85.0985 },
        "22": { name: "Chhattisgarh", lat: 21.2787, lng: 81.8661 },
        "23": { name: "Madhya Pradesh", lat: 23.4733, lng: 77.9479 },
        "24": { name: "Gujarat", lat: 22.2587, lng: 71.1924 },
        "25": { name: "Daman & Diu", lat: 20.4283, lng: 72.8397 },
        "26": { name: "Dadra & Nagar Haveli", lat: 20.1809, lng: 73.0169 },
        "27": { name: "Maharashtra", lat: 19.7515, lng: 75.7139 },
        "28": { name: "Andhra Pradesh", lat: 15.9129, lng: 79.7400 },
        "29": { name: "Karnataka", lat: 15.3173, lng: 75.7139 },
        "30": { name: "Goa", lat: 15.2993, lng: 74.124 },
        "31": { name: "Lakshadweep", lat: 10.5667, lng: 72.6417 },
        "32": { name: "Kerala", lat: 10.8505, lng: 76.2711 },
        "33": { name: "Tamil Nadu", lat: 11.1271, lng: 78.6569 },
        "34": { name: "Puducherry", lat: 11.9416, lng: 79.8083 },
        "35": { name: "Andaman & Nicobar Islands", lat: 11.7401, lng: 92.6586 }
    };

    const stateDistricts = {
        "01": ["Kupwara", "Badgam", "Leh(Ladakh)", "Kargil", "Punch", "Rajouri", "Kathua", "Baramula", "Bandipore", "Srinagar", "Ganderbal", "Pulwama", "Shupiyan", "Anantnag", "Kulgam", "Doda", "Ramban", "Kishtwar", "Udhampur", "Reasi", "Jammu", "Samba"],
        "02": ["Chamba", "Kangra", "Lahul & Spiti", "Kullu", "Mandi", "Hamirpur", "Una", "Bilaspur", "Solan", "Sirmaur", "Shimla", "Kinnaur"],
        "03": ["Gurdaspur", "Kapurthala", "Jalandhar", "Hoshiarpur", "Shahid Bhagat Singh Nagar", "Fatehgarh Sahib", "Ludhiana", "Moga", "Firozpur", "Muktsar", "Faridkot", "Bathinda", "Mansa", "Patiala", "Amritsar", "Tarn Taran", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Barnala"],
        "04": ["Chandigarh"],
        "05": ["Uttarkashi", "Chamoli", "Rudraprayag", "Tehri Garhwal", "Dehradun", "Garhwal", "Pithoragarh", "Bageshwar", "Almora", "Champawat", "Nainital", "Udham Singh Nagar", "Hardwar"],
        "06": ["Panchkula", "Ambala", "Yamunanagar", "Kurukshetra", "Kaithal", "Karnal", "Panipat", "Sonipat", "Jind", "Fatehabad", "Sirsa", "Hisar", "Bhiwani", "Rohtak", "Jhajjar", "Mahendragarh", "Rewari", "Gurgaon", "Mewat", "Faridabad", "Palwal"],
        "07": ["North West", "North", "North East", "East", "New Delhi", "Central", "West", "South West", "South"],
        "08": ["Ganganagar", "Hanumangarh", "Bikaner", "Churu", "Jhunjhunun", "Alwar", "Bharatpur", "Dhaulpur", "Karauli", "Sawai Madhopur", "Dausa", "Jaipur", "Sikar", "Nagaur", "Jodhpur", "Jaisalmer", "Barmer", "Jalor", "Sirohi", "Pali", "Ajmer", "Tonk", "Bundi", "Bhilwara", "Rajsamand", "Dungarpur", "Banswara", "Chittaurgarh", "Kota", "Baran", "Jhalawar", "Udaipur", "Pratapgarh"],
        "09": ["Saharanpur", "Muzaffarnagar", "Bijnor", "Moradabad", "Rampur", "Jyotiba Phule Nagar", "Meerut", "Baghpat", "Ghaziabad", "Gautam Buddha Nagar", "Bulandshahr", "Aligarh", "Mahamaya Nagar", "Mathura", "Agra", "Firozabad", "Mainpuri", "Budaun", "Bareilly", "Pilibhit", "Shahjahanpur", "Kheri", "Sitapur", "Hardoi", "Unnao", "Lucknow", "Rae Bareli", "Farrukhabad", "Kannauj", "Etawah", "Auraiya", "Kanpur Dehat", "Kanpur Nagar", "Jalaun", "Jhansi", "Lalitpur", "Hamirpur", "Mahoba", "Banda", "Chitrakoot", "Fatehpur", "Pratapgarh", "Kaushambi", "Allahabad", "Bara Banki", "Faizabad", "Ambedkar Nagar", "Sultanpur", "Bahraich", "Shrawasti", "Balrampur", "Gonda", "Siddharthnagar", "Basti", "Sant Kabir Nagar", "Mahrajganj", "Gorakhpur", "Kushinagar", "Deoria", "Azamgarh", "Mau", "Ballia", "Jaunpur", "Ghazipur", "Chandauli", "Varanasi", "Sant Ravidas Nagar (Bhadohi)", "Mirzapur", "Sonbhadra", "Etah", "Kanshiram Nagar"],
        "10": ["Pashchim Champaran", "Purba Champaran", "Sheohar", "Sitamarhi", "Madhubani", "Supaul", "Araria", "Kishanganj", "Purnia", "Katihar", "Madhepura", "Saharsa", "Darbhanga", "Muzaffarpur", "Gopalganj", "Siwan", "Saran", "Vaishali", "Samastipur", "Begusarai", "Khagaria", "Bhagalpur", "Banka", "Munger", "Lakhisarai", "Sheikhpura", "Nalanda", "Patna", "Bhojpur", "Buxar", "Kaimur (Bhabua)", "Rohtas", "Aurangabad", "Gaya", "Nawada", "Jamui", "Jehanabad", "Arwal"],
        "11": ["North District", "West District", "South District", "East District"],
        "12": ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Upper Subansiri", "West Siang", "East Siang", "Upper Siang", "Changlang", "Tirap", "Lower Subansiri", "Kurung Kumey", "Dibang Valley", "Lower Dibang Valley", "Lohit", "Anjaw"],
        "13": ["Mon", "Mokokchung", "Zunheboto", "Wokha", "Dimapur", "Phek", "Tuensang", "Longleng", "Kiphire", "Kohima", "Peren"],
        "14": ["Senapati", "Tamenglong", "Churachandpur", "Bishnupur", "Thoubal", "Imphal West", "Imphal East", "Ukhrul", "Chandel"],
        "15": ["Mamit", "Kolasib", "Aizawl", "Champhai", "Serchhip", "Lunglei", "Lawngtlai", "Saiha"],
        "16": ["West Tripura", "South Tripura", "Dhalai", "North Tripura"],
        "17": ["West Garo Hills", "East Garo Hills", "South Garo Hills", "West Khasi Hills", "Ribhoi", "East Khasi Hills", "Jaintia Hills"],
        "18": ["Kokrajhar", "Dhubri", "Goalpara", "Barpeta", "Morigaon", "Nagaon", "Sonitpur", "Lakhimpur", "Dhemaji", "Tinsukia", "Dibrugarh", "Sivasagar", "Jorhat", "Golaghat", "Karbi Anglong", "Dima Hasao", "Cachar", "Karimganj", "Hailakandi", "Bongaigaon", "Chirang", "Kamrup", "Kamrup Metropolitan", "Nalbari", "Baksa", "Darrang", "Udalguri"],
        "19": ["Darjiling", "Jalpaiguri", "Koch Bihar", "Uttar Dinajpur", "Dakshin Dinajpur", "Maldah", "Murshidabad", "Birbhum", "Barddhaman", "Nadia", "North Twenty Four Parganas", "Hugli", "Bankura", "Puruliya", "Haora", "Kolkata", "South Twenty Four Parganas", "Paschim Medinipur", "Purba Medinipur"],
        "20": ["Garhwa", "Chatra", "Kodarma", "Giridih", "Deoghar", "Godda", "Sahibganj", "Pakur", "Dhanbad", "Bokaro", "Lohardaga", "Purbi Singhbhum", "Palamu", "Latehar", "Hazaribagh", "Ramgarh", "Dumka", "Jamtara", "Ranchi", "Khunti", "Gumla", "Simdega", "Pashchimi Singhbhum", "Saraikela-Kharsawan"],
        "21": ["Bargarh", "Jharsuguda", "Sambalpur", "Debagarh", "Sundargarh", "Kendujhar", "Mayurbhanj", "Baleshwar", "Bhadrak", "Kendrapara", "Jagatsinghapur", "Cuttack", "Jajapur", "Dhenkanal", "Anugul", "Nayagarh", "Khordha", "Puri", "Ganjam", "Gajapati", "Kandhamal", "Baudh", "Subarnapur", "Balangir", "Nuapada", "Kalahandi", "Rayagada", "Nabarangapur", "Koraput", "Malkangiri"],
        "22": ["Koriya", "Surguja", "Jashpur", "Raigarh", "Korba", "Janjgir - Champa", "Bilaspur", "Kabeerdham", "Rajnandgaon", "Durg", "Raipur", "Mahasamund", "Dhamtari", "Uttar Bastar Kanker", "Bastar", "Narayanpur", "Dakshin Bastar Dantewada", "Bijapur"],
        "23": ["Sheopur", "Morena", "Bhind", "Gwalior", "Datia", "Shivpuri", "Tikamgarh", "Chhatarpur", "Panna", "Sagar", "Damoh", "Satna", "Rewa", "Umaria", "Neemuch", "Mandsaur", "Ratlam", "Ujjain", "Shajapur", "Dewas", "Dhar", "Indore", "Khargone (West Nimar)", "Barwani", "Rajgarh", "Vidisha", "Bhopal", "Sehore", "Raisen", "Betul", "Harda", "Hoshangabad", "Katni", "Jabalpur", "Narsimhapur", "Dindori", "Mandla", "Chhindwara", "Seoni", "Balaghat", "Guna", "Ashoknagar", "Shahdol", "Anuppur", "Sidhi", "Singrauli", "Jhabua", "Alirajpur", "Khandwa (East Nimar)", "Burhanpur"],
        "24": ["Kachchh", "Banas Kantha", "Patan", "Mahesana", "Sabar Kantha", "Gandhinagar", "Ahmadabad", "Surendranagar", "Rajkot", "Jamnagar", "Porbandar", "Junagadh", "Amreli", "Bhavnagar", "Anand", "Kheda", "Panch Mahals", "Dohad", "Vadodara", "Narmada", "Bharuch", "The Dangs", "Navsari", "Valsad", "Surat", "Tapi"],
        "25": ["Diu", "Daman"],
        "26": ["Dadra & Nagar Haveli"],
        "27": ["Nandurbar", "Dhule", "Jalgaon", "Buldana", "Akola", "Washim", "Amravati", "Wardha", "Nagpur", "Bhandara", "Gondiya", "Gadchiroli", "Chandrapur", "Yavatmal", "Nanded", "Hingoli", "Parbhani", "Jalna", "Aurangabad", "Nashik", "Thane", "Mumbai Suburban", "Mumbai", "Raigarh", "Pune", "Ahmadnagar", "Bid", "Latur", "Osmanabad", "Solapur", "Satara", "Ratnagiri", "Sindhudurg", "Kolhapur", "Sangli"],
        "28": ["Adilabad", "Nizamabad", "Karimnagar", "Medak", "Hyderabad", "Rangareddy", "Mahbubnagar", "Nalgonda", "Warangal", "Khammam", "Srikakulam", "Vizianagaram", "Visakhapatnam", "East Godavari", "West Godavari", "Krishna", "Guntur", "Prakasam", "Sri Potti Sriramulu Nellore", "Y.S.R.", "Kurnool", "Anantapur", "Chittoor"],
        "29": ["Belgaum", "Bagalkot", "Bijapur", "Bidar", "Raichur", "Koppal", "Gadag", "Dharwad", "Uttara Kannada", "Haveri", "Bellary", "Chitradurga", "Davanagere", "Shimoga", "Udupi", "Chikmagalur", "Tumkur", "Bangalore", "Mandya", "Hassan", "Dakshina Kannada", "Kodagu", "Mysore", "Chamarajanagar", "Gulbarga", "Yadgir", "Kolar", "Chikkaballapura", "Ramanagara"],
        "30": ["North Goa", "South Goa"],
        "31": ["Lakshadweep"],
        "32": ["Kasaragod", "Kannur", "Wayanad", "Kozhikode", "Malappuram", "Palakkad", "Thrissur", "Ernakulam", "Idukki", "Kottayam", "Alappuzha", "Pathanamthitta", "Kollam", "Thiruvananthapuram"],
        "33": ["Thiruvallur", "Chennai", "Kancheepuram", "Vellore", "Tiruvannamalai", "Viluppuram", "Salem", "Namakkal", "Erode", "The Nilgiris", "Dindigul", "Karur", "Tiruchirappalli", "Perambalur", "Ariyalur", "Cuddalore", "Nagapattinam", "Thiruvarur", "Thanjavur", "Pudukkottai", "Sivaganga", "Madurai", "Theni", "Virudhunagar", "Ramanathapuram", "Thoothukkudi", "Tirunelveli", "Kanniyakumari"],
        "34": ["Yanam", "Puducherry", "Mahe", "Karaikal"],
        "35": ["Nicobars", "North & Middle Andaman", "South Andaman"]
    };
    
    const [location, setLocation] = useState({
        state: "",
        city: "",
        district: "",
        lat: "",
        lng: "",
        pincode: ""
    });

    const [activeTab, setActiveTab] = useState("district");
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [predictions, setPredictions] = useState([]);
    const [chartData, setChartData] = useState({});


    const fetchPredictions = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000");
            const data = await response.json();
            setPredictions(data);

        } catch (error) {
            console.error("Error fetching predictions:", error);
        }
    };

    
    const handleStateChange = (event) => {
        const stateId = event.target.value;
        setSelectedState(stateId);
        setSelectedDistrict(""); 
        const stateData = stateMapping[stateId];
        setLocation({
            ...location,
            state: stateData.name,
            lat: stateData.lat,
            lng: stateData.lng,
        });
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };
    
    const handleInputChange = (e) => {
        setLocation({ ...location, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (selectedState) {
            const stateData = stateMapping[selectedState];
            setLocation({
                ...location,
                lat: stateData.lat,
                lng: stateData.lng,
            });
        }
    }, [selectedState]);

    function LocationMarker() {
        useMapEvents({
            click(e) {
                setLocation({ ...location, lat: e.latlng.lat, lng: e.latlng.lng, pincode: "" });
            },
        });
        return location.lat && location.lng ? <Marker position={[location.lat, location.lng]} /> : null;
    }

    const { ref: headerRef, inView: inViewHeader } = useInView({
        threshold: 0.3,
    });

    useEffect(() => {

        // Process the data into chart format
        const labels = predictions.map(item => `Epiweek ${item.epiweek}`);
        const data = predictions.map(item => item.prediction);

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Predictions',
                    data: data,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1, 
                    fill: true,
                },
            ],
        });
    }, []);

    return (
        <div className="prediction-container">
            <div ref={headerRef} className={`tool-header ${inViewHeader ? "animate" : ""}`}>
                <h2>Our Prediction Tool</h2>
                <p>Explore how our tailored strategies have transformed businesses and driven measurable success for our clients.</p>
            </div>

            <h2>Dengue Prediction Tool</h2>

            {/* Toggle Buttons */}
            <div className="toggle-buttons">
                <button className={activeTab === "district" ? "active" : ""} onClick={() => setActiveTab("district")}>District</button>
                <button className={activeTab === "coordinate" ? "active" : ""} onClick={() => setActiveTab("coordinate")}>Coordinate</button>
                <button className={activeTab === "pincode" ? "active" : ""} onClick={() => setActiveTab("pincode")}>Pincode</button>
            </div>

            {/* Input Fields */}
            <div className="input-section">
                {activeTab === "district" && (
                    <div>
                        <select
                            id="state"
                            value={selectedState}
                            onChange={handleStateChange}
                            className="state-dropdown"
                        >
                            <option value="">Select State</option>
                            {Object.keys(stateMapping).map((stateCode) => (
                                <option key={stateCode} value={stateCode}>
                                    {stateMapping[stateCode].name}
                                </option>
                            ))}
                        </select>
                        <select
                            id="district"
                            value={selectedDistrict}
                            onChange={handleDistrictChange}
                            className="district-dropdown"
                            disabled={!selectedState}
                        >
                            <option value="">Select District</option>
                            {selectedState &&
                                stateDistricts[selectedState]?.map((district, index) => (
                                <option key={index} value={district}>
                                    {district}
                                </option>
                            ))}
                        </select>
                    
                
                    </div>
                )}

                {activeTab === "coordinate" && (
                    <div className="latlong-inputs">
                        <input type="number" name="lat" placeholder="Latitude" value={location.lat} onChange={handleInputChange} />
                        <input type="number" name="lng" placeholder="Longitude" value={location.lng} onChange={handleInputChange} />
                    </div>
                )}

                {activeTab === "pincode" && (
                    <div className="pincode-input">
                        <input type="text" name="pincode" placeholder="Pincode" value={location.pincode} onChange={handleInputChange} />
                    </div>
                )}
            </div>

            {/* Map */}
            <div className="map-section">
                <MapContainer center={[20.5937, 78.9629]} zoom={5} className="map">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationMarker />
                </MapContainer>
            </div>

            <button onClick={fetchPredictions}>Generate Report</button>

            <div>
            <div className="prediction-tool">
      <h2>Dengue Prediction Tool</h2>
      <PredictionChart data={predictions} />
    </div>
            
        </div>

        </div>
    );
};

export default PredictionTool;