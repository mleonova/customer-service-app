import React from "react";
import Form from "./Form";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";

const LoginForm = ({ formData, handleChange, handleSubmit, emailValid }) => (
    <Form id="login-form" onSubmit={handleSubmit}>
        <Label htmlFor="email">Email address*</Label>
        <Input
            name="email"
            id="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
        />
        {!emailValid && (
            <ErrorMessage>
                Invalid email address. Please use email@example.com format.
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
        <Button>Sign In</Button>
    </Form>
);

export default LoginForm;
