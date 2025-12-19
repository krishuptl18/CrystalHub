import { useEffect, useState } from "react";
import api from "../../services/api";
import { Table, Button, Modal, Form, Row, Col, Image, Card } from "react-bootstrap";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [imageError, setImageError] = useState(false);

    const loadProducts = async () => {
        const res = await api.get("/products");
        setProducts(res.data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const deleteProduct = async (id) => {
        if (window.confirm("Delete this product?")) {
            await api.delete(`/products/${id}`);
            loadProducts();
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setImageError(false);
        setShowModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await api.put(`/products/${editProduct.id}`, editProduct);
        alert("Product updated successfully!");
        setShowModal(false);
        loadProducts();
    };

    return (
        <>
            <h2 className="mb-4 text-center fw-bold">All Products</h2>

            <Card className="shadow-sm border-0">
                <Card.Body>
                    <Table hover responsive className="align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id}>
                                    {/* IMAGE COLUMN */}
                                    <td>
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            style={{
                                                width: "55px",
                                                height: "55px",
                                                objectFit: "cover",
                                                borderRadius: "6px",
                                                border: "1px solid #ddd"
                                            }}
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://via.placeholder.com/55?text=No+Img";
                                            }}
                                        />
                                    </td>

                                    <td>{p.title}</td>

                                    <td className="text-capitalize">{p.category}</td>

                                    <td>₹{p.price}</td>

                                    <td className="text-center">
                                        <Button
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleEdit(p)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => deleteProduct(p.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                </Card.Body>
            </Card>

            {/* ================= EDIT MODAL ================= */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>

                {editProduct && (
                    <Form onSubmit={handleUpdate}>
                        <Modal.Body>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        value={editProduct.title}
                                        onChange={(e) =>
                                            setEditProduct({
                                                ...editProduct,
                                                title: e.target.value
                                            })
                                        }
                                        required
                                    />
                                </Col>

                                <Col md={6}>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={editProduct.price}
                                        onChange={(e) =>
                                            setEditProduct({
                                                ...editProduct,
                                                price: e.target.value
                                            })
                                        }
                                        required
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select
                                        value={editProduct.category}
                                        onChange={(e) =>
                                            setEditProduct({
                                                ...editProduct,
                                                category: e.target.value
                                            })
                                        }
                                        required
                                    >
                                        <option value="bracelets">Bracelets</option>
                                        <option value="tree">Crystal Tree</option>
                                        <option value="pyramid">Pyramid</option>
                                        <option value="selenite">Selenite</option>
                                        <option value="tumbled">Tumbled Stone</option>
                                        <option value="ball">Crystal Ball</option>
                                        <option value="bottle">Bottle</option>
                                        <option value="roller">Face Roller</option>
                                        <option value="lamp">Salt Lamp</option>
                                        <option value="zibucoin">Zibu Coin</option>
                                        <option value="crystalangel">Crystal Angel</option>
                                    </Form.Select>
                                </Col>

                                <Col md={6}>
                                    <Form.Label>Image URL</Form.Label>
                                    <Form.Control
                                        value={editProduct.image}
                                        onChange={(e) => {
                                            setEditProduct({
                                                ...editProduct,
                                                image: e.target.value
                                            });
                                            setImageError(false);
                                        }}
                                        required
                                    />
                                </Col>
                            </Row>

                            {/* Image Preview */}
                            {editProduct.image && !imageError && (
                                <div className="text-center mb-3">
                                    <Image
                                        src={editProduct.image}
                                        thumbnail
                                        style={{ maxHeight: "180px" }}
                                        onError={() => setImageError(true)}
                                    />
                                </div>
                            )}

                            {imageError && (
                                <p className="text-danger text-center">
                                    Invalid image URL
                                </p>
                            )}

                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editProduct.description}
                                onChange={(e) =>
                                    setEditProduct({
                                        ...editProduct,
                                        description: e.target.value
                                    })
                                }
                                required
                            />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="warning">
                                Update Product
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Modal>
        </>
    );
};

export default ProductList;