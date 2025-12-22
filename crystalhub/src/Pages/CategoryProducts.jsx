import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import api from "../services/api";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../style/CategoryProducts.css";

const categories = [
    { name: " HEALING CRYSTALS", slug: "healingstone" },
    { name: "CRYSTAL BRACELETS", slug: "bracelet" },
    { name: "PENDANTS", slug: "pendant" },
    { name: "RINGS", slug: "ring" },
    { name: "CRYSTAL TREES", slug: "tree" },
    { name: "SHOWPIECES", slug: "showpiece" },
    { name: "SAGE", slug: "sage" },
    { name: "AMETHYST", slug: "amethyst" },
];

const CategoryProducts = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        api.get(`/products?category=${category}`).then((res) => setProducts(res.data));
    }, [category]);

    const handleView = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleShopNow = (product) => {
        const authUser = JSON.parse(localStorage.getItem("authUser"));
        const cartKey = authUser ? `cart_${authUser.email}` : "cart";

        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        const existingIndex = cart.findIndex((p) => p.id === product.id);

        if (existingIndex >= 0) cart[existingIndex].quantity += 1;
        else cart.push({ ...product, quantity: 1 });

        localStorage.setItem(cartKey, JSON.stringify(cart));
        alert(`${product.title} added to cart!`);
    };

    return (
        <>
            <Header />

            <div className="category-page">
                {/* SIDEBAR */}
                <aside className="category-sidebar mt-5">
                    <h5 className="text-success">Categories</h5>
                    <ul>
                        {categories.map((cat) => (
                            <li key={cat.slug}>
                                <Link
                                    to={`/products/${cat.slug}`}
                                    className={category === cat.slug ? "active" : ""}
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* MAIN CONTENT */}
                <main className="category-main mt-5">
                    <h2 className="category-title">
                        {category.replace("-", " ").toUpperCase()}
                    </h2>

                    <div className="product-grid">
                        {products.map((item) => (
                            <div key={item.id} className="product-card-alt">
                                <div className="product-img-alt">
                                    <img src={item.image} alt={item.title} />
                                    <div className="view-icon" onClick={() => handleView(item)}>🔍</div>
                                </div>

                                <div className="product-info-alt">
                                    <h4>{item.title}</h4>
                                    <p className="price">₹{item.price}</p>
                                    <div className="d-flex gap-2 justify-content-center">
                                        <Button size="sm" variant="dark" onClick={() => handleView(item)}>
                                            View
                                        </Button>
                                        <Button size="sm" variant="success" onClick={() => handleShopNow(item)}>
                                            Shop Now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* MODAL */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                {selectedProduct && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedProduct.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img src={selectedProduct.image} alt="" className="w-100 mb-3" />
                            <h5>₹{selectedProduct.price}</h5>
                            <p>{selectedProduct.description}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                            <Button variant="success" onClick={() => handleShopNow(selectedProduct)}>
                                Buy Now
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