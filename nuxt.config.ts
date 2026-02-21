import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2026-02-21',
  modules: [],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    strapiToken:
      process.env.VITE_STRAPI_API_TOKEN ||
      process.env.STRAPI_API_TOKEN ||
      process.env.VITE_STRAPI_FULL_ACCESS_TOKEN ||
      '',
    strapiApiPrefix: process.env.VITE_STRAPI_API_PREFIX || '/api',
    landingSingleType: process.env.VITE_STRAPI_LANDING_SINGLE_TYPE || 'landing-page',
    public: {
      strapiBaseUrl:
        process.env.NUXT_PUBLIC_STRAPI_BASE_URL || process.env.VITE_STRAPI_BASE_URL || '',
    },
  },
  routeRules: {
    '/': { swr: 300 },
    '/program': { prerender: true },
    '/solutions': { swr: 600 },
    '/van-finder': { swr: 120 },
    '/vendors/**': { swr: 300 },
  },
  app: {
    head: {
      title: 'Vates Alliance Network',
      meta: [
        {
          name: 'description',
          content: 'Vates Alliance Network: members, solutions, guides, briefs, and knowledge resources.',
        },
      ],
    },
  },
});
