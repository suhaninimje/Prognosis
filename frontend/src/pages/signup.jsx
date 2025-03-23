import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo2.png";
import "./signup.css";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [location, setLocation] = useState("");
    const [occupation, setOccupation] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (!agreedToTerms) {
            alert("You must agree to the Terms and Privacy Policy to continue.");
            return;
        }
        localStorage.setItem("user", JSON.stringify({ name, email, role, location, occupation }));
        navigate("/dashboard");
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        <div className="password-container">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Role (e.g., Healthcare Professional)"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Location (e.g., Region or Country)"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Occupation (e.g., Doctor, Nurse, etc.)"
                        required
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
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
