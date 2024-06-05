/*
  DeleteButton Component
  
  This component represents a button styled for delete actions.

  Props:
  - children: The content of the button.
  - props object: Additional attributes to be passed to the button element.
 */

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
