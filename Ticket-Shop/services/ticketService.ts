import { Ticket } from "~/classes/Ticket";

export const fetchTickets = async (refundId: string): Promise<Ticket[]> => {
  try {
    const response = await fetch(`/api/getRefundTickets?refundId=${refundId}`, {
      method: "GET",
    });
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
  try {
    const response = await fetch(`/api/startRefund?refundId=${refundId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedTickets),
    });
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