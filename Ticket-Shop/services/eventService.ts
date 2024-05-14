
import { $fetch } from 'ohmyfetch';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;;

export const fetchEvents = async () => {
  try {
    const token = import.meta.env.VITE_AUTH_TOKEN;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await $fetch(`${API_BASE_URL}/events`, options);
  } catch (error) {
    console.error('Failed to load events:', error);
    throw error; 
  }
};

export const fetchEventById = async (eventId: string) => {
  try {
    const token = import.meta.env.VITE_AUTH_TOKEN;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await $fetch(`${API_BASE_URL}/events/${eventId}`, options);
  } catch (error) {
    console.error('Failed to load event details:', error);
    throw error;
  }
  
};

export const fetchEventImage = async (eventId: string) => {
    const token = import.meta.env.VITE_AUTH_TOKEN;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        `${API_BASE_URL}/events/${eventId}/image`, options
      );
      if (!response.ok) {
        throw new Error('Image not found');
      }
      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error('Empty image blob');
      }
      return URL.createObjectURL(blob);

    } catch (error) {
      console.error('Failed to load event image:', error);
      throw error;
    }
  };
export const fetchTicketTypesByEventId = async (eventId: string) => {
    try {
        const token = import.meta.env.VITE_AUTH_TOKEN;
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      return await $fetch(`${API_BASE_URL}/ticket-types?eventId=${eventId}`, options);
    } catch (error) {
      console.error('Failed to load ticket types:', error);
      throw error;
    }
  };
