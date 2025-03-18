import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import logo from "../logo2.png";

const Login = () => {
    const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="left-side">
        {/* Prognosis Logo */}
      <img src={logo} alt="Prognosis Logo" className="prognosis-logo" />

        <h2>Login to Prognosis</h2>
        <form className="login-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="right-side"></div>
      <button className="back-button" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Login;
