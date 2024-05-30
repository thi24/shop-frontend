// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@unlok-co/nuxt-stripe",
  ],

  runtimeConfig: {
    public: {
      apiPaymentIntent: process.env.API_PAYMENT_INTENT,
      //returnUrl: process.env.SUCCESS_URL,
      returnUrl: process.env.INDEX_URL,
      processEngineStart: process.env.PROCESS_ENGINE_START,
      processToken: process.env.PROCESS_TOKEN,
    },
  },
});
