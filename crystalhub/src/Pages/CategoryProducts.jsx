import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import api from "../services/api";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../style/CategoryProducts.css";

const CategoryProducts = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch products by category
    useEffect(() => {
        api.get(`/products?category=${category}`).then((res) => setProducts(res.data));
    }, [category]);

    // Handle modal view
    const handleView = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    // Add product to cart in localStorage
    const handleShopNow = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if product already exists
        const existingIndex = cart.findIndex((p) => p.id === product.id);
        if (existingIndex >= 0) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.title} added to cart!`);
    };

    return (
        <>
            <Header />

            <div className="category-container">
                <h2 className="category-title">
                    {category.replace("-", " ").toUpperCase()}
                </h2>

                <div className="product-grid">
                    {products.map((item) => (
                        <div key={item.id} className="product-card-alt">
                            <div className="product-img-alt">
                                <img src={item.image} alt={item.title} />
                                <div className="view-icon" onClick={() => handleView(item)}>
                                    🔍
                                </div>
                            </div>

                            <div className="product-info-alt">
                                <h4>{item.title}</h4>
                                <p className="price">₹{item.price}</p>
                                <div className="d-flex gap-2">
                                    <Button variant="dark" size="sm" onClick={() => handleView(item)}>
                                        View
                                    </Button>
                                    <Button variant="success" size="sm" onClick={() => handleShopNow(item)}>
                                        Shop Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* PRODUCT MODAL */}
            <Modal show={showModal} onHide={handleClose} centered>
                {selectedProduct && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedProduct.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.title}
                                style={{ width: "100%", marginBottom: "15px" }}
                            />
                            <h5>Price: ₹{selectedProduct.price}</h5>
                            {selectedProduct.description && <p>{selectedProduct.description}</p>}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" onClick={() => handleShopNow(selectedProduct)}>
                                Shop Now
                            </Button>
                        </Modal.Footer>
                    </>
                )}
            </Modal>

            <Footer />
        </>
    );
};

export default CategoryProducts;