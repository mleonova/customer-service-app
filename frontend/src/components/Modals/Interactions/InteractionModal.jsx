/*
  InteractionModal Component
 
  This component renders a modal for creating or updating customer interactions.
  It allows the user to select a customer, interaction type, and provide content for the interaction. 
  The modal supports validation for required fields.
 
  Props:
  - isOpen: Boolean indicating whether the modal is open or closed.
  - onClose: Function to be called when the modal needs to be closed.
  - onSubmit: Function to be called when the form is submitted. It receives the interaction data as an argument.
  - title: Modal title.
  - interaction: Customer object that has the initial values for the form fields.
  - submitText: Name of the submit button.
 
  States:
  - customers: Array of customer objects fetched from the server.
  - agent_id: String representing the ID of the agent creating or updating the interaction.
  - customer_id: String representing the selected customer ID.
  - type: String representing the selected interaction type.
  - content: String representing the content of the interaction.
  - customerValid: Boolean indicating if the customer selection is valid.
  - typeValid: Boolean indicating if the interaction type selection is valid.
  - contentValid: Boolean indicating if the content input is valid.
  - inputComplete: Boolean indicating if all required inputs are complete and valid.
 
  Effects:
  - The first useEffect loads customers from the server when the modal opens and the interaction changes.
  - The second useEffect initializes the agent_id from local storage when the component mounts.
  - The third useEffect validates form input completeness whenever customer_id, type, or content changes.
 
  Methods:
  - loadCustomers: Fetches customer data from the server and updates state.
  - handleBlur: Validates individual form fields on blur event.
  - handleSubmit: Validates the form and calls the onSubmit function with interaction data.
 */

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { ModalBackdrop, ModalContent, CloseButton, Title, Span, ButtonContainer, ContentTextarea, Select } from "./ModalStyles";
import { fetchCustomers } from "../../../modules/Dashboard/Customers/CustomerActions";
import PrimaryButton from "../../Buttons/PrimaryButton";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import Form from "../../Forms/Form";
import Label from "../Label";

const InteractionModal = ({ isOpen, onClose, onSubmit, title, interaction = {}, submitText }) => {
    const [customers, setCustomers] = useState([]);
    const interactionTypes = ["Phone", "Email", "Chat"];
    const [agent_id, setAgentId] = useState(interaction.customer_id || "");
    const [customer_id, setCustomerId] = useState(interaction.customer_id || "");
    const [type, setType] = useState(interaction.type || "");
    const [content, setContent] = useState(interaction.content || "");
    const [customerValid, setCustomerValid] = useState(true);
    const [typeValid, setTypeValid] = useState(true);
    const [contentValid, setContentValid] = useState(true);
    const [inputComplete, setInputComplete] = useState(false);

    useEffect(() => {
        if (isOpen && interaction) {
            setCustomerId(interaction.customer_id || "");
            setType(interaction.type || "");
            setContent(interaction.content || "");
            setCustomerValid(true);
            setTypeValid(true);
            setContentValid(true);
            setInputComplete(false);
        }
    }, [isOpen, interaction]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (token) {
            const decodedToken = jwtDecode(token);
            const agentIdFromToken = decodedToken.sub;
            setAgentId(agentIdFromToken);
        }

        loadCustomers();
    }, []);

    useEffect(() => {
        setInputComplete(customer_id !== "" && type !== "" && content !== "");
    }, [customer_id, type, content]);

    const loadCustomers = async () => {
        try {
            const data = await fetchCustomers();
            setCustomers(data);
        } catch (error) {
            console.error("Error loading customers:", error);
        }
    };

    const handleBlur = (event) => {
        const { name, value } = event.target;
        if (name === "customer_id") {
            setCustomerValid(value.trim() !== "");
        } else if (name === "type") {
            setTypeValid(value.trim() !== "");
        } else if (name === "content") {
            setContentValid(value !== "");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!inputComplete) {
            setCustomerValid(customer_id.trim() !== "");
            setTypeValid(type.trim() !== "");
            setContentValid(content !== "");
            return;
        }

        const currentDate = new Date().toISOString();
        const interactionData = {
            ...interaction,
            agent_id,
            customer_id,
            created_at: currentDate,
            type,
            content,
        };

        await onSubmit(interactionData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalBackdrop>
            <ModalContent>
                <Form id="interaction-form" type="submit" onSubmit={handleSubmit}>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                    <Title>{title}</Title>
                    <Label>Customer*</Label>
                    <Select
                        required
                        value={customer_id}
                        onChange={(event) => setCustomerId(event.target.value)}
                        onBlur={handleBlur}
                    >
                        <option value="">Select a customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {`${customer.id} - ${customer.first_name} ${customer.last_name}`}
                            </option>
                        ))}
                    </Select>
                    {!customerValid && (
                        <ErrorMessage>
                            Please select a customer.
                        </ErrorMessage>
                    )}
                    <Label>Type*</Label>
                    <Select
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                        onBlur={handleBlur}
                    >
                        <option value="">Select a type</option>
                        {interactionTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Select>
                    {!typeValid && (
                        <ErrorMessage>
                            Please select an interaction type.
                        </ErrorMessage>
                    )}
                    <Label>Content*</Label>
                    <ContentTextarea
                        name="content"
                        required
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        onBlur={handleBlur}
                    />
                    {!contentValid && (
                        <ErrorMessage>
                            Content is required.
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

export default InteractionModal;
