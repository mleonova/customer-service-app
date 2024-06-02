import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBar from "../../../components/Tables/SearchBar";
import TableRow from "../../../components/Tables/CustomerTable/TableRow";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import CustomerModal from "../../../components/Modals/Customers/AddCustomerModal";
import UpdateCustomerModal from "../../../components/Modals/Customers/UpdateCustomerModal";

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

const CustomerTab = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const fetchCustomers = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/customer/customers");
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const filteredCustomers = customers.filter((customer) => {
        return (
            customer.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()));
    });

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleAddCustomer = async (customerData) => {
        try {
            const response = await fetch("http://localhost:5000/api/customer/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(customerData),
            });
            if (response.ok) {
                await fetchCustomers();
                handleCloseAddModal();
            } else {
                throw new Error("Failed to add customer");
            }
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    };

    const handleOpenUpdateModal = (customer) => {
        setSelectedCustomer(customer);
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
        setSelectedCustomer(null);
    };

    const handleUpdateCustomer = async (customerData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/customer/update/${customerData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(customerData),
            });
            if (response.ok) {
                await fetchCustomers();
                handleCloseUpdateModal();
            } else {
                throw new Error("Failed to update customer");
            }
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    const handleDeleteCustomer = async (customer) => {
        try {
            await fetch(`http://localhost:5000/api/customer/delete/${customer.id}`, {
                method: "DELETE",
            });
            await fetchCustomers();
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    return (
        <TabContainer>
            <TableHeader>
                <h3>Customers</h3>
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
                            customer={customer}
                            onDelete={() => handleDeleteCustomer(customer)}
                            onUpdate={() => handleOpenUpdateModal(customer)}
                        />
                    ))}
                </tbody>
            </Table>
            <CustomerModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} onAdd={handleAddCustomer} />
            {selectedCustomer && (
                <UpdateCustomerModal
                    isOpen={isUpdateModalOpen}
                    onClose={handleCloseUpdateModal}
                    onUpdate={handleUpdateCustomer}
                    customer={selectedCustomer}
                />
            )}
        </TabContainer>
    );
};

export default CustomerTab;
