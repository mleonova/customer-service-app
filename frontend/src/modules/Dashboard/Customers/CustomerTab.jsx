/*
  CustomerTab Component
  
  This component renders a table with customers. 
  It includes features for searching, adding, updating, and deleting customers. 
  This component uses various other components such as SearchBar, TableRow, PrimaryButton, AddCustomerModal, and UpdateCustomerModal.

  States:
  - searchQuery: Holds the current search query.
  - isAddModalOpen: Boolean to control if the modal to add customer is open.
  - isUpdateModalOpen: Boolean to control if the modal to update customer is open.
  - customers: Array to store the list of customers.
  - selectedCustomer: Object to store the currently selected customer for updating.

  Effects: 
  - The first useEffect loads customers when the component mounts.

  Methods:
  - loadCustomers: Fetches customers from the server and updates the state.
  - handleOpenAddModal: Opens the add customer modal.
  - handleCloseAddModal: Closes the add customer modal.
  - handleOpenUpdateModal: Opens the update customer modal and sets the selected customer.
  - handleCloseUpdateModal: Closes the update customer modal and clears the selected customer.
  - handleAddCustomer: Adds a new customer and reloads the customers list.
  - handleUpdateCustomer: Updates a customer and reloads the customers list.
  - handleDeleteCustomer: Deletes a customer and reloads the customers list.
  
  Filtering:
  - filteredCustomers: Filters the customers based on the search query.
*/

import React, { useState, useEffect } from "react";
import SearchBar from "../../../components/Tables/SearchBar";
import TableRow from "../../../components/Tables/TableRow";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import CustomerModal from "../../../components/Modals/Customers/AddCustomerModal";
import UpdateCustomerModal from "../../../components/Modals/Customers/UpdateCustomerModal";
import { fetchCustomers, addCustomer, updateCustomer, deleteCustomer } from "../Customers/CustomerActions";
import { Container, TableHeader, SearchContainer, ButtonContainer, Table, Span } from "../TabStyles";

const CustomerTab = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const data = await fetchCustomers();
            setCustomers(data);
        } catch (error) {
            console.error("Error loading customers:", error);
        }
    };

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleOpenUpdateModal = (customer) => {
        setSelectedCustomer(customer);
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedCustomer(null);
    };

    const handleAddCustomer = async (customerData) => {
        try {
            await addCustomer(customerData);
            await loadCustomers();
            handleCloseAddModal();
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    };

    const handleUpdateCustomer = async (customerData) => {
        try {
            await updateCustomer(customerData);
            await loadCustomers();
            handleCloseUpdateModal();
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    const handleDeleteCustomer = async (customer) => {
        try {
            await deleteCustomer(customer.id);
            await loadCustomers();
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    const filteredCustomers = customers.filter((customer) => {
        return (
            customer.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });


    return (
        <Container>
            <TableHeader>
                <h3>Customers</h3>
                <SearchContainer>
                    <SearchBar
                        setSearchQuery={setSearchQuery}
                        placeholder="Search by fist name, last name, email"
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
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer, index) => (
                        <TableRow
                            key={index}
                            data={customer}
                            type="customer"
                            onDelete={() => handleDeleteCustomer(customer)}
                            onUpdate={() => handleOpenUpdateModal(customer)}
                        />

                    ))}
                </tbody>
            </Table>
            <CustomerModal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                onAdd={handleAddCustomer}
            />
            {selectedCustomer && (
                <UpdateCustomerModal
                    isOpen={isUpdateModalOpen}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleUpdateCustomer}
                    customer={selectedCustomer}
                />
            )}
        </Container>
    );
};

export default CustomerTab;
