import styled from "styled-components";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10px;
`;

export const StyledInput = styled.input`
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


export const StyledLabel = styled.label`
  text-align: left;

  @media screen and (max-width: 850px) {
    font-size: 0.9rem;
  }
`;
