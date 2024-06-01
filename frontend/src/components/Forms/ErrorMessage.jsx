import React from "react";
import styled from "styled-components";

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
`;

const ErrorMessage = ({ children, ...props }) => {
    return (
        <StyledErrorMessage {...props}>{children}</StyledErrorMessage>
    )
};

export default ErrorMessage;
