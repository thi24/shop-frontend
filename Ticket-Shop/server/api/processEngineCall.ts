import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  try {
    const response = await fetch(config.public.processEngineStart, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        Authorization: "Bearer " +  config.public.processToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to call process engine');
    }

    return { success: true };
  } catch (error) {
    const typedError = error as Error;
    console.error('Error:', typedError);
    return { success: false, error: typedError.message };
  }
});