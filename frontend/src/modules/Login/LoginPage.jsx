import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FlexContainer from "../../components/Containers/FlexVerticalContainer";
import FormContainer from "../../components/Containers/FormContainer";
import LoginForm from "../../components/Forms/LoginForm";
import ErrorMessage from "../../components/Forms/ErrorMessage";

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
            fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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
                    console.log("Success:", data);
                    localStorage.setItem("agentId", data.agent_id);
                    setFormData({ email: "", password: "" });
                    navigate("/dashboard");
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setError(error);
                    setFormData({ email: "", password: "" });
                });
        }
    };

    return (
        <FlexContainer>
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
        </FlexContainer>
    );
};

export default LoginPage;
