import React from "react";
import Form from "./Form";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";

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
      <ErrorMessage>Invalid. Please use email@example.com format.</ErrorMessage>
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
