/*
  LoginPage Component
 
  This component renders a login form allowing users to sign in to their account.
  It includes input fields for email and password. 
  The component validates the email format and displays an error message if the login process fails.
 
  States:
  - formData: Holds the current form data (email, password).
  - emailValid: Boolean to indicate if the entered email is valid.
  - error: Stores any error message returned during the login process.
 
  Methods:
  - handleBlur: Validates the email when the email input field loses focus.
  - handleChange: Updates the form data state when the user types in the input fields.
  - handleSubmit: Handles the form submission, sends the login request to the server, and processes the response.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormContainer from "../../components/Containers/FormContainer";
import LoginForm from "../../components/Forms/LoginForm";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
`;

const Header = styled.h1`
    font-weight: 500;
    font-style: normal;
    padding: 100px 50px 20px;
    font-size: 2rem;

    @media screen and (max-width: 850px) {
        font-size: 1.8rem;
        padding: 80px 20px 20px;
    }
`;

const Paragraph = styled.p`
    font-size: 1rem;
    margin: auto;

    @media screen and (max-width: 850px) {
        font-size: 0.9rem;
    }
`;

const Span = styled.span`
    color: blue;
`;

const StyledLink = styled.a`
    text-decoration: none;
`;

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const [emailValid, setEmailValid] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBlur = (event) => {
        if (event.target.name === "email") {
            setEmailValid(EMAIL_REGEX.test(event.target.value));
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (emailValid) {
            fetch("http://127.0.0.1:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Origin": "http://localhost:3000"
                },
                body: JSON.stringify(formData)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to login");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.access_token) {
                        localStorage.setItem("access_token", data.access_token);
                        setFormData({ email: "", password: "" });
                        navigate("/dashboard");
                    }
                    else {
                        setError(data.message || "Signup failed");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setError(error);
                    setFormData({ email: "", password: "" });
                });
        }
    };

    return (
        <Container>
            <Header>Welcome back!</Header>
            <Paragraph>Please enter your email and password to sign in to your account.</Paragraph>
            <FormContainer>
                <LoginForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleBlur={handleBlur}
                    emailValid={emailValid}
                />

                {error !== null && (
                    <ErrorMessage>
                        Failed to login. Please check your credentials.
                    </ErrorMessage>
                )}

                <Paragraph>
                    Don't have an account?
                    <Span>
                        <StyledLink href="/signup"> Sign up</StyledLink>
                    </Span>
                </Paragraph>
            </FormContainer>
        </Container>
    );
};

export default LoginPage;
