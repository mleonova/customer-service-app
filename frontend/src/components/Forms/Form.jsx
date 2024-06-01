import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
`;

const Form = ({ children, ...props }) => {
  return (
    <StyledForm {...props}>{children}</StyledForm>
  )
}

export default Form;