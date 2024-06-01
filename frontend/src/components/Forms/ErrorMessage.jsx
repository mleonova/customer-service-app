import React from "react";
import styled from "styled-components";

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin: auto;
  padding-bottom: 20px;
`;

const ErrorMessage = ({ children, ...props }) => {
  return (
    <StyledErrorMessage {...props}>{children}</StyledErrorMessage>
  )
};

export default ErrorMessage;
