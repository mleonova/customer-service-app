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
    width: 60%;
    background-color: white;
    padding: 30px;
    margin: 20px;
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

export const Select = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    color: #333;
    background-color: white;
`;

export const Span = styled.span`
    padding: 10px 50px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 10px 10px;
`;

export const ContentTextarea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 10px;
    resize: vertical;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.2s;
`;