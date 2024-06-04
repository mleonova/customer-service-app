/*
  AddCustomerModal Component
 
  This component is an interface to open a modal for adding a new customer.
 
  Props:
  - isOpen (boolean): Determines whether the modal is open or not.
  - onClose (function): Function to be called when the modal needs to be closed.
  - onAdd (function): Function to be called when the form is submitted. It receives the new customer data as an argument.
 */

import React from "react";
import CustomerModal from "./CustomerModal";

const AddCustomerModal = ({ isOpen, onClose, onAdd }) => {
    return (
        <CustomerModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onAdd}
            title="Add New Customer"
            submitText="Add"
            customer={{}}
        />
    );
};

export default AddCustomerModal;
