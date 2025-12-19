import { useEffect, useState } from "react";
import api from "../../services/api";
import { Card, Row, Col } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        users: 0
    });

    useEffect(() => {
        const loadStats = async () => {
            const productsRes = await api.get("/products");
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const orders = JSON.parse(localStorage.getItem("orders")) || [];

            setStats({
                products: productsRes.data.length,
                users: users.length,
                orders: orders.length
            });
        };

        loadStats();
    }, []);

    const barData = {
        labels: ["Products", "Orders", "Users"],
        datasets: [
            {
                label: "Count",
                data: [stats.products, stats.orders, stats.users],
                backgroundColor: ["#ffc107", "#0d6efd", "#198754"]
            }
        ]
    };

    const doughnutData = {
        labels: ["Products", "Orders", "Users"],
        datasets: [
            {
                data: [stats.products, stats.orders, stats.users],
                backgroundColor: ["#ffc107", "#0d6efd", "#198754"]
            }
        ]
    };

    return (
        <>
            <h2 className="mb-4 fw-bold text-center">
                Admin Dashboard
            </h2>

            {/* STATS */}
            <Row className="mb-4 g-3">
                <Col xs={12} md={4}>
                    <Card className="shadow-sm text-center">
                        <Card.Body>
                            <h5>Total Products</h5>
                            <h2 className="fw-bold">{stats.products}</h2>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={4}>
                    <Card className="shadow-sm text-center">
                        <Card.Body>
                            <h5>Total Orders</h5>
                            <h2 className="fw-bold">{stats.orders}</h2>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={4}>
                    <Card className="shadow-sm text-center">
                        <Card.Body>
                            <h5>Registered Users</h5>
                            <h2 className="fw-bold">{stats.users}</h2>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* CHARTS */}
            <Row className="g-3">
                <Col xs={12} lg={7}>
                    <Card className="shadow-sm p-3">
                        <h5 className="text-center mb-3">Overview</h5>
                        <Bar data={barData} />
                    </Card>
                </Col>

                <Col xs={12} lg={5}>
                    <Card className="shadow-sm p-3">
                        <h5 className="text-center mb-3">Distribution</h5>
                        <Doughnut data={doughnutData} />
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;