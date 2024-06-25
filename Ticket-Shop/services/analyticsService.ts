const getConfig = () => {
    const config = useRuntimeConfig();
    return {
      baseUrl: config.public.baseUrl,
    };
  };
export async function trackEventView(eventId: string) {
    const { baseUrl } = getConfig();
  try {
    await fetch(
      `${baseUrl}/api/analytics-service/events/${eventId}/event-views`,
      {
        method: "PATCH",
      }
    );
  } catch (error) {
    console.error("Failed to track event view:", error);
  }
}