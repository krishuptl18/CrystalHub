import React from "react";
import "../style/About.css";
import aboutImg from "../assets/about.jpg"; // optional image
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const About = () => {
  return (
    <>
    <Header/>
    <section className="about-page mt-5 py-5">
      <div className="container mt-5">

        {/* Hero */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6">
            <h2 className="fw-bold mb-3">About CrystalHub</h2>
            <p className="text-muted">
              CrystalHub is your trusted destination for healing crystals,
              spiritual products, and holistic services designed to bring
              balance, positivity, and harmony into your life.
            </p>
            <p className="text-muted">
              We believe every crystal carries unique energy that empowers
              personal growth, healing, and inner peace.
            </p>
          </div>

          <div className="col-lg-6 text-center">
            <img
              src={aboutImg}
              alt="About CrystalHub"
              className="img-fluid rounded-4 shadow"
            />
          </div>
        </div>

        {/* Mission / Vision */}
        <div className="row text-center g-4 mb-5">
          <div className="col-md-6">
            <div className="about-card p-4 h-100">
              <i className="bi bi-heart-fill"></i>
              <h5 className="mt-3">Our Mission</h5>
              <p className="text-muted">
                To provide authentic, ethically sourced crystals and spiritual
                guidance that uplift the mind, body, and soul.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="about-card p-4 h-100">
              <i className="bi bi-eye-fill"></i>
              <h5 className="mt-3">Our Vision</h5>
              <p className="text-muted">
                To become a global spiritual brand spreading positive energy,
                mindfulness, and self-healing practices.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-4">
          <h3 className="fw-bold">Why Choose CrystalHub?</h3>
        </div>

        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="about-card p-4 h-100">
              <i className="bi bi-gem"></i>
              <h6 className="mt-3">Authentic Crystals</h6>
              <p className="text-muted">
                100% natural and ethically sourced healing stones.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="about-card p-4 h-100">
              <i className="bi bi-person-check-fill"></i>
              <h6 className="mt-3">Expert Guidance</h6>
              <p className="text-muted">
                Consultations by experienced astrologers and healers.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="about-card p-4 h-100">
              <i className="bi bi-truck"></i>
              <h6 className="mt-3">Fast & Secure Delivery</h6>
              <p className="text-muted">
                Safe packaging with quick delivery across India.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
    <Footer/>
    </>
  );
};

export default About;
