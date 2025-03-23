import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from './components/footer.jsx';
import Home from "./pages/home.jsx";
import Solutions from "./pages/solutions.jsx";
import About from "./pages/about.jsx";
import Pricing from "./pages/pricing.jsx";
import Contact from "./components/contact.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
import "./App.css";
import CaseStudies from "./pages/caseStudies.jsx";


const AppContent = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/contact" || location.pathname === "/login" || location.pathname === "/signup";
  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/casestudies" element={<CaseStudies />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;