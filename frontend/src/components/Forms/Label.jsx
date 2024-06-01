import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  text-align: left;

  @media screen and (max-width: 850px) {
    font-size: 0.9rem;
  }
`;

const Label = ({ ...props }) => {
    return (
        <StyledLabel {...props} />
    )
};

export default Label;
