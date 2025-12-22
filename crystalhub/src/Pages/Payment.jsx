import { useState } from "react";
import { Container, Card, Button, Row, Col, ListGroup, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { FaMoneyBillWave, FaCreditCard, FaQrcode } from "react-icons/fa";

const Payment = () => {
    const navigate = useNavigate();
    const authUser = JSON.parse(localStorage.getItem("authUser"));

    if (!authUser) {
        navigate("/login");
    }

    const cartKey = `cart_${authUser.email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const address = JSON.parse(localStorage.getItem("checkoutAddress"));

    const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    const tax = Math.round(subtotal * 0.05); // 5% tax
    let delivery = 50;
    let discount = 0;
    let message = "";

    // Apply discount and free delivery rules
    if (subtotal > 3499) {
        discount = Math.round((subtotal + tax) * 0.2); // 20% discount
        delivery = 0; // free delivery
        message = "Enjoy free delivery and a 20% discount on all orders over ₹3000!";
    } else if (subtotal + tax + delivery > 2000) {
        discount = Math.round((subtotal + tax) * 0.1); // 10% discount
        delivery = 0; // free delivery
        message = "Enjoy free delivery and Your order is eligible for a 10% discount!";
    }

    const total = subtotal + tax + delivery - discount;

    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [upiDetails, setUpiDetails] = useState({ name: "", upiId: "" });

    const placeOrder = () => {
        if (paymentMethod === "upi" && (!upiDetails.name || !upiDetails.upiId)) {
            alert("Please enter UPI Name and UPI ID");
            return;
        }

        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const newOrder = {
            id: Date.now(),
            user: authUser.email,
            items: cart,
            address,
            subtotal,
            tax,
            delivery,
            discount,
            total,
            paymentMethod,
            upiDetails: paymentMethod === "upi" ? upiDetails : null,
            status: "Placed",
            date: new Date().toLocaleString(),
        };

        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));

        localStorage.removeItem(cartKey);
        localStorage.removeItem("checkoutAddress");

        navigate("/order-success");
    };

    return (
        <>
            <Header />
            <Container className="mt-5 pt-5 mb-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="shadow-sm p-4 border-0">
                            <h2 className="mb-4 text-center">Payment & Order Summary</h2>

                            {/* Shipping Address */}
                            <h5 className="mb-3">Shipping Address</h5>
                            <Card className="mb-4 p-3 bg-light">
                                {address ? (
                                    <div>
                                        <p><strong>Name:</strong> {address.name}</p>
                                        <p><strong>Phone:</strong> {address.phone}</p>
                                        <p><strong>Address:</strong> {address.address}, {address.city}, {address.state} - {address.zip}</p>
                                    </div>
                                ) : (
                                    <p>No address found. Please go back and add your shipping address.</p>
                                )}
                            </Card>

                            {/* Order Items */}
                            <h5 className="mb-3">Order Items</h5>
                            <ListGroup className="mb-4">
                                {cart.length > 0 ? (
                                    cart.map((item, idx) => (
                                        <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <strong>{item.name || item.title || "Unnamed Item"}</strong> x {item.quantity || 1}
                                            </div>
                                            <div>₹{(item.price || 0) * (item.quantity || 1)}</div>
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <ListGroup.Item>Your cart is empty.</ListGroup.Item>
                                )}
                            </ListGroup>

                            {/* Discount message */}
                            {message && (
                                <Alert variant="success" className="text-center">
                                    {message}
                                </Alert>
                            )}

                            {/* Pricing Summary */}
                            <Card className="p-3 mb-4 bg-light">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Tax (5%)</span>
                                    <span>₹{tax}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Delivery Charges</span>
                                    <span>₹{delivery}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="d-flex justify-content-between mb-2 text-success">
                                        <span>Discount</span>
                                        <span>-₹{discount}</span>
                                    </div>
                                )}
                                <hr />
                                <div className="d-flex justify-content-between fw-bold">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </Card>

                            {/* Payment Options */}
                            <h5 className="mb-3">Select Payment Method</h5>
                            <Row className="mb-4">
                                <Col>
                                    <Button
                                        variant={paymentMethod === "cod" ? "dark" : "outline-dark"}
                                        className="w-100 d-flex align-items-center justify-content-center gap-2 mb-2"
                                        onClick={() => setPaymentMethod("cod")}
                                    >
                                        <FaMoneyBillWave /> Cash on Delivery
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        variant={paymentMethod === "upi" ? "dark" : "outline-dark"}
                                        className="w-100 d-flex align-items-center justify-content-center gap-2 mb-2"
                                        onClick={() => setPaymentMethod("upi")}
                                    >
                                        <FaQrcode /> UPI Payment
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        variant={paymentMethod === "card" ? "dark" : "outline-dark"}
                                        className="w-100 d-flex align-items-center justify-content-center gap-2 mb-2"
                                        onClick={() => setPaymentMethod("card")}
                                    >
                                        <FaCreditCard /> Card Payment
                                    </Button>
                                </Col>
                            </Row>

                            {/* UPI Form */}
                            {paymentMethod === "upi" && (
                                <Card className="p-3 mb-4 bg-light">
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter your name"
                                                value={upiDetails.name}
                                                onChange={(e) => setUpiDetails({ ...upiDetails, name: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>UPI ID</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="example@upi"
                                                value={upiDetails.upiId}
                                                onChange={(e) => setUpiDetails({ ...upiDetails, upiId: e.target.value })}
                                            />
                                        </Form.Group>
                                    </Form>
                                </Card>
                            )}

                            {/* Card Payment Placeholder */}
                            {paymentMethod === "card" && (
                                <Card className="p-3 mb-4 bg-light">
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Card Number</Form.Label>
                                            <Form.Control type="text" placeholder="1234 5678 9012 3456" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Expiry</Form.Label>
                                            <Form.Control type="text" placeholder="MM/YY" />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>CVV</Form.Label>
                                            <Form.Control type="password" placeholder="123" />
                                        </Form.Group>
                                    </Form>
                                </Card>
                            )}

                            {/* Place Order Button */}
                            <Button
                                variant="dark"
                                className="w-100 py-2"
                                onClick={placeOrder}
                                disabled={cart.length === 0 || !address}
                            >
                                Place Order
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Payment;