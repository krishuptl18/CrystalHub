import { Container, Card, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../style/Checkout.css"; // 👈 reuse same lock styles

const MyOrders = () => {
    const navigate = useNavigate();
    const authUser = JSON.parse(localStorage.getItem("authUser"));

    /* 🔐 BLOCK IF NOT LOGGED IN */
    if (!authUser) {
        return (
            <>
                <Header />

                <div className="checkout-lock-screen mt-5">
                    <div className="lock-card">
                        <div className="lock-icon">📦</div>
                        <h3>Login Required</h3>
                        <p>
                            Please log in to view your orders and track your
                            purchases.
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

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    /* FILTER USER ORDERS */
    const userOrders = allOrders.filter(
        (order) => order.user === authUser.email
    );

    return (
        <>
            <Header />

            <Container className="mt-5 pt-5 mb-5">
                <h2 className="mb-4 fw-bold mt-5">My Orders</h2>

                {userOrders.length === 0 ? (
                    <div className="text-center mt-5">
                        <h5>No orders yet 😒</h5>
                        <Button
                            className="mt-3"
                            variant="success"
                            onClick={() => navigate("/shop")}
                        >
                            Shop Now
                        </Button>
                    </div>
                ) : (
                    userOrders.map((order) => (
                        <Card key={order.id} className="mb-4 shadow-sm">
                            <Card.Body>
                                <div className="d-flex justify-content-between flex-wrap">
                                    <div>
                                        <h6 className="fw-bold">
                                            Order ID: #{order.id}
                                        </h6>
                                        <small className="text-muted">
                                            {order.date}
                                        </small>
                                    </div>

                                    <Badge bg="success" className="align-self-start">
                                        {order.status}
                                    </Badge>
                                </div>

                                <hr />

                                {/* ITEMS */}
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="d-flex align-items-center mb-3"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            width="55"
                                            className="me-3 rounded"
                                        />

                                        <div className="flex-grow-1">
                                            <strong>{item.title}</strong>
                                            <div className="text-muted">
                                                ₹{item.price} × {item.quantity}
                                            </div>
                                        </div>

                                        <strong>
                                            ₹{item.price * item.quantity}
                                        </strong>
                                    </div>
                                ))}

                                <hr />

                                <div className="d-flex justify-content-between fw-bold">
                                    <span>Total</span>
                                    <span>₹{order.total}</span>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </Container>

            <Footer />
        </>
    );
};

export default MyOrders;