import React from "react";
import { Link } from "react-router-dom";
import "../style/Footer.css";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer-modern">
      <div className="container">

        {/* TOP */}
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logo} alt="CrystalHub" />
            <p>
              Premium crystals, healing stones & spiritual decor crafted
              for positive energy and mindful living.
            </p>
          </div>

          <div className="footer-links">
            <h6 className="text-warning">Shop</h6>
            <Link to="/">Home</Link>
            <Link to="/pyrite">Pyrite</Link>
            <Link to="/category/rings">Rings</Link>
            <Link to="/category/bracelets">Bracelets</Link>
          </div>

          <div className="footer-links">
            <h6 className="text-warning">Company</h6>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>

          <div className="footer-links">
            <h6 className="text-warning">Support</h6>
            <Link to="/faq">FAQs</Link>
            <Link to="/shipping">Shipping</Link>
            <Link to="/returns">Returns</Link>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CrystalHub. All rights reserved.</p>

          <div className="social-icons">
            <a href="#"><i className="bi bi-instagram"></i></a>
            <a href="#"><i className="bi bi-facebook"></i></a>
            <a href="#"><i className="bi bi-whatsapp"></i></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
