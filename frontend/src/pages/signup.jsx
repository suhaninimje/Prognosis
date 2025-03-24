import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests
import logo from "../logo2.png";
import "./signup.css";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [industry, setIndustry] = useState("");
    const [occupation, setOccupation] = useState("");
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [pincode, setPincode] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        // Check if terms are agreed
        if (!agreedToTerms) {
            alert("You must agree to the Terms and Privacy Policy to continue.");
            return;
        }

        const signinData = {
            firstname,
            lastname,
            email,
            password,
            industry,
            occupation,
            state,
            district,
            pincode,
        }

        try {
            axios.defaults.withCredentials = true;
            console.log("this is sign in data:", signinData);
            const response = await axios.post('http://localhost:5000/signup', signinData);
            console.log(response.data);
            // Handle success response
          } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="left-side">
                <img src={logo} alt="Prognosis Logo" className="prognosis-logo" />
                <h2>Sign Up for Prognosis</h2>
                <form className="signup-form" onSubmit={handleSignup}>
                    <div className="name-fields">
                        <input
                            type="text"
                            placeholder="First Name"
                            required
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            required
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="password-fields">
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Industry"
                        required
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Occupation"
                        required
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="State"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="District"
                        required
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Pincode"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                    
                    <div className="terms-container">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={agreedToTerms}
                            onChange={() => setAgreedToTerms(!agreedToTerms)}
                        />
                        <label htmlFor="terms">
                            I agree to the Terms of Service and Privacy Policy.
                        </label>
                    </div>

                    <button type="submit">Sign Up</button>
                </form>
                <p className="login-link">
                    Already have an account? <span onClick={() => navigate("/login")}>Login</span>
                </p>
                <button className="back-button" onClick={() => navigate("/")}>
                    <FaArrowLeft />
                </button>
            </div>
            <div className="right-side"></div>
        </div>
    );
};

export default Signup;
