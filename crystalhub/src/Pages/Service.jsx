// src/pages/ServiceTimeline.jsx
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaGem, FaHandsHelping, FaShieldAlt, FaTruck, FaLeaf } from "react-icons/fa";
import "../style/Service.css";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const services = [
  {
    icon: <FaGem />,
    title: "Authentic Crystals",
    desc: "Naturally sourced crystals with high vibrational purity."
  },
  {
    icon: <FaHandsHelping />,
    title: "Spiritual Guidance",
    desc: "Crystal recommendations based on healing & manifestation."
  },
  {
    icon: <FaShieldAlt />,
    title: "Energy Verified",
    desc: "Each crystal is energetically cleansed and tested."
  },
  {
    icon: <FaTruck />,
    title: "Safe Delivery",
    desc: "Protective packaging with fast and secure shipping."
  },
  {
    icon: <FaLeaf />,
    title: "Eco Friendly",
    desc: "Sustainable sourcing & planet-friendly packaging."
  }
];

const ServiceTimeline = () => {
  return (
    <>
      <Header />

      <div className="service-timeline-page">
        {/* HERO */}
        <section className="timeline-hero">
          <Container className="text-center">
            <h1 className="text-warning mt-5">Our Crystal Services</h1>
            <p>
              A mindful journey from sourcing to delivery — designed for balance,
              positivity, and growth.
            </p>
          </Container>
        </section>

        {/* TIMELINE */}
        <section className="timeline-section">
          <Container>
            <Row className="g-5">
              {services.map((item, index) => (
                <Col md={6} key={index}>
                  <div className="timeline-card">
                    <div className="timeline-icon">{item.icon}</div>
                    <div className="timeline-content">
                      <h4 className="text-warning">{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* CTA */}
        {/* <section className="timeline-cta">
          <Container className="text-center">
            <h2>Align With the Right Crystal</h2>
            <p>Discover crystals chosen to match your intention</p>
            <Button size="lg" variant="outline-light">
              Explore Collection
            </Button>
          </Container>
        </section> */}
      </div>

      <Footer />
    </>
  );
};

export default ServiceTimeline;
