import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const FlexColumnContainer = ({ children }) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default FlexColumnContainer;
