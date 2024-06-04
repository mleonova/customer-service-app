/*
  UpdateInteractionModal Component
 
  This component is an interface to open a modal for updating an existing interaction.
 
  Props:
  - isOpen (boolean): Determines whether the modal is open or not.
  - onClose (function): Function to be called when the modal needs to be closed.
  - onUpdate (function): Function to be called when the form is submitted. It receives the updated interaction data as an argument.
 */

import React from "react";
import InteractionModal from "./InteractionModal";

const UpdateInteractionModal = ({ isOpen, onClose, onUpdate, interaction }) => {
    return (
        <InteractionModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onUpdate}
            title="Update Interaction"
            submitText="Update"
            interaction={interaction}
        />
    );
};

export default UpdateInteractionModal;
