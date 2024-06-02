import React from "react";
import styled from "styled-components"

const Container = styled.div`
    height: 100vh;
    padding: 10px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
`;

const TabContainer = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    );
};

export default TabContainer;