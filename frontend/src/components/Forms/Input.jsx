import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  max-height: 65px;
  min-height: 45px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 2px 0px;
  padding: 0px 10px;
  font-size: 1rem;
  font-weight: 400;

  @media screen and (max-width: 850px) {
    font-size: 0.9rem;
  }
`;

const Input = ({ ...props }) => {
    return (
        <StyledInput {...props} />
    )
}

export default Input;
