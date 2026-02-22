import { relationFirst, relationItems, strapiFetchAll } from '../../utils/strapi';

export default defineEventHandler(async (event) => {
  const slug = String(getRouterParam(event, 'slug') || '').trim();
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing brief slug' });
  }

  const rows = await strapiFetchAll('solution-briefs', {
    populate: '*',
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': 1,
  });
  const brief = rows[0];
  if (!brief) {
    throw createError({ statusCode: 404, statusMessage: 'Solution brief not found' });
  }

  const solution = relationFirst(brief?.solution) || relationFirst(relationItems(brief?.solutions));
  const vendor = relationFirst(solution?.vendor);
  const product = relationFirst(brief?.product) || relationFirst(relationItems(brief?.products));

  return {
    brief: {
      id: brief.id,
      documentId: brief.documentId,
      slug: brief.slug,
      title: brief.title,
      shortDescription: brief.short_description,
      description: brief.description,
      workflow: brief.workflow,
      integrationType: brief.integration_type,
      supportedCapabilities: brief.supported_capabilities,
      requirements: brief.requirements,
      limitations: brief.limitations,
      solution: solution
        ? {
            id: solution.id,
            documentId: solution.documentId,
            slug: solution.slug,
            name: solution.name || solution.title,
          }
        : null,
      vendor: vendor
        ? {
            slug: vendor.slug,
            name: vendor.name,
          }
        : null,
      product: product
        ? {
            slug: product.slug,
            name: product.name || product.title,
          }
        : null,
    },
  };
});
