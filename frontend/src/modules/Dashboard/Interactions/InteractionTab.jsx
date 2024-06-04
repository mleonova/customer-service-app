/*
  InteractionTab Component
  
  This component renders a table with interactions. 
  It includes features for searching, adding, updating, and deleting interactions. 
  This component uses various other components such as SearchBar, TableRow, PrimaryButton, AddInteractionModal, and UpdateInteractionModal.

  States:
  - searchQuery: Holds the current search query.
  - isAddModalOpen: Boolean to control if the modal to add interaction is open.
  - isUpdateModalOpen: Boolean to control if the modal to update interaction is open.
  - interactions: Array to store the list of interactions.
  - selectedInteraction: Object to store the currently selected interaction for updating.

  Effects: 
  - The first useEffect loads interactions when the component mounts.

  Methods:
  - loadInteractions: Fetches interactions from the server and updates the state.
  - handleOpenAddModal: Opens the add interaction modal.
  - handleCloseAddModal: Closes the add interaction modal.
  - handleOpenUpdateModal: Opens the update interaction modal and sets the selected interaction.
  - handleCloseUpdateModal: Closes the update interaction modal and clears the selected interaction.
  - handleAddInteraction: Adds a new interaction and reloads the interactions list.
  - handleUpdateInteraction: Updates an interaction and reloads the interactions list.
  - handleDeleteInteraction: Deletes an interaction and reloads the interactions list.
  
  Filtering:
  - filteredInteractions: Filters the interactions based on the search query.
*/


import React, { useState, useEffect } from "react";
import SearchBar from "../../../components/Tables/SearchBar";
import TableRow from "../../../components/Tables/TableRow";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import InteractionModal from "../../../components/Modals/Interactions/AddInteractionModal";
import UpdateInteractionModal from "../../../components/Modals/Interactions/UpdateInteractionModal";
import { Container, TableHeader, SearchContainer, ButtonContainer, Table, Span } from "../TabStyles";
import { fetchInteractions, addInteraction, updateInteraction, deleteInteraction } from "../Interactions/InteractionActions";

const InteractionTab = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [interactions, setInteractions] = useState([]);
    const [selectedInteraction, setSelectedInteraction] = useState(null);

    useEffect(() => {
        loadInteractions();
    }, []);

    const loadInteractions = async () => {
        try {
            const data = await fetchInteractions();
            setInteractions(data);
        } catch (error) {
            console.error("Error loading interactions:", error);
        }
    };

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleOpenUpdateModal = (interaction) => {
        setSelectedInteraction(interaction);
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedInteraction(null);
    };

    const handleAddInteraction = async (interactionData) => {
        try {
            await addInteraction(interactionData);
            await loadInteractions();
            handleCloseAddModal();
        } catch (error) {
            console.error("Error adding interaction:", error);
        }
    };

    const handleUpdateInteraction = async (interactionData) => {
        try {
            await updateInteraction(interactionData);
            await loadInteractions();
            handleCloseUpdateModal();
        } catch (error) {
            console.error("Error updating interaction:", error);
        }
    };

    const handleDeleteInteraction = async (interaction) => {
        try {
            await deleteInteraction(interaction.id);
            await loadInteractions();
        } catch (error) {
            console.error("Error deleting interaction:", error);
        }
    };

    const filteredInteractions = interactions.filter((interaction) => {
        return (
            interaction.agent_id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            interaction.customer_id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            interaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            interaction.content.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    return (
        <Container>
            <TableHeader>
                <h3>Interactions</h3>
                <SearchContainer>
                    <SearchBar
                        setSearchQuery={setSearchQuery}
                        placeholder="Search by agent id, customer id, date, type, keywords"
                    />
                    <ButtonContainer>
                        <PrimaryButton onClick={handleOpenAddModal}>
                            <Span>+ Create</Span>
                        </PrimaryButton>
                    </ButtonContainer>
                </SearchContainer>
            </TableHeader>
            <Table>
                <thead>
                    <tr>
                        <th>Agent ID</th>
                        <th>Customer ID</th>
                        <th>Created At</th>
                        <th>Type</th>
                        <th>Content</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInteractions.map((interaction, index) => (
                        <TableRow
                            key={index}
                            data={interaction}
                            type="interaction"
                            onDelete={() => handleDeleteInteraction(interaction)}
                            onUpdate={() => handleOpenUpdateModal(interaction)}
                        />
                    ))}
                </tbody>
            </Table>
            <InteractionModal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                onAdd={handleAddInteraction}
            />
            {selectedInteraction && (
                <UpdateInteractionModal
                    isOpen={isUpdateModalOpen}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleUpdateInteraction}
                    interaction={selectedInteraction}
                />
            )}
        </Container>
    );
};

export default InteractionTab;
