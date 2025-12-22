import { useEffect, useState } from "react";
import api from "../../services/api";
import {
    Table,
    Button,
    Modal,
    Form,
    Row,
    Col,
    Image,
    Card
} from "react-bootstrap";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [imageError, setImageError] = useState(false);

    // 🔍 Search & Category Filter
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");

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

    // 🔎 Filter Logic
    const filteredProducts = products.filter((p) => {
        const matchSearch = p.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =
            category === "all" || p.category === category;

        return matchSearch && matchCategory;
    });

    return (
        <>
            <h2 className="mb-4 text-center fw-bold">All Products</h2>

            <Card className="shadow-sm border-0">
                <Card.Body>

                    {/* 🔍 SEARCH + CATEGORY FILTER */}
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Control
                                placeholder="Search product by title..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>

                        <Col md={6}>
                            <Form.Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="all">All Categories</option>
                                
                                  
                                    <option value="healingstone">HEALING CRYSTALS</option>
                                    <option value="bracelet">CRYSTAL BRACELETS</option>
                                    <option value="pendant">PENDANTS</option>
                                    <option value="ring">RINGS</option>
                                    <option value="tree">CRYSTAL TREES</option>
                                    <option value="showpiece">SHOWPIECES</option>
                                    <option value="sage">SAGE</option>
                                    <option value="amethyst">AMETHYST</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    {/* 🧾 PRODUCT TABLE */}
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
                            {filteredProducts.map((p) => (
                                <tr key={p.id}>
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
                                    <td className="text-capitalize">
                                        {p.category}
                                    </td>
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

                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center text-muted"
                                    >
                                        No products found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* ✏️ EDIT MODAL */}
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
                                       
                                    <option value="healingstone">HEALING CRYSTALS</option>
                                    <option value="bracelet">CRYSTAL BRACELETS</option>
                                    <option value="pendant">PENDANTS</option>
                                    <option value="ring">RINGS</option>
                                    <option value="tree">CRYSTAL TREES</option>
                                    <option value="showpiece">SHOWPIECES</option>
                                    <option value="sage">SAGE</option>
                                    <option value="amethyst">AMETHYST</option>
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
                            <Button
                                variant="secondary"
                                onClick={() => setShowModal(false)}
                            >
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