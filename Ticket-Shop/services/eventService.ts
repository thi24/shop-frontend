import { $fetch } from "ohmyfetch";
import noImage from "~/assets/image/no_image.png";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const imageCache = new Map<string, string>();

function handleError(error: any) {
  console.error("API call failed:", error);
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
  if (imageCache.has(eventId)) {
    return imageCache.get(eventId);
  }

  try {
    const response = await $fetch(`${API_BASE_URL}/events/public/${eventId}/image`, {
      responseType: 'blob'
    });
    if (!response || response.size === 0) {
      throw new Error("Image not found or empty image blob");
    }
    const imageUrl = URL.createObjectURL(response);
    imageCache.set(eventId, imageUrl);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    imageCache.set(eventId, noImage);
    return noImage;
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
    const response = await $fetch(`/api/searchEvents?name=${name}`)
    return response;
  } catch (error) {
    handleError(error);
  }
};