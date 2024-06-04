/*
  AddInteractionModal Component
 
  This component is an interface to open a modal for adding a new interaction.
 
  Props:
  - isOpen (boolean): Determines whether the modal is open or not.
  - onClose (function): Function to be called when the modal needs to be closed.
  - onAdd (function): Function to be called when the form is submitted. It receives the new interaction data as an argument.
 */

import React from "react";
import InteractionModal from "./InteractionModal";

const AddInteractionModal = ({ isOpen, onClose, onAdd }) => {
    return (
        <InteractionModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onAdd}
            title="Add New Interaction"
            submitText="Add"
            interaction={{}}
        />
    );
};

export default AddInteractionModal;
