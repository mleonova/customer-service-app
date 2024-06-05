/*
  ErrorMessage Component

  This component renders an error message with customizable content.

  Props:
  - children: Content of the error message.
*/

import React from "react";
import styled from "styled-components";

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  padding-bottom: 10px;
  text-align: center;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = ({ children }) => {
  return (
    <MessageContainer>
      <StyledErrorMessage>
        {children}
      </StyledErrorMessage>
    </MessageContainer>
  );
};

export default ErrorMessage;
