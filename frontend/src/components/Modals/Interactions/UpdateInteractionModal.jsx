import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PrimaryButton from "../../Buttons/PrimaryButton";
import Input from "../Input";
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
    background-color: white;
    padding: 20px;
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

const UpdateInteractionModal = ({ isOpen, onClose, onUpdate, interaction }) => {
    const [agentId, setAgentId] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [type, setType] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (isOpen && interaction) {
            setAgentId(interaction.agent_id);
            setCustomerId(interaction.customer_id);
            setType(interaction.type);
            setContent(interaction.content);
        }
    }, [isOpen, interaction]);

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
                    <Label>Agent ID*</Label>
                    <Input
                        type="text"
                        required
                        value={agentId}
                        onChange={(event) => setAgentId(event.target.value)}
                    />
                </FormField>
                <FormField>
                    <Label>Customer ID*</Label>
                    <Input
                        type="text"
                        required
                        value={customerId}
                        onChange={(event) => setCustomerId(event.target.value)}
                    />
                </FormField>
                <FormField>
                    <Label>Type*</Label>
                    <Input
                        type="text"
                        required
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                    />
                </FormField>
                <FormField>
                    <Label>Content*</Label>
                    <Input
                        type="text"
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
