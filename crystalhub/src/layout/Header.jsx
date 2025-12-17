import React from "react";
import { Link } from "react-router-dom";
import "../style/Header.css";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg header-modern">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand logo-glow" to="/">
          <img src={logo} alt="CrystalHub" height="45" />
        </Link>

        {/* Hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapse */}
        <div className="collapse navbar-collapse" id="mainNavbar">

          {/* Search */}
          <form className="search-modern mx-lg-4 my-3 my-lg-0 position-relative">
            <input
              type="text"
              placeholder="Search for gifts, decor & more..."
              className="form-control"
            />
            <i className="bi bi-search search-icon"></i>
          </form>

          {/* Menu */}
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-4">

            <li className="nav-item">
              <Link className="nav-link menu-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link menu-link" to="/about">About Us</Link>
            </li>

            {/* Dropdown */}
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle menu-link"
                role="button"
                data-bs-toggle="dropdown"
              >
                Shop
              </span>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/services/healing">Crystal Healing</Link></li>
                <li><Link className="dropdown-item" to="/services/astrology">Astrology</Link></li>
                <li><Link className="dropdown-item" to="/services/vastu">Vastu Consultation</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/shop">Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link menu-link" to="/contact">Contact Us</Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
