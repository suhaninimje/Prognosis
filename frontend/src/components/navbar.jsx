import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "../logo2.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { scrolled: false };
  }

  handleScroll = () => {
    if (window.scrollY > 100) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const navbarClass = this.state.scrolled ? "navbar scrolled" : "navbar";
    return (
      <nav className={navbarClass}>
        <div className="logo">
          <Link to="/Prognosis">
          <img src={logo} alt="Prognosis Logo" className="home-logo" />
          </Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/tool">Product</Link></li>
          <li><Link to="/solutions">Solutions</Link></li>
          <li><Link to="/casestudies">Case Studies</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <ul className="nav-actions">
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
