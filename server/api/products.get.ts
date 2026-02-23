import { relationItems, strapiFetch } from '../utils/strapi';

function parsePositiveInt(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = parsePositiveInt(query.page, 1);
  const pageSize = Math.min(parsePositiveInt(query.pageSize, 10), 100);

  const response = await strapiFetch('/products', {
    populate: '*',
    'sort[0]': 'name:asc',
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
  });

  const rows = Array.isArray(response?.data) ? response.data : [];
  const pagination = response?.meta?.pagination || {};

  return {
    items: rows.map((product) => ({
      id: product.id,
      documentId: product.documentId,
      slug: product.slug || '',
      name: product.name || product.title || '',
      description: product.description || '',
      counts: {
        guides: relationItems(product.solution_guides).length,
        briefs: relationItems(product.solution_briefs).length,
        kbArticles: relationItems(product.kb_articles).length,
      },
    })),
    pagination: {
      page: Number(pagination.page || page),
      pageSize: Number(pagination.pageSize || pageSize),
      pageCount: Number(pagination.pageCount || 1),
      total: Number(pagination.total || rows.length),
    },
  };
});
