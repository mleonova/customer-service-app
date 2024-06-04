import styled from "styled-components";

export const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    width: 30%;
    background-color: white;
    padding: 30px;
    margin: 20px 30px;
    border-radius: 5px;
    position: relative;
`;

export const CloseButton = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 30px;
`;

export const Title = styled.h3`
    font-weight: 500;
    margin: 20px;
`;

export const Span = styled.span`
    padding: 10px 50px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 10px 20px;
`;
