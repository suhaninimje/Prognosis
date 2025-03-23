import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import logo from "../logo2.png";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
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
                    <button type="submit">Login</button>
                </form>

                
                <p className="signup-text">
                    Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
                </p>

                <button className="back-button" onClick={() => navigate("/")}>
                    <FaArrowLeft />
                </button>
            </div>
        </div>
    );
};

export default Login;
