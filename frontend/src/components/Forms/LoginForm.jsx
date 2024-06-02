import React from "react";
import styled from "styled-components";
import Form from "./Form";
import Label from "./Label";
import Input from "./Input";
import PrimaryButton from "../Buttons/PrimaryButton";
import ErrorMessage from "./ErrorMessage";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const LoginForm = ({ formData, handleChange, handleBlur, handleSubmit, emailValid }) => {
    return (
        <Form id="login-form" type="submit" onSubmit={handleSubmit}>
            <Label htmlFor="email">Email address*</Label>
            <Input
                name="email"
                id="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {!emailValid && (
                <ErrorMessage>
                    Invalid email address! Please use email@example.com format.
                </ErrorMessage>
            )}
            <Label htmlFor="password">Password*</Label>
            <Input
                name="password"
                id="password"
                placeholder="Password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
            />
            <ButtonContainer>
                <PrimaryButton type="submit">
                    Log In
                </PrimaryButton>
            </ButtonContainer>
        </Form>
    );
};

export default LoginForm;
