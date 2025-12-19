import { useState } from "react";
import api from "../../services/api";
import { Container, Card, Form, Button, Row, Col, Image } from "react-bootstrap";

const AddProduct = () => {
    const [product, setProduct] = useState({
        title: "",
        price: "",
        image: "",
        category: "",
        description: ""
    });

    const [imageError, setImageError] = useState(false); // track invalid image

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.category) {
            alert("Please select a category.");
            return;
        }

        try {
            await api.post("/products", product);
            alert("Product added successfully!");
            setProduct({ title: "", price: "", image: "", category: "", description: "" });
            setImageError(false);
        } catch (error) {
            console.error(error);
            alert("Failed to add product. Please try again.");
        }
    };

    const handleImageChange = (url) => {
        setProduct({ ...product, image: url });
        setImageError(false);
    };

    return (
        <Container className="mt-5 mb-5">
            <Card className="p-4 shadow-lg">
                <h2 className="text-center mb-4">Add New Product</h2>

                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="productTitle" className="mb-3">
                                <Form.Label>Product Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product title"
                                    value={product.title}
                                    onChange={(e) =>
                                        setProduct({ ...product, title: e.target.value })
                                    }
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="productPrice" className="mb-3">
                                <Form.Label>Price (₹)</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter price"
                                    value={product.price}
                                    onChange={(e) =>
                                        setProduct({ ...product, price: e.target.value })
                                    }
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="productCategory" className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select
                                    value={product.category}
                                    onChange={(e) =>
                                        setProduct({ ...product, category: e.target.value })
                                    }
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="healingstone">HEALING CRYSTALS</option>
                                    <option value="bracelet">CRYSTAL BRACELETS</option>
                                    <option value="pendant">PENDANTS</option>
                                    <option value="ring">RINGS</option>
                                    <option value="tree">CRYSTAL TREES</option>
                                    <option value="showpiece">SHOWPIECES</option>
                                    <option value="sage">SAGE</option>
                                    <option value="amethyst">AMETHYST</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="productImage" className="mb-3">
                                <Form.Label>Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image URL"
                                    value={product.image}
                                    onChange={(e) => handleImageChange(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Live Image Preview */}
                    {product.image && !imageError && (
                        <div className="text-center mb-3">
                            <Image
                                src={product.image}
                                alt="Product Preview"
                                thumbnail
                                style={{ maxHeight: "200px", borderRadius: "8px" }}
                                onError={() => setImageError(true)}
                            />
                        </div>
                    )}

                    {imageError && (
                        <div className="text-center mb-3 text-danger">
                            Invalid image URL
                        </div>
                    )}

                    <Form.Group controlId="productDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Enter product description"
                            value={product.description}
                            onChange={(e) =>
                                setProduct({ ...product, description: e.target.value })
                            }
                            required
                        />
                    </Form.Group>

                    <Button type="submit" variant="warning" className="w-100">
                        Add Product
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default AddProduct;