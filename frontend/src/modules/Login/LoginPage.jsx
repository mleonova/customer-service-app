import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FlexContainer from "../../components/Containers/FlexColumnContainer";
import FormContainer from "../../components/Containers/FormContainer";
import Header from "../../components/TextComponents/Header";
import Paragraph from "../../components/TextComponents/Paragraph";
import LoginForm from "../../components/Forms/LoginForm";

const Span = styled.span`
    color: blue;
`;

const StyledLink = styled.a`
    text-decoration: none;
`;

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [emailValid, setEmailValid] = useState(true);
    const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const navigate = useNavigate();

    const validateEmail = () => {
        let emailValid = String(formData.email).match(EMAIL_REGEX);
        return emailValid && emailValid.length > 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const emailValid = validateEmail(formData.email);
        setEmailValid(emailValid);

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
                    navigate("/dashboard");
                })
                .catch((error) => {
                    console.error("Error:", error);
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
                    emailValid={emailValid}
                />
                <Paragraph>Don't have an account?
                    <Span> <StyledLink href="/signup">Sign up</StyledLink></Span></Paragraph>
            </FormContainer>
        </FlexContainer>
    );
}

export default LoginPage;
