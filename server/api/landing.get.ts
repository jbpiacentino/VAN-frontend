import { strapiFetch } from '../utils/strapi';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const singleType = String(config.landingSingleType || 'landing-page');
  const response = await strapiFetch(`/${singleType}`, { populate: '*' });
  return response?.data || null;
});
