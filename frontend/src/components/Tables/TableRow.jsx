/*
  TableRow Component
 
  This component renders a table row with data either from a customer or an interaction.
  It includes update and delete buttons with corresponding handlers.
 
  Props:
  - data: Object containing either customer or interaction data.
  - type: String representing the type of data ("customer" or "interaction").
  - onDelete: Function to be called when the delete button is clicked, receiving the data ID.
  - onUpdate: Function to be called when the update button is clicked, receiving the data object.
 
  Methods:
  - handleDelete: Calls onDelete with the data ID.
  - handleUpdate: Calls onUpdate with the data object.
 */

import React from "react";
import UpdateButton from "../Buttons/UpdateButton";
import DeleteButton from "../Buttons/DeleteButton";
import { TableRowContainer } from "../Tables/TableStyles";

const TableRow = ({ data, type, onDelete, onUpdate }) => {
    const handleDelete = () => {
        onDelete(data.id);
    };

    const handleUpdate = () => {
        onUpdate(data);
    };

    return (
        <TableRowContainer>
            {type === "customer" ? (
                <>
                    <td>{data.first_name}</td>
                    <td>{data.last_name}</td>
                    <td>{data.email}</td>
                </>
            ) : type === "interaction" ? (
                <>
                    <td>{data.agent_id}</td>
                    <td>{data.customer_id}</td>
                    <td>{data.created_at}</td>
                    <td>{data.type}</td>
                    <td>{data.content}</td>
                </>
            ) : null}
            <td>
                <UpdateButton onClick={handleUpdate}>
                    {type === "customer" ? "Update" : "View"}
                </UpdateButton>
            </td>
            <td>
                <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            </td>
        </TableRowContainer>
    );
};

export default TableRow;
