/*
  Interaction API Module
 
  This module provides functions to interact with the interaction API.
 
  Constants:
  - URL: The base URL for the interaction API.
 
  Functions:
  - fetchInteractions: Fetches a list of interactions from the API.
  - addInteraction: Adds a new interaction to the API.
  - updateInteraction: Updates an existing interaction in the API.
  - deleteInteraction: Deletes an interaction from the API.
 */

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
        const responseText = await response.text();
        if (responseText) {
            return JSON.parse(responseText);
        }
        return {};
    } catch (error) {
        console.error("Error deleting interaction:", error);
        throw error;
    }
}
