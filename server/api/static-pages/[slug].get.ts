import { strapiFetch } from '../../utils/strapi';
import { pickStaticPageContent, pickStaticPageTitle, withAttributes } from '../../utils/strapi-richtext';

export default defineEventHandler(async (event) => {
  const slug = String(getRouterParam(event, 'slug') || '').trim();
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing static page slug' });
  }

  const response = await strapiFetch('/static-pages', {
    populate: '*',
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': 1,
  });

  const raw = withAttributes(Array.isArray(response?.data) ? response.data[0] : null);
  if (!raw || Object.keys(raw).length === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Static page not found' });
  }

  return {
    ...raw,
    title: pickStaticPageTitle(raw),
    content: pickStaticPageContent(raw),
  };
});
