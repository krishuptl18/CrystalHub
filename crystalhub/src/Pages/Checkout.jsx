import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    Button,
    Row,
    Col,
    Form,
    Image,
    Alert,
} from "react-bootstrap";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../style/Checkout.css";

const Checkout = () => {
    const navigate = useNavigate();

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const cartKey = authUser ? `cart_${authUser.email}` : "cart";

    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState({
        name: "",
        phone: "",
        street: "",
        city: "",
        pincode: "",
    });

    /* 🔐 BLOCK CHECKOUT IF NOT LOGGED IN */
    if (!authUser) {
        return (
            <>
                <Header />

                <div className="checkout-lock-screen mt-5">
                    <div className="lock-card">
                        <div className="lock-icon">🔒</div>
                        <h3>Login Required</h3>
                        <p>
                            Please log in to continue with checkout and place
                            your order securely.
                        </p>

                        <Button
                            variant="success"
                            size="lg"
                            onClick={() => navigate("/login")}
                        >
                            Go to Login
                        </Button>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    /* LOAD CART */
    useEffect(() => {
        const userCart = JSON.parse(localStorage.getItem(cartKey)) || [];
        setCart(userCart);
    }, [cartKey]);

    const handleQuantityChange = (id, qty) => {
        if (qty < 1) return;
        const updated = cart.map((item) =>
            item.id === id ? { ...item, quantity: qty } : item
        );
        setCart(updated);
        localStorage.setItem(cartKey, JSON.stringify(updated));
    };

    const handleRemove = (id) => {
        const updated = cart.filter((item) => item.id !== id);
        setCart(updated);
        localStorage.setItem(cartKey, JSON.stringify(updated));
    };

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const tax = Math.round(subtotal * 0.05);
    let delivery = 50;
    let discount = 0;
    let offerMessage = "";

    if (subtotal > 3499) {
        discount = Math.round((subtotal + tax) * 0.2);
        delivery = 0;
        offerMessage =
            "🎉 Free delivery + 20% discount applied on orders above ₹3499!";
    } else if (subtotal + tax + delivery > 2000) {
        discount = Math.round((subtotal + tax) * 0.1);
        delivery = 0;
        offerMessage =
            "🎉 Your order qualifies for free delivery and 10% discount!";
    }

    const grandTotal = subtotal + tax + delivery - discount;

    const proceedToPayment = () => {
        const { name, phone, street, city, pincode } = address;
        if (!name || !phone || !street || !city || !pincode) {
            alert("Please fill all address fields");
            return;
        }
        localStorage.setItem("checkoutAddress", JSON.stringify(address));
        navigate("/payment");
    };

    if (cart.length === 0) {
        return (
            <>
                <Header />

                <div className="checkout-lock-screen mt-5">
                    <div className="lock-card">
                        <div className="lock-icon">🛒</div>
                        <h3>Your cart is empty</h3>
                        <p>Looks like you haven’t added anything yet.</p>

                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate("/shop")}
                        >
                            Shop Now
                        </Button>
                    </div>
                </div>

                <Footer />
            </>
        );
    }


    return (
        <>
            <Header />

            <Container className="mt-5 pt-5 mb-5">
                <h2 className="mb-4 mt-5 fw-bold">Checkout</h2>

                <Row>
                    {/* CART ITEMS */}
                    <Col lg={8}>
                        {cart.map((item) => (
                            <Card key={item.id} className="mb-3 shadow-sm">
                                <Card.Body>
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <Image
                                                src={item.image}
                                                fluid
                                                rounded
                                            />
                                        </Col>

                                        <Col md={4}>
                                            <h6>{item.title}</h6>
                                            <small className="text-muted">
                                                ₹{item.price}
                                            </small>
                                        </Col>

                                        <Col md={2}>
                                            <Form.Control
                                                type="number"
                                                min={1}
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        +e.target.value
                                                    )
                                                }
                                            />
                                        </Col>

                                        <Col md={2} className="fw-bold">
                                            ₹{item.price * item.quantity}
                                        </Col>

                                        <Col md={2}>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>

                    {/* ADDRESS + SUMMARY */}
                    <Col lg={4}>
                        <Card
                            className="shadow-sm sticky-top"
                            style={{ top: "110px" }}
                        >
                            <Card.Body>
                                <h5 className="fw-bold mb-3">
                                    Shipping Address
                                </h5>

                                <Form.Control
                                    className="mb-2"
                                    placeholder="Full Name"
                                    onChange={(e) =>
                                        setAddress({
                                            ...address,
                                            name: e.target.value,
                                        })
                                    }
                                />

                                <Form.Control
                                    className="mb-2"
                                    placeholder="Phone Number"
                                    onChange={(e) =>
                                        setAddress({
                                            ...address,
                                            phone: e.target.value,
                                        })
                                    }
                                />

                                <Form.Control
                                    className="mb-2"
                                    placeholder="Street Address"
                                    onChange={(e) =>
                                        setAddress({
                                            ...address,
                                            street: e.target.value,
                                        })
                                    }
                                />

                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control
                                            placeholder="City"
                                            onChange={(e) =>
                                                setAddress({
                                                    ...address,
                                                    city: e.target.value,
                                                })
                                            }
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            placeholder="Pincode"
                                            onChange={(e) =>
                                                setAddress({
                                                    ...address,
                                                    pincode: e.target.value,
                                                })
                                            }
                                        />
                                    </Col>
                                </Row>

                                {offerMessage && (
                                    <Alert
                                        variant="success"
                                        className="text-center"
                                    >
                                        {offerMessage}
                                    </Alert>
                                )}

                                <hr />

                                <div className="d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    <strong>₹{subtotal}</strong>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Tax (5%)</span>
                                    <strong>₹{tax}</strong>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <span>Delivery</span>
                                    <strong>₹{delivery}</strong>
                                </div>

                                {discount > 0 && (
                                    <div className="d-flex justify-content-between text-success">
                                        <span>Discount</span>
                                        <strong>-₹{discount}</strong>
                                    </div>
                                )}

                                <hr />

                                <div className="d-flex justify-content-between fw-bold fs-5">
                                    <span>Total</span>
                                    <span>₹{grandTotal}</span>
                                </div>

                                <Button
                                    variant="success"
                                    className="w-100 mt-3"
                                    onClick={proceedToPayment}
                                >
                                    Proceed to Payment
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </>
    );
};

export default Checkout;