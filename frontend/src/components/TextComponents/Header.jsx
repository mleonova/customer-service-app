import React from "react";
import styled from "styled-components";

const StyledHeader = styled.h1`
    font-weight: 500;
    font-style: normal;
    padding: 100px 50px 20px;
    font-size: 2rem;

    @media screen and (max-width: 850px) {
        font-size: 1.8rem;
        padding: 80px 20px 20px;
    }
`;

const Header = ({ children }) => {
    return <StyledHeader>{children}</StyledHeader>;
};

export default Header;