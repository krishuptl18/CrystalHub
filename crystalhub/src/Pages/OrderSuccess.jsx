import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Container
                className="text-center"
                style={{ marginTop: "150px", minHeight: "50vh" }}
            >
                <h2>🎉 Order Placed Successfully!</h2>
                <p>Thank you for shopping with us.</p>

                <Button
                    variant="success"
                    className="mt-3"
                    onClick={() => navigate("/")}
                >
                    Continue Shopping
                </Button>
            </Container>
            <Footer />
        </>
    );
};

export default OrderSuccess;