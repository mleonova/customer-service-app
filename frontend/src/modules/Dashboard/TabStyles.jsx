import styled from "styled-components";

export const Container = styled.div`
    height: 100vh;
    padding: 10px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
`;

export const TableHeader = styled.div`
    padding: 20px;
    margin: 20px 0px 0px;

    h3 {
        font-weight: 500;
    }
`;

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
`;

export const ButtonContainer = styled.div`
    width: 15%;
`;

export const Table = styled.table`
    border-collapse: collapse;
    margin: 0px 20px;

    th {
        padding: 10px 30px;
        border-bottom: 1px solid #ddd;
        text-align: left;
        background-color: #f9f9f9;
        color: #191D23;
        font-size: 1rem;
        font-weight: 500;
    }

    td {
        padding: 10px 30px;
        border-bottom: 1px solid #ddd;
        text-align: left;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

export const Span = styled.span`
    margin: 10px;    
`;