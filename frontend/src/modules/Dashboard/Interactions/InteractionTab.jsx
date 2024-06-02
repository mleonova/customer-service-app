import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../../../components/Tables/SearchBar";
import TableRow from "../../../components/Tables/InteractionsTable/TableRow";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import InteractionModal from "../../../components/Modals/Interactions/AddInteractionModal";
import UpdateInteractionModal from "../../../components/Modals/Interactions/UpdateInteractionModal";

const TabContainer = styled.div`
    height: 100vh;
    padding: 10px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
`;

const TableHeader = styled.div`
    padding: 20px;
    margin: 20px 0px 0px;

    h3 {
        font-weight: 500;
    }
`;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
`;

const ButtonContainer = styled.div`
    width: 15%;
`;

const Table = styled.table`
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
`;

const Span = styled.span`
    margin: 10px;    
`;

const InteractionTab = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [interactions, setInteractions] = useState([]);
    const [selectedInteraction, setSelectedInteraction] = useState(null);

    const fetchInteractions = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/interaction/interactions");
            const data = await response.json();
            setInteractions(data);
        } catch (error) {
            console.error("Error fetching interactions:", error);
        }
    };

    useEffect(() => {
        fetchInteractions();
    }, []);

    const filteredInteractions = interactions.filter((interaction) => {
        return (
            interaction.agent_id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            interaction.customer_id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            interaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            interaction.content.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleAddInteraction = async (interactionData) => {
        try {
            const response = await fetch("http://localhost:5000/api/interaction/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(interactionData),
            });
            if (response.ok) {
                await fetchInteractions();
                handleCloseAddModal();
            } else {
                throw new Error("Failed to add interaction");
            }
        } catch (error) {
            console.error("Error adding interaction:", error);
        }
    };

    const handleOpenUpdateModal = (interaction) => {
        setSelectedInteraction(interaction);
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedInteraction(null);
    };

    const handleUpdateInteraction = async (interactionData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/interaction/update/${interactionData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(interactionData),
            });
            if (response.ok) {
                await fetchInteractions();
                handleCloseUpdateModal();
            } else {
                throw new Error("Failed to update interaction");
            }
        } catch (error) {
            console.error("Error updating interaction:", error);
        }
    };

    const handleDeleteInteraction = async (interaction) => {
        try {
            await fetch(`http://localhost:5000/api/interaction/delete/${interaction.id}`, {
                method: "DELETE",
            });
            await fetchInteractions();
        } catch (error) {
            console.error("Error deleting interaction:", error);
        }
    };

    return (
        <TabContainer>
            <TableHeader>
                <h3>Interactions</h3>
                <SearchContainer>
                    <SearchBar setSearchQuery={setSearchQuery} />
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
                            interaction={interaction}
                            onDelete={() => handleDeleteInteraction(interaction)}
                            onUpdate={() => handleOpenUpdateModal(interaction)}
                        />
                    ))}
                </tbody>
            </Table>
            <InteractionModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} onAdd={handleAddInteraction} />
            {selectedInteraction && (
                <UpdateInteractionModal
                    isOpen={isUpdateModalOpen}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleUpdateInteraction}
                    interaction={selectedInteraction}
                />
            )}
        </TabContainer>
    );
};

export default InteractionTab;
