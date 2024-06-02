import React from "react";
import styled from "styled-components";
import UpdateButton from "../../Buttons/UpdateButton";
import DeleteButton from "../../Buttons/DeleteButton";

const TableRowContainer = styled.tr`
    font-size: 1rem;

    td {
        padding: 10px 30px;
        border-bottom: 1px solid #ddd;
        text-align: left;
        font-size: 0.9rem;
        color: #191D23;
    }
`;

const TableRow = ({ customer, onDelete, onUpdate }) => {
    const handleDelete = () => {
        onDelete(customer.id);
    };

    const handleUpdate = () => {
        onUpdate(customer);
    };

    return (
        <TableRowContainer>
            <td>{customer.first_name}</td>
            <td>{customer.last_name}</td>
            <td>{customer.email}</td>
            <td><UpdateButton onClick={handleUpdate}>Update</UpdateButton></td>
            <td><DeleteButton onClick={handleDelete}>Delete</DeleteButton></td>
        </TableRowContainer>
    );
};

export default TableRow;
