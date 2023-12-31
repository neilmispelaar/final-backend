// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // ...
  modules: [
    'nuxt-mongoose',
  ],
  mongoose: {
    options: {},
    modelsDir: 'models',
    devtools: true,
  },
  nitro: {
    noExternals: false,
  },
})
