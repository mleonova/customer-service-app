import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormContainer from "../../components/Containers/FormContainer";
import SignupForm from "../../components/Forms/SignupForm";
import ErrorMessage from "../../components/Forms/ErrorMessage";

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
        firstName: "",
        lastName: ""
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
            fetch("http://localhost:5000/api/agent/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Success:", data);
                    setFormData({ email: "", password: "", firstName: "", lastName: "" });
                    navigate("/dashboard");
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
