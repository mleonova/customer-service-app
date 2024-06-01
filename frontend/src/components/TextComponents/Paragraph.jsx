import React from "react";
import styled from "styled-components";

const StyledParagraph = styled.p`
    font-size: 1rem;
    margin: auto;

    @media screen and (max-width: 850px) {
        font-size: 0.9rem;
    }
`;

const Paragraph = ({ children }) => {
    return <StyledParagraph>{children}</StyledParagraph>;
};

export default Paragraph;