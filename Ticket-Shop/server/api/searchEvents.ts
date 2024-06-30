import { defineEventHandler, getQuery } from 'h3';
import { $fetch } from 'ohmyfetch';

export default defineEventHandler(async (event) => {
  const { name } = getQuery(event);
  const config = useRuntimeConfig();
  const apibaseUrl = config.public.apiBaseUrl;

  if (!name) {
    throw new Error('Der Name-Parameter fehlt.');
  }

  try {
    const response = await $fetch(`${apibaseUrl}/events/public/search?name=${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + process.env.VITE_AUTH_TOKEN,
      },
    });
    return response;
  } catch (error) {
    console.error('API call failed:', error);
    throw new Error('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
  }
});