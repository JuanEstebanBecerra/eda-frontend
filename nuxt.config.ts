// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      productsApi: process.env.PRODUCTS_API,
      salesApi: process.env.SALES_API,
    }
  },

  modules: ['@nuxt/ui']
})