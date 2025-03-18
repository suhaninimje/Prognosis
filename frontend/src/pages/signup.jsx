import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import logo from "../logo2.png";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // send the user data to backend API for registration (need to figure this out later)
        localStorage.setItem("user", JSON.stringify({ name, email, role: "admin" }));
        navigate("/dashboard");
    };

    return (
        <div className="signup-container">
            <div className="left-side">
                {/* Prognosis Logo */}
                <img src={logo} alt="Prognosis Logo" className="prognosis-logo" />
                <h2>Sign Up for Prognosis</h2>
                <form className="signup-form" onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="right-side"></div>
            <button className="back-button" onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    );
};

export default Signup;
