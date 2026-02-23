import { relationFirst, relationItems, strapiFetch } from '../../utils/strapi';

export default defineEventHandler(async (event) => {
  const slug = String(getRouterParam(event, 'slug') || '').trim();
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing solution slug' });
  }

  const response = await strapiFetch('/solutions', {
    populate: '*',
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': 1,
  });

  const rows = Array.isArray(response?.data) ? response.data : [];
  const solution = rows[0];
  if (!solution) {
    throw createError({ statusCode: 404, statusMessage: 'Solution not found' });
  }

  const vendor = relationFirst(solution?.vendor);
  const products = relationItems(solution?.products).map((item) => ({
    id: item.id,
    documentId: item.documentId,
    slug: item.slug || '',
    name: item.name || item.title || '',
  }));
  const relatedGuides = relationItems(solution?.solution_guides)
    .map((item) => ({
      id: item.id,
      documentId: item.documentId,
      slug: item.slug || '',
      title: item.title || item.name || '',
      href: item.slug ? `/solution-guides/${item.slug}` : '',
    }))
    .filter((item) => item.slug && item.title);
  const relatedBriefs = relationItems(solution?.solution_briefs)
    .map((item) => ({
      id: item.id,
      documentId: item.documentId,
      slug: item.slug || '',
      title: item.title || item.name || '',
      href: item.slug ? `/solution-briefs/${item.slug}` : '',
    }))
    .filter((item) => item.slug && item.title);
  const relatedKbArticles = relationItems(solution?.kb_articles)
    .map((item) => ({
      id: item.id,
      documentId: item.documentId,
      slug: item.slug || '',
      title: item.title || item.name || '',
      href: item.slug ? `/kb-articles/${item.slug}` : '',
    }))
    .filter((item) => item.slug && item.title);

  return {
    id: solution.id,
    documentId: solution.documentId,
    slug: solution.slug,
    name: solution.name || solution.title || '',
    shortDescription: solution.short_description || '',
    summary: solution.summary || '',
    description: solution.description || '',
    workflow: solution.workflow || '',
    solutionType: solution.solution_type || '',
    integrationPattern: solution.integration_patterns || '',
    licensingModel: solution.licensing_model || '',
    visibilityLevel: solution.visibility_level || '',
    vendor: vendor
      ? {
          id: vendor.id,
          documentId: vendor.documentId,
          slug: vendor.slug || '',
          name: vendor.name || '',
        }
      : null,
    products,
    createdAt: solution.createdAt || null,
    updatedAt: solution.updatedAt || null,
    publishedAt: solution.publishedAt || null,
    relatedResources: {
      guides: relatedGuides,
      briefs: relatedBriefs,
      kbArticles: relatedKbArticles,
    },
  };
});
