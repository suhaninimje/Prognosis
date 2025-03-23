import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useInView } from "react-intersection-observer";
import Papa from "papaparse";
import "leaflet/dist/leaflet.css";
import "./predictionTool.css";

const PredictionTool = () => {
    const [location, setLocation] = useState({
        state: "",
        city: "",
        district: "",
        lat: "",
        lng: "",
        pincode: ""
    });

    const [activeTab, setActiveTab] = useState("district");
    const [districts, setDistricts] = useState({});
    const [stateMapping, setStateMapping] = useState({});

    // Load the CSV file and set the districts based on state selection
    useEffect(() => {
        // Fetch and parse CSV data
        Papa.parse("../district_codes.csv", {
            download: true,
            header: true,
            complete: (result) => {
                // Process the CSV and create a mapping of state codes to districts
                const stateDistricts = {};
                result.data.forEach((row) => {
                    const stateCode = row["State Code"];
                    const district = row["District"];
                    if (stateCode && district) {
                        if (!stateDistricts[stateCode]) {
                            stateDistricts[stateCode] = [];
                        }
                        stateDistricts[stateCode].push(district);
                    }
                });
                setDistricts(stateDistricts); 

                // Log the districts to the console
                console.log("stateDistricts");
            }
        });

        // Set the state mapping for zooming to states
        setStateMapping({
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
        });
    }, []);

    const handleInputChange = (e) => {
        setLocation({ ...location, [e.target.name]: e.target.value });
    };

    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        setLocation({ ...location, state: stateCode });
        // Zoom into the selected state
        if (stateMapping[stateCode]) {
            setLocation({
                ...location,
                lat: stateMapping[stateCode].lat,
                lng: stateMapping[stateCode].lng
            });
        }
        // Set the districts for the selected state
        if (districts[stateCode]) {
            setDistrictsList(districts[stateCode]);
        } else {
            setDistrictsList([]);
        }
    };

    const [districtsList, setDistrictsList] = useState([]);

    function LocationMarker() {
        useMapEvents({
            click(e) {
                setLocation({ ...location, lat: e.latlng.lat, lng: e.latlng.lng, pincode: "" });
            },
        });
        return location.lat && location.lng ? <Marker position={[location.lat, location.lng]} /> : null;
    }

    const handleGenerateReport = () => {
        console.log("Generating report for:", location);
        // Send location data to the backend
    };

    const { ref: headerRef, inView: inViewHeader } = useInView({
        threshold: 0.3,
    });

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
                    <div className="location-inputs">
                        <select name="state" value={location.state} onChange={handleStateChange}>
                            <option value="">Select State</option>
                            {Object.keys(stateMapping).map((stateCode) => (
                                <option key={stateCode} value={stateCode}>
                                    {stateMapping[stateCode].name}
                                </option>
                            ))}
                        </select>
                        <input type="text" name="city" placeholder="City" value={location.city} onChange={handleInputChange} />
                        <select name="district" value={location.district} onChange={handleInputChange}>
                            <option value="">Select District</option>
                            {districtsList.map((district, idx) => (
                                <option key={idx} value={district}>
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
                        <input type="text" name="state" placeholder="State" value={location.state} onChange={handleInputChange} />
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

            <button onClick={handleGenerateReport}>Generate Report</button>
        </div>
    );
};

export default PredictionTool;
