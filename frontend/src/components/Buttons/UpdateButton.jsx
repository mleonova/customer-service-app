/*
  UpdateButton Component
  
  This component represents a button styled for use as an update button.
  
  Props:
  - children: The content of the button.
  - props object: Additional attributes to be passed to the button element.
 */

import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    background-color: transparent;
    border: #0A2463 1px solid;
    border-radius: 25px;
    padding: 5px 20px;
    cursor: pointer;
    color: #0A2463;
    font-size: 1rem;

    &:hover {
        background-color: #0A2463;
        color: white;
    }   
`;

const UpdateButton = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
};

export default UpdateButton;
