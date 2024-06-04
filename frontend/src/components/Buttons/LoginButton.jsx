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

const LoginButton = ({ children, ...props }) => {
    return (
        <Link to="/login">
            <StyledButton {...props}>
                {children}
            </StyledButton>
        </Link>
    );
};

export default LoginButton;
