const URL = "http://127.0.0.1:5000/api/customer";

export const fetchCustomers = async () => {
    try {
        const response = await fetch(`${URL}/customers`);
        if (!response.ok) {
            throw new Error("Failed to fetch customers");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching customers:", error);
        throw error;
    }
};

export const addCustomer = async (customerData) => {
    try {
        const response = await fetch(`${URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customerData),
        });
        if (!response.ok) {
            throw new Error("Failed to add customer");
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding customer:", error);
        throw error;
    }
};

export const updateCustomer = async (customerData) => {
    try {
        const response = await fetch(`${URL}/update/${customerData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customerData),
        });
        if (!response.ok) {
            throw new Error("Failed to update customer");
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating customer:", error);
        throw error;
    }
};

export const deleteCustomer = async (customerId) => {
    try {
        const response = await fetch(`${URL}/delete/${customerId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete customer");
        }
        return await response.json();
    } catch (error) {
        console.error("Error deleting customer:", error);
        throw error;
    }
};
