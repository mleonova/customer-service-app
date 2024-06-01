import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  min-height: 35px;
  background-color: #0bbc20;
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: 500;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;

  @media screen and (max-width: 850px) {
    font-size: medium;
  }
`;

const Button = ({ ...props }) => {
    return (
        <StyledButton {...props} />
    )
};

export default Button;
