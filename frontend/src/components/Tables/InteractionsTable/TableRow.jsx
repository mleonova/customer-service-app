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

const TableRow = ({ interaction, onDelete, onUpdate }) => {
    const handleDelete = () => {
        onDelete(interaction.id);
    };

    const handleUpdate = () => {
        onUpdate(interaction);
    };

    return (
        <TableRowContainer>
            <td>{interaction.agent_id}</td>
            <td>{interaction.customer_id}</td>
            <td>{interaction.created_at}</td>
            <td>{interaction.type}</td>
            <td>{interaction.content}</td>
            <td><UpdateButton onClick={handleUpdate}>View</UpdateButton></td>
            <td><DeleteButton onClick={handleDelete}>Delete</DeleteButton></td>
        </TableRowContainer>
    );
};

export default TableRow;
