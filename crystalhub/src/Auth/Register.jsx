import React from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../style/Auth.css";

const Register = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find(
            (u) => u.email === data.email
        );

        if (userExists) {
            alert("User already exists");
            return;
        }

        const newUser = {
            ...data,
            role: "user",
            id: Date.now(),
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful!");
        navigate("/login");
    };


    return (
        <Container className="auth-wrapper">
            <div className="auth-card slide-up">
                <h3>Create Account</h3>

                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Control
                        placeholder="Name"
                        {...register("name", { required: true })}
                    />

                    <Form.Control
                        type="email"
                        placeholder="Email"
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