import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FlexColumnContainer from "../../components/FlexColumnContainer";
import FormContainer from "../../components/FormContainer";
import SignupForm from "../../components/SignupForm";

const Header = styled.h1`
    font-weight: 500;
    font-style: normal;
    padding: 100px 50px 20px;
    font-size: 2rem;

    @media screen and (max-width: 850px) {
        h1 {
            font-size: 1.8rem;
            padding: 80px 20px 20px;
        }
    }
`;
const Paragraph = styled.p`
    font-size: 1rem;
    padding-top: 20px;
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
    const navigate = useNavigate();

    const validateEmail = () => {
        let emailValid = String(formData.email).match(EMAIL_REGEX);
        return emailValid && emailValid.length > 0;
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
                    navigate('/dashboard');
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    return (
        <div>
            <FlexColumnContainer>
                <Header>Create an account</Header>
                <Paragraph>Please enter the following fields to create an account.</Paragraph>
                <FormContainer>
                    <SignupForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        emailValid={emailValid}
                    />
                    <Paragraph>
                        Already have an account?
                        <Span><StyledLink href="/signin"> Sign in</StyledLink></Span>
                    </Paragraph>
                </FormContainer>
            </FlexColumnContainer>
        </div>
    );
}

export default SignupPage;
