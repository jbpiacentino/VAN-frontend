import { relationItems, strapiFetchAll } from '../../utils/strapi';

export default defineEventHandler(async (event) => {
  const slug = String(getRouterParam(event, 'slug') || '').trim();
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing KB article slug' });
  }

  const rows = await strapiFetchAll('kb-articles', {
    populate: '*',
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': 1,
  });
  const kb = rows[0];
  if (!kb) {
    throw createError({ statusCode: 404, statusMessage: 'KB article not found' });
  }

  const solutions = [
    ...relationItems(kb?.solution),
    ...relationItems(kb?.solutions),
  ]
    .filter((item, index, arr) =>
      arr.findIndex((other) => String(other?.documentId || '') === String(item?.documentId || '')) === index
    )
    .map((item) => ({
      id: item.id,
      documentId: item.documentId,
      slug: item.slug,
      name: item.name || item.title,
      shortDescription: item.short_description,
    }));

  const products = [
    ...relationItems(kb?.product),
    ...relationItems(kb?.products),
  ]
    .filter((item, index, arr) =>
      arr.findIndex((other) => String(other?.documentId || '') === String(item?.documentId || '')) === index
    )
    .map((item) => ({
      id: item.id,
      documentId: item.documentId,
      slug: item.slug,
      name: item.name || item.title,
    }));

  return {
    article: {
      id: kb.id,
      documentId: kb.documentId,
      slug: kb.slug,
      title: kb.title,
      type: kb.type,
      severity: kb.severity,
      workflow: kb.workflow,
      symptoms: kb.symptoms,
      rootCause: kb.root_cause,
      resolution: kb.resolution,
      notes: kb.notes,
      body: kb.body,
      summary: kb.summary,
    },
    solutions,
    products,
  };
});
