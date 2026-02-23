import { strapiFetch } from '../utils/strapi';
import { pickStaticPageContent, pickStaticPageTitle, withAttributes } from '../utils/strapi-richtext';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const slug = String(config.landingSingleType || 'landing-page').trim();

  const response = await strapiFetch('/static-pages', {
    populate: '*',
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': 1,
  });

  const raw = withAttributes(Array.isArray(response?.data) ? response.data[0] : null);
  if (!raw || Object.keys(raw).length === 0) return null;

  return {
    ...raw,
    title: pickStaticPageTitle(raw),
    content: pickStaticPageContent(raw),
  };
});
