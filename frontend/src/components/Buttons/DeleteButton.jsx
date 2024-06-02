import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    background-color: transparent;
    color: #dc3545;
    font-size: 1rem;
    cursor: pointer;
`;

const DeleteButton = ({ children, ...props }) => {
    return (
        <StyledButton {...props}>
            {children}
        </StyledButton>
    );
};

export default DeleteButton;
