/*
  UpdateCustomerModal Component
 
  This component is an interface to open a modal for updating an existing customer.
 
  Props:
  - isOpen (boolean): Determines whether the modal is open or not.
  - onClose (function): Function to be called when the modal needs to be closed.
  - onUpdate (function): Function to be called when the form is submitted. It receives the updated customer data as an argument.
 */

import React from "react";
import CustomerModal from "./CustomerModal";

const UpdateCustomerModal = ({ isOpen, onClose, onUpdate, customer }) => {
    return (
        <CustomerModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onUpdate}
            title="Update Customer"
            submitText="Update"
            customer={customer}
        />
    );
};

export default UpdateCustomerModal;