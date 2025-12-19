import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa"; // Added cart icon
import "../style/Header.css";
import logo from "../assets/logo.png";

const Header = () => {
    const navigate = useNavigate();

    // Get logged in user
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const handleLogout = () => {
        localStorage.removeItem("authUser");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    const handleShopNow = () => {
        navigate("/checkout"); // Navigate to checkout page
    };

    return (
        <Navbar expand="lg" className="crystal-navbar" fixed="top">
            <Container>
                {/* Logo */}
                <Navbar.Brand as={Link} to="/" className="brand">
                    <div className="logo-wrapper">
                        <img src={logo} alt="CrystalZone" className="logo" />
                    </div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto nav-links align-items-lg-center">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About Us</Nav.Link>

                        {/* Crystals Dropdown */}
                        <NavDropdown title="Crystals" id="crystals-dropdown">
                            <NavDropdown.Item as={Link} to="/products/healingstone">
                                HEALING CRYSTALS
                            </NavDropdown.Item>
                           <NavDropdown.Item as={Link} to="/products/bracelet">
                                CRYSTAL BRACELETS
                            </NavDropdown.Item>
                           <NavDropdown.Item as={Link} to="/products/pendant">
                                PENDANTS
                            </NavDropdown.Item>
                           <NavDropdown.Item as={Link} to="/products/ring">
                                RINGS
                            </NavDropdown.Item>
                           <NavDropdown.Item as={Link} to="/products/tree">
                                CRYSTAL TREES
                            </NavDropdown.Item>
                           <NavDropdown.Item as={Link} to="/products/showpiece">
                                SHOWPIECES
                            </NavDropdown.Item>
                           <NavDropdown.Item as={Link} to="/products/sage">
                                SAGE
                            </NavDropdown.Item>
                           <NavDropdown.Item as={Link} to="/products/amethyst">
                                AMETHYST
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link as={Link} to="/service">Our Services</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>

                        {/* Search */}
                        <Form className="search-form ms-md-3 me-3">
                            <Form.Control
                                type="search"
                                placeholder="Search crystals..."
                                className="search-input"
                            />
                        </Form>

                        {/* SHOP NOW BUTTON */}
                        <Button
                            variant="success"
                            className="me-3 d-flex align-items-center gap-1"
                            onClick={handleShopNow}
                        >
                            <FaShoppingCart /> Shop Now
                        </Button>

                        {/* PROFILE DROPDOWN */}
                        <NavDropdown
                            title={
                                <span className="d-flex align-items-center gap-2 profile-title">
                                    <FaUserCircle size={18} />
                                    {authUser?.name || "Guest"}
                                </span>
                            }
                            id="profile-dropdown"
                            align="end"
                            menuVariant="dark"
                        >
                            {!isLoggedIn ? (
                                <>
                                    <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
                                </>
                            ) : (
                                <>
                                    {authUser?.role === "admin" && (
                                        <NavDropdown.Item as={Link} to="/admin/dashboard">
                                            Admin Dashboard
                                        </NavDropdown.Item>
                                    )}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;