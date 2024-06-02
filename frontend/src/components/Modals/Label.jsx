import React from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
    font-size: 0.9rem;
    display: block;
    margin-bottom: 5px;
`;

const Label = ({ ...props }) => {
    return (
        <StyledLabel {...props} />
    );
};

export default Label;
