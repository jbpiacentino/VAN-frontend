import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_STRAPI_BASE_URL;
const apiPrefix = import.meta.env.VITE_STRAPI_API_PREFIX ?? '/api';
const apiToken = import.meta.env.VITE_STRAPI_API_TOKEN;

if (!apiBaseUrl) {
  // Keep booting for static pages, but dynamic pages will fail with a clear error.
  console.warn('VITE_STRAPI_BASE_URL is not configured.');
}

const strapiClient = axios.create({
  baseURL: `${apiBaseUrl || ''}${apiPrefix}`,
  headers: {
    ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {})
  }
});

export async function fetchCollection(collection, params = {}) {
  const response = await strapiClient.get(`/${collection}`, {
    params: {
      populate: '*',
      ...params
    }
  });

  // Strapi v5 shape: { data: [...] }
  return response.data?.data || response.data || [];
}

export async function fetchSingleBySlug(collection, slug) {
  const response = await strapiClient.get(`/${collection}`, {
    params: {
      populate: '*',
      filters: {
        slug: {
          $eq: slug
        }
      }
    }
  });

  const entries = response.data?.data || response.data || [];
  return entries[0] || null;
}

export async function fetchSingleType(singleType, params = {}) {
  const response = await strapiClient.get(`/${singleType}`, {
    params: {
      populate: '*',
      ...params
    }
  });

  return response.data?.data || response.data || null;
}
