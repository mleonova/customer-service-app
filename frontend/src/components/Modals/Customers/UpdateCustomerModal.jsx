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

const UpdateCustomerModal = ({ isOpen, onClose, onUpdate, customer }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (isOpen && customer) {
            setFirstName(customer.first_name);
            setLastName(customer.last_name);
            setEmail(customer.email);
        }
    }, [isOpen, customer]);

    const handleUpdate = async () => {
        const customerData = {
            id: customer.id,
            firstName,
            lastName,
            email,
        };

        await onUpdate(customerData);
    };

    if (!isOpen) return null;

    return (
        <ModalBackdrop>
            <ModalContent>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>Update Customer</Title>

                <FormField>
                    <Label>First Name*</Label>
                    <Input
                        type="text"
                        required
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </FormField>
                <FormField>
                    <Label>Last Name*</Label>
                    <Input
                        type="text"
                        required value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </FormField>
                <FormField>
                    <Label>Email*</Label>
                    <Input
                        type="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
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

export default UpdateCustomerModal;
