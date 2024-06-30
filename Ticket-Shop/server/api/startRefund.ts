import { defineEventHandler, getQuery, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { refundId } = getQuery(event);
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseUrl;
  const token = config.public.authToken;

  if (!refundId) {
    return { success: false, message: "Refund ID is missing." };
  }

  const selectedTickets = await readBody<string[]>(event);

  try {
    const response = await fetch(
      `${baseUrl}/api/ticket-service/cancellations/${refundId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
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
});