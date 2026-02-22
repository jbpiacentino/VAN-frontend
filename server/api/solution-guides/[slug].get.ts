import { relationFirst, relationItems, strapiFetchAll } from '../../utils/strapi';

export default defineEventHandler(async (event) => {
  const slug = String(getRouterParam(event, 'slug') || '').trim();
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing guide slug' });
  }

  const rows = await strapiFetchAll('solution-guides', {
    populate: '*',
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': 1,
  });
  const guide = rows[0];
  if (!guide) {
    throw createError({ statusCode: 404, statusMessage: 'Solution guide not found' });
  }

  const solutions = relationItems(guide?.solutions).map((item) => {
    const owner = relationFirst(item?.vendor);
    return {
      id: item.id,
      documentId: item.documentId,
      slug: item.slug,
      name: item.name || item.title,
      shortDescription: item.short_description,
      vendor: owner
        ? {
            slug: owner.slug,
            name: owner.name,
          }
        : null,
    };
  });

  const products = relationItems(guide?.products).map((item) => ({
    id: item.id,
    documentId: item.documentId,
    slug: item.slug,
    name: item.name || item.title,
  }));

  return {
    guide: {
      id: guide.id,
      documentId: guide.documentId,
      slug: guide.slug,
      title: guide.title,
      summary: guide.summary,
      body: guide.body,
      workflow: guide.workflow,
    },
    solutions,
    products,
  };
});
