/**
  SignupPage Component
 
  This component renders a signup form allowing users to create a new account.
  It includes input fields for email, password, first name, and last name.
  The component validates the email format and displays an error message if the signup process fails.
 
  States:
  - formData: Holds the current form data (email, password, first name, last name).
  - emailValid: Boolean to indicate if the entered email is valid.
  - error: Stores any error message returned during the signup process.
 
  Methods:
  - validateEmail: Validates the email format using a regex pattern.
  - handleBlur: Validates the email when the email input field loses focus.
  - handleChange: Updates the form data state when the user types in the input fields.
  - handleSubmit: Handles the form submission, sends the signup request to the server, and processes the response.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormContainer from "../../components/Containers/FormContainer";
import SignupForm from "../../components/Forms/SignupForm";
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

const SignupPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    });
    const [emailValid, setEmailValid] = useState(true);
    const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validateEmail = () => {
        let emailValid = String(formData.email).match(EMAIL_REGEX);
        return emailValid && emailValid.length > 0;
    };

    const handleBlur = (event) => {
        if (event.target.name === "email") {
            setEmailValid(EMAIL_REGEX.test(event.target.value));
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let emailValid = validateEmail();
        setEmailValid(emailValid);

        if (emailValid) {
            fetch("http://127.0.0.1:5000/api/agent/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.access_token) {
                        localStorage.setItem("access_token", data.access_token);
                        setFormData({ email: "", password: "", first_name: "", last_name: "" });
                        navigate("/dashboard");
                    }
                    else {
                        setError(data.message || "Signup failed");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setError(error);
                });
        }
    };

    return (
        <div>
            <Container>
                <Header>Create an account</Header>
                <Paragraph>Please enter the following fields to create an account.</Paragraph>
                <FormContainer>
                    <SignupForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handleBlur={handleBlur}
                        emailValid={emailValid}
                    />

                    {error !== null && (
                        <ErrorMessage>
                            Failed to sign up. Please try again.
                        </ErrorMessage>
                    )}

                    <Paragraph>
                        Already have an account?
                        <Span>
                            <StyledLink href="/login"> Log in</StyledLink>
                        </Span>
                    </Paragraph>
                </FormContainer>
            </Container>
        </div>
    );
};

export default SignupPage;
