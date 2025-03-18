import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import logo from "../logo2.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Mock login validation (use an API for real-world app)
        if (email === "user@example.com" && password === "password123") {
            localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
            navigate("/dashboard");
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <div className="login-container">
            <div className="left-side">
                {/* Prognosis Logo */}
                <img src={logo} alt="Prognosis Logo" className="prognosis-logo" />
                <h2>Login to Prognosis</h2>
                <form className="login-form" onSubmit={handleLogin}>
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
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="right-side"></div>
            <button className="back-button" onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    );
};

export default Login;
