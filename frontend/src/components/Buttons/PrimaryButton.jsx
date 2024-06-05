/*
  PrimaryButton Component
  
  This component represents a primary button styled for use as the primary action button.
  
  Props:
  - children: The content of the button.
  - props object: Additional attributes to be passed to the button element.
 */

import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #0bbc20;
  width: 100%;
  min-height: 35px;
  border-radius: 25px;
  color: white;
  font-weight: 500;
  padding: 10px;
  cursor: pointer;

  @media screen and (max-width: 850px) {
    font-size: medium;
  }
`;

const PrimaryButton = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
};

export default PrimaryButton;
