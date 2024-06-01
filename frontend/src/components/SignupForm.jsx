import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
`;

const Input = styled.input`
  max-height: 65px;
  min-height: 45px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 2px 0px;
  padding: 0px 10px;
  font-size: 1rem;
  font-weight: 400;

  @media screen and (max-width: 850px) {
    input {
        font-size: 0.9rem;
    }
}
`;

const Label = styled.label`
  text-align: left;

  @media screen and (max-width: 850px) {
    label {
        font-size: 0.9rem;
    }
`;

const Button = styled.button`
  min-height: 35px;
  background-color: #0bbc20;
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: 500;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;

  @media screen and (max-width: 850px) {
    font-size: medium;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
`;

const SignupForm = ({ formData, handleChange, handleSubmit, emailValid }) => (
    <Form id="signup-form" onSubmit={handleSubmit}>
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
            <ErrorMessage>Invalid email address. Please use email@example.com format.</ErrorMessage>
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
        <Label htmlFor="firstName">First name*</Label>
        <Input
            name="firstName"
            id="firstName"
            placeholder="First Name"
            required
            value={formData.firstName}
            onChange={handleChange}
        />
        <Label htmlFor="lastName">Last name*</Label>
        <Input
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={handleChange}
        />
        <Button>Sign Up</Button>
    </Form>
);

export default SignupForm;
