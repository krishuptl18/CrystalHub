import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../style/Auth.css";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        // ADMIN LOGIN
        if (
            data.email === "admin@crystalhub.com" &&
            data.password === "admin123"
        ) {
            localStorage.setItem(
                "authUser",
                JSON.stringify({
                    name: "Admin",
                    email: data.email,
                    role: "admin",
                })
            );
            localStorage.setItem("isLoggedIn", true);
            navigate("/admin/dashboard");
            return;
        }

        // USER LOGIN
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (u) => u.email === data.email && u.password === data.password
        );

        if (!user) {
            alert("Invalid credentials");
            return;
        }

        localStorage.setItem("authUser", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", true);
        navigate("/");
    };

    return (
        <Container fluid className="auth-wrapper">
            <div className="auth-card glass slide-up">
                <h3 className="auth-title">Welcome Back</h3>
                <p className="auth-subtitle">Login to CrystalHub</p>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Control
                        type="email"
                        placeholder="Email address"
                        {...register("email", { required: true })}
                    />

                    <Form.Control
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true })}
                    />

                    <Button type="submit" className="auth-btn">
                        Login
                    </Button>
                </Form>

                <p className="switch-text">
                    New user? <Link to="/register">Create account</Link>
                </p>
            </div>
        </Container>
    );
};

export default Login;
