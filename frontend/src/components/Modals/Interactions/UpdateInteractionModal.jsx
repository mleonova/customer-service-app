import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PrimaryButton from "../../Buttons/PrimaryButton";
import Label from "../Label";

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    width: 60%;
    background-color: white;
    padding: 30px;
    margin: 20px;
    border-radius: 5px;
    position: relative;
`;

const CloseButton = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 30px;
`;

const Title = styled.h3`
    font-weight: 500;
    margin: 20px;
`;

const FormField = styled.div`
    margin: 10px;

    select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 16px;
        color: #333;
        background-color: white;
    }

    option {
        color: black;
    }
`;

const Span = styled.span`
    padding: 10px 50px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 10px 10px;
`;

const ContentTextarea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 10px;
    resize: vertical;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s;
`;

const UpdateInteractionModal = ({ isOpen, onClose, onUpdate, interaction }) => {
    const interactionTypes = ["Call", "Email", "Bot"];
    const [agentId, setAgentId] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [type, setType] = useState("");
    const [content, setContent] = useState("");
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        if (isOpen && interaction) {
            setAgentId(interaction.agent_id);
            setCustomerId(interaction.customer_id);
            setType(interaction.type);
            setContent(interaction.content);
        }
    }, [isOpen, interaction]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/customer/customers");
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };
    const handleUpdate = async () => {
        const interactionData = {
            id: interaction.id,
            agentId,
            customerId,
            type,
            content,
        };

        await onUpdate(interactionData);
    };

    if (!isOpen) return null;

    return (
        <ModalBackdrop>
            <ModalContent>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>Update Interaction</Title>

                <FormField>
                    <Label>Customer*</Label>
                    <select
                        required
                        value={customerId}
                        onChange={(event) => setCustomerId(event.target.value)}
                    >
                        <option value="">Select a customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {`${customer.id} - ${customer.first_name} ${customer.last_name}`}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField>
                    <Label>Type*</Label>
                    <select
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                    >
                        <option value="">Select a type</option>
                        {interactionTypes.map((interactionType) => (
                            <option key={interactionType} value={interactionType}>
                                {interactionType}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField>
                    <Label>Content*</Label>
                    <ContentTextarea
                        required
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                </FormField>

                <ButtonContainer>
                    <PrimaryButton onClick={handleUpdate}>
                        <Span>Update</Span>
                    </PrimaryButton>
                </ButtonContainer>
            </ModalContent>
        </ModalBackdrop>
    );
};

export default UpdateInteractionModal;
