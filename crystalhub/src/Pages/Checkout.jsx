import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Checkout = () => {
    const navigate = useNavigate();

    // Logged in user
    const authUser = JSON.parse(localStorage.getItem("authUser"));

    // User-specific cart key
    const cartKey = authUser ? `cart_${authUser.email}` : "cart";

    const [cart, setCart] = useState([]);

    /* 🔐 BLOCK CHECKOUT IF NOT LOGGED IN */
    if (!authUser) {
        return (
            <>
                <Header />
                <Container
                    className="text-center"
                    style={{ marginTop: "150px", minHeight: "50vh" }}
                >
                    <h3>Please login to access checkout 🔐</h3>
                    <Button
                        variant="warning"
                        className="mt-3"
                        onClick={() => navigate("/login")}
                    >
                        Go to Login
                    </Button>
                </Container>
                <Footer />
            </>
        );
    }

    /* LOAD USER CART AND MERGE GUEST CART IF EXISTS */
    useEffect(() => {
        if (!authUser) return;

        const userCartKey = `cart_${authUser.email}`;
        const userCart = JSON.parse(localStorage.getItem(userCartKey)) || [];
        const guestCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Merge guest cart into user cart
        const mergedCart = [...userCart];

        guestCart.forEach((item) => {
            const exists = mergedCart.find((i) => i.id === item.id);
            if (exists) {
                exists.quantity += item.quantity;
            } else {
                mergedCart.push(item);
            }
        });

        // Save merged cart to user cart key
        localStorage.setItem(userCartKey, JSON.stringify(mergedCart));

        // Clear guest cart
        localStorage.removeItem("cart");

        setCart(mergedCart);
    }, [authUser]);

    /* UPDATE QUANTITY */
    const handleQuantityChange = (id, qty) => {
        if (qty < 1) return;

        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: qty } : item
        );

        setCart(updatedCart);
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    };

    /* REMOVE ITEM */
    const handleRemove = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);

        setCart(updatedCart);
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    };

    /* GRAND TOTAL */
    const grandTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    /* EMPTY CART UI */
    if (cart.length === 0) {
        return (
            <>
                <Header />
                <Container
                    className="text-center"
                    style={{ marginTop: "150px", minHeight: "50vh" }}
                >
                    <h3>Your cart is empty 😒</h3>
                    <Button
                        variant="primary"
                        className="mt-3"
                        onClick={() => navigate("/shop")}
                    >
                        Shop Now
                    </Button>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />

            <Container className=" pt-5">
                <h2 className=" mb-4">Checkout</h2>

                {cart.map((item) => (
                    <Card key={item.id} className="p-3 mb-3 shadow-sm">
                        <Row className="align-items-center">
                            <Col md={2}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    style={{ width: "100%", borderRadius: "8px" }}
                                />
                            </Col>

                            <Col md={4}>
                                <h5>{item.title}</h5>
                                <p className="mb-0">Price: ₹{item.price}</p>
                            </Col>

                            <Col md={2}>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleQuantityChange(item.id, parseInt(e.target.value))
                                    }
                                />
                            </Col>

                            <Col md={2}>
                                <strong>₹{item.price * item.quantity}</strong>
                            </Col>

                            <Col md={2}>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleRemove(item.id)}
                                >
                                    Remove
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                ))}

                <Card className="p-3 mt-4 shadow-sm">
                    <h4>Grand Total: ₹{grandTotal}</h4>
                    <Button variant="success" className="mt-2 w-100">
                        Proceed to Pay
                    </Button>
                </Card>
            </Container>

            <Footer />
        </>
    );
};

export default Checkout;