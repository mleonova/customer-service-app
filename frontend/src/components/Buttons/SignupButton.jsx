/*
  SignupButton Component
  
  This component represents a button styled for use as a signup button. 

  Props:
  - children: The content of the button.
  - props object: Additional attributes to be passed to the button element.
 */

import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const StyledButton = styled.button`
    background-color: #0A2463;
    border-radius: 25px;
    padding: 8px 30px;
    cursor: pointer;
    color: white;
    font-size: 1rem;
`;

const SignupButton = ({ children, ...props }) => {
    return (
        <Link to="/signup">
            <StyledButton {...props}>
                {children}
            </StyledButton>
        </Link>
    );
};

export default SignupButton;
