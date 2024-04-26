// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    "@unlok-co/nuxt-stripe"
  ],
  stripe: {
    // Serverseitige Konfiguration
    server: {
      key: process.env.STRIPE_SECRET_KEY, // Verwenden des privaten Schlüssels auf dem Server
      options: {},
    },
    // Clientseitige Konfiguration
    client: {
      key: process.env.STRIPE_KEY, // Verwenden des öffentlichen Schlüssels auf dem Client
      options: {},
    },
  },
  runtimeConfig: {
    public: {
      STRIPE_KEY: process.env.STRIPE_KEY, // Der öffentliche Schlüssel (Publishable Key)
    },
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY, // Der private Schlüssel (Secret Key)
    ENDPOINT_SECRET: process.env.ENDPOINT_SECRET, // Stripe Webhook Secret, falls verwendet
  },
})
