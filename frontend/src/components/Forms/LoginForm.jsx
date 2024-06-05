/*
  LoginForm Component

  This component renders a login form including input fields for email and password,
  and a submit button. It also displays an error message if the email address format
  is invalid.

  Props:
  - formData: Object containing the form data.
  - handleChange: Function to handle changes in form inputs.
  - handleBlur: Function to handle blur events in form inputs.
  - handleSubmit: Function to handle form submission.
  - emailValid: Boolean indicating whether the email address format is valid.
  */

import React from "react";
import Form from "./Form";
import Label from "./Label";
import Input from "./Input";
import PrimaryButton from "../Buttons/PrimaryButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ButtonContainer } from "./FormStyles";

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
