import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const { productName, productPrice } = await readBody(event);

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-04-10',
  });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999,
      currency: 'usd',
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create payment intent',
    });
  }
});