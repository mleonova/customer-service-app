import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    padding: 8px;
`;

const Input = ({ ...props }) => {
    return (
        <StyledInput {...props} />
    );
}

export default Input;
