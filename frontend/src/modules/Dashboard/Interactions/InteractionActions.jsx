const URL = "http://127.0.0.1:5000/api/interaction";

export const fetchInteractions = async () => {
    try {
        const response = await fetch(`${URL}/interactions`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching interactions:", error);
        throw error;
    }
}

export const addInteraction = async (interactionData) => {
    try {
        const response = await fetch(`${URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(interactionData),
        });
        if (!response.ok) {
            throw new Error("Failed to add interaction");
        }
    } catch (error) {
        console.error("Error adding interaction:", error);
        throw error;
    }
}

export const updateInteraction = async (interactionData) => {
    try {
        const response = await fetch(`${URL}/update/${interactionData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(interactionData),
        });
        if (!response.ok) {
            throw new Error("Failed to update interaction");
        }
    } catch (error) {
        console.error("Error updating interaction:", error);
        throw error;
    }
}


export const deleteInteraction = async (interactionId) => {
    try {
        const response = await fetch(`${URL}/delete/${interactionId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete interaction");
        }
    } catch (error) {
        console.error("Error deleting interaction:", error);
        throw error;
    }
}
