import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../style/ProductCard.css";

// Images
import healingImg from "../assets/healingstone.jpg";
import braceletImg from "../assets/bracelet.jpg";
import pendantImg from "../assets/pendant.jpg";
import ringImg from "../assets/ring.jpg";
import treeImg from "../assets/tree.jpg";
import showpieceImg from "../assets/showpiece.jpg";
import sageImg from "../assets/sage.jpg";
import amethystImg from "../assets/amethyst.jpg";

const ProductCards = () => {
  const products = [
    { title: "HEALING CRYSTALS", img: healingImg, path: "/products/healingstone" },
    { title: "CRYSTAL BRACELETS", img: braceletImg, path: "/products/bracelet" },
    { title: "PENDANTS", img: pendantImg, path: "/products/pendant" },
    { title: "RINGS", img: ringImg, path: "/products/ring" },
    { title: "CRYSTAL TREES", img: treeImg, path: "/products/tree" },
    { title: "SHOWPIECES", img: showpieceImg, path: "/products/showpiece" },
    { title: "SAGE", img: sageImg, path: "/products/sage" },
    { title: "AMETHYST", img: amethystImg, path: "/products/amethyst" },
  ];

  return (
    <section className="product-section">
      <Container>
        <div className="text-center mb-5">
          <h2 className="product-title">Our Crystal Collection</h2>
        </div>

        <Row className="g-4">
          {products.map((product, index) => (
            <Col sm={6} md={4} lg={3} key={index}>
              <Link to={product.path} className="product-card">
                <div className="image-wrapper">
                  <img src={product.img} alt={product.title} />
                  <div className="overlay">
                    <h6>{product.title}</h6>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ProductCards;
