import { $fetch } from "ohmyfetch";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


function handleError(error: any) {
  console.error("API call failed:", error);
  // 
  throw new Error("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
}

export const fetchEvents = async () => {
  try {
    const response = await $fetch(`${API_BASE_URL}/events/public`);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const fetchEventById = async (eventId: string) => {
  try {
    const response = await $fetch(`${API_BASE_URL}/events/public/${eventId}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const fetchEventImage = async (eventId: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events/public/${eventId}/image`);
    if (!response.ok) {
      throw new Error("Image not found");
    }
    const blob = await response.blob();
    if (blob.size === 0) {
      throw new Error("Empty image blob");
    }
    return URL.createObjectURL(blob);
  } catch (error) {
    handleError(error);
  }
};

export const fetchTicketTypesByEventId = async (eventId: string) => {
  try {
    const response = await $fetch(`${API_BASE_URL}/ticket-types/public/valid/${eventId}`);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const fetchEventsByEventName = async (name: string) => {
  try {
    const response = await $fetch(
      `${API_BASE_URL}/events/public/search?name=${name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + import.meta.env.VITE_AUTH_TOKEN,
        },
      }
    );
    return response;
  } catch (error) {
    handleError(error);
  }
};
