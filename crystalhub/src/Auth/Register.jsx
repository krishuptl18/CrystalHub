import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../style/Auth.css";

const Register = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find((u) => u.email === data.email)) {
            alert("User already exists");
            return;
        }

        users.push({
            ...data,
            role: "user",
            id: Date.now(),
        });

        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful!");
        navigate("/login");
    };

    return (
        <Container fluid className="auth-wrapper">
            <div className="auth-card glass slide-up">
                <h3 className="auth-title">Create Account</h3>
                <p className="auth-subtitle">Join CrystalHub today</p>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Control
                        placeholder="Full Name"
                        {...register("name", { required: true })}
                    />

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
                        Register
                    </Button>
                </Form>

                <p className="switch-text">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </Container>
    );
};

export default Register;
