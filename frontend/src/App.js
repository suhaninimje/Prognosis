import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from './components/footer.jsx';
import Home from "./pages/home.jsx";
import Solutions from "./pages/solutions.jsx";
import Resources from "./pages/resources.jsx";
import About from "./components/about.jsx";
import Pricing from "./pages/pricing.jsx";
import Contact from "./pages/contact.jsx";
import Login from "./pages/login.jsx";
import "./App.css";

const AppContent = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/contact" || location.pathname === "/login";
  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
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