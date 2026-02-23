import { relationFirst, strapiFetch } from '../utils/strapi';

function parsePositiveInt(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = parsePositiveInt(query.page, 1);
  const pageSize = Math.min(parsePositiveInt(query.pageSize, 10), 100);

  const response = await strapiFetch('/solutions', {
    populate: '*',
    'sort[0]': 'name:asc',
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
  });

  const rows = Array.isArray(response?.data) ? response.data : [];
  const pagination = response?.meta?.pagination || {};

  return {
    items: rows.map((solution) => {
      const vendor = relationFirst(solution?.vendor);
      return {
        id: solution.id,
        documentId: solution.documentId,
        slug: solution.slug,
        name: solution.name || solution.title || '',
        shortDescription: solution.short_description || '',
        summary: solution.summary || '',
        solutionType: solution.solution_type || '',
        workflow: solution.workflow || '',
        vendor: vendor
          ? {
              slug: vendor.slug || '',
              name: vendor.name || '',
            }
          : null,
      };
    }),
    pagination: {
      page: Number(pagination.page || page),
      pageSize: Number(pagination.pageSize || pageSize),
      pageCount: Number(pagination.pageCount || 1),
      total: Number(pagination.total || rows.length),
    },
  };
});
