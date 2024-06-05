/*
  CustomerModal Component
  
  This component renders a modal for creating or updating customer information. 
  It allows the user to enter the customer's first name, last name, and email.
  The modal supports validation for required fields.
  
  Props:
  - isOpen (boolean): Determines if the modal is open or not.
  - onClose (function): Function to be called when the modal needs to be closed.
  - onSubmit (function): Function to be called when the form is submitted. It receives the customer data as an argument.
  - title (string): Modal title.
  - customer (object): Customer object that has the initial values for the form fields.
  - submitText (string): Name of the submit button.
  
  State:
  - first_name (string): State to manage the first name field.
  - last_name (string): State to manage the last name field.
  - email (string): State to manage the email field.
  - emailValid (boolean): State indicating if the email input is valid.
  - firstNameValid (boolean): State indicating if the first name input is valid.
  - lastNameValid (boolean): State indicating if the last name input is valid.
  - inputComplete (boolean): State indicating if all required inputs are complete and valid.
 
  Effects:
  - The first useEffect initializes input fields and validation states when the modal opens and the customer changes.
  - The second useEffect validates form input completeness whenever first_name, last_name, or email changes.
 
  Methods:
  - handleBlur: Validates individual form fields on blur event.
  - handleSubmit: Validates the form and calls the onSubmit function with customer data.
 */

import React, { useState, useEffect } from "react";
import { ModalBackdrop, ModalContent, CloseButton, Title, Span, ButtonContainer } from "./ModalStyles";
import PrimaryButton from "../../Buttons/PrimaryButton";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import Form from "../../Forms/Form";
import Input from "../Input";
import Label from "../Label";

const CustomerModal = ({ isOpen, onClose, onSubmit, title, customer = {}, submitText }) => {
    const [first_name, setFirstName] = useState(customer.first_name || "");
    const [last_name, setLastName] = useState(customer.last_name || "");
    const [email, setEmail] = useState(customer.email || "");
    const [emailValid, setEmailValid] = useState(true);
    const [firstNameValid, setFirstNameValid] = useState(true);
    const [lastNameValid, setLastNameValid] = useState(true);
    const [inputComplete, setInputComplete] = useState(false);
    const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

    useEffect(() => {
        if (isOpen && customer) {
            setFirstName(customer.first_name || "");
            setLastName(customer.last_name || "");
            setEmail(customer.email || "");
            setFirstNameValid(true);
            setLastNameValid(true);
            setEmailValid(true);
            setInputComplete(false);
        }
    }, [isOpen, customer]);

    useEffect(() => {
        setInputComplete(first_name !== "" && last_name !== "" && email !== "" && emailValid);
    }, [first_name, last_name, email, emailValid]);

    const handleBlur = (event) => {
        const { name, value } = event.target;
        if (name === "first_name") {
            setFirstNameValid(value.trim() !== "");
        } else if (name === "last_name") {
            setLastNameValid(value.trim() !== "");
        } else if (name === "email") {
            setEmailValid(EMAIL_REGEX.test(value));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!inputComplete) {
            setFirstNameValid(first_name.trim() !== "");
            setLastNameValid(last_name.trim() !== "");
            setEmailValid(EMAIL_REGEX.test(email));
            return;
        }

        const customerData = {
            ...customer,
            first_name,
            last_name,
            email,
        };

        await onSubmit(customerData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalBackdrop>
            <ModalContent>
                <Form id="add-customer-form" type="submit" onSubmit={handleSubmit}>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                    <Title>{title}</Title>
                    <Label>First Name*</Label>
                    <Input
                        type="text"
                        name="first_name"
                        required
                        value={first_name}
                        onChange={(event) => setFirstName(event.target.value)}
                        onBlur={handleBlur}
                    />
                    {!firstNameValid && (
                        <ErrorMessage>
                            First name is required.
                        </ErrorMessage>
                    )}
                    <Label>Last Name*</Label>
                    <Input
                        type="text"
                        name="last_name"
                        required
                        value={last_name}
                        onChange={(event) => setLastName(event.target.value)}
                        onBlur={handleBlur}
                    />
                    {!lastNameValid && (
                        <ErrorMessage>
                            Last name is required.
                        </ErrorMessage>
                    )}
                    <Label>Email*</Label>
                    <Input
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        onBlur={handleBlur}
                    />
                    {!emailValid && (
                        <ErrorMessage>
                            Invalid email address! Please use email@example.com format.
                        </ErrorMessage>
                    )}
                    <ButtonContainer>
                        <PrimaryButton type="submit">
                            <Span>{submitText}</Span>
                        </PrimaryButton>
                    </ButtonContainer>
                </Form>
            </ModalContent>
        </ModalBackdrop>
    );
};

export default CustomerModal;
