import { Ticket } from "~/classes/Ticket";
const getConfig = () => {
    const config = useRuntimeConfig();
    return {
      baseUrl: config.public.baseUrl,
    };
  };
export const fetchTickets = async (refundId: string): Promise<Ticket[]> => {
    const { baseUrl} = getConfig();
  try {
    const response = await fetch(
      `${baseUrl}/api/ticket-service/tickets/public/${refundId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + import.meta.env.VITE_AUTH_TOKEN,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Fehler beim Laden der Tickets.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw new Error("Fehler beim Laden der Tickets.");
  }
};

export const processRefund = async (refundId: string, selectedTickets: string[]): Promise<{ success: boolean, message?: string }> => {
    const { baseUrl} = getConfig();
    try {
      const response = await fetch(
        `${baseUrl}/api/ticket-service/cancellations/${refundId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + import.meta.env.VITE_AUTH_TOKEN,
          },
          body: JSON.stringify(selectedTickets),
        }
      );
      if (response.ok) {
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Fehler bei der Rückerstattung." };
      }
    } catch (error) {
      console.error("Error processing refund:", error);
      return { success: false, message: "Fehler bei der Rückerstattung." };
    }
  };