import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2026-02-21',
  modules: [],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    protectedAccess: process.env.PROTECTED_ACCESS || '',
    protectedAccessPwd: process.env.PROTECTED_ACCESS_PWD || '',
    strapiToken:
      process.env.VITE_STRAPI_API_TOKEN ||
      process.env.STRAPI_API_TOKEN ||
      process.env.VITE_STRAPI_FULL_ACCESS_TOKEN ||
      '',
    strapiApiPrefix: process.env.VITE_STRAPI_API_PREFIX || '/api',
    landingSingleType: process.env.VITE_STRAPI_LANDING_SINGLE_TYPE || 'landing-page',
    gristBaseUrl: process.env.GRIST_BASE_URL || 'https://docs.getgrist.com',
    gristApiKey: process.env.GRIST_API_KEY || '',
    gristDocId: process.env.GRIST_DOC_ID || '',
    gristTableId: process.env.GRIST_TABLE_ID || '',
    public: {
      strapiBaseUrl:
        process.env.NUXT_PUBLIC_STRAPI_BASE_URL || process.env.VITE_STRAPI_BASE_URL || '',
    },
  },
  routeRules: {},
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'Vates Alliance Network',
      meta: [
        {
          name: 'description',
          content:
            'Vates Alliance Network: members, solutions, guides, briefs, and knowledge resources.',
        },
      ],
    },
  },
});
