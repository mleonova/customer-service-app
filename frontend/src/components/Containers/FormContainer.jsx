/*
  FormContainer Component

  This component wraps form-related content in a styled container.

  Props:
  - children: The content to be wrapped within the form container.
*/

import React from "react";
import styled from "styled-components";

const StyledFormContainer = styled.div`
  background-color: #ffffff;
  max-width: 500px;
  width: 400px;
  border-radius: 20px;
  border: 0.75px solid rgba(112, 112, 112, 0.5);
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  margin: 50px auto;
  padding: 30px 10px 50px;

  @media screen and (max-width: 850px) {
    .form_container {
        margin: 30px auto;
    }

  @media screen and (max-width: 750px) {
    margin: 50px auto;
  }

  @media screen and (max-width: 500px) {
    margin: 30px auto;
    width: 90%;
    height: auto;
  }
`;

const FormContainer = ({ children }) => {
  return (
    <StyledFormContainer>
      {children}
    </StyledFormContainer>
  );
};

export default FormContainer;
