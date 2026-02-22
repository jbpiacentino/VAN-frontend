import { relationFirst, relationItems, strapiFetchAll } from '../../utils/strapi';

export default defineEventHandler(async (event) => {
  const slug = String(getRouterParam(event, 'slug') || '').trim();
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing solution slug' });
  }

  const rows = await strapiFetchAll('solutions', {
    populate: '*',
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': 1,
  });
  const solution = rows[0];
  if (!solution) {
    throw createError({ statusCode: 404, statusMessage: 'Solution not found' });
  }

  const solutionId = String(solution.documentId || '');
  const vendor = relationFirst(solution?.vendor);

  const [allGuides, allBriefs, allKb] = await Promise.all([
    strapiFetchAll('solution-guides', { populate: '*', 'sort[0]': 'title:asc', 'pagination[pageSize]': 300 }),
    strapiFetchAll('solution-briefs', { populate: '*', 'sort[0]': 'title:asc', 'pagination[pageSize]': 300 }),
    strapiFetchAll('kb-articles', { populate: '*', 'sort[0]': 'title:asc', 'pagination[pageSize]': 300 }),
  ]);

  const guides = allGuides
    .filter((row) => relationItems(row?.solutions).some((rel) => String(rel?.documentId || '') === solutionId))
    .map((row) => ({
      id: row.id,
      documentId: row.documentId,
      slug: row.slug,
      title: row.title,
      summary: row.summary,
    }));

  const briefs = allBriefs
    .filter((row) => relationItems(row?.solution).some((rel) => String(rel?.documentId || '') === solutionId))
    .map((row) => ({
      id: row.id,
      documentId: row.documentId,
      slug: row.slug,
      title: row.title,
      shortDescription: row.short_description,
      description: row.description,
      integrationType: row.integration_type,
      supportedCapabilities: row.supported_capabilities,
    }));

  const kbArticles = allKb
    .filter((row) => {
      const one = relationItems(row?.solution);
      const many = relationItems(row?.solutions);
      return [...one, ...many].some((rel) => String(rel?.documentId || '') === solutionId);
    })
    .map((row) => ({
      id: row.id,
      documentId: row.documentId,
      slug: row.slug,
      title: row.title,
      type: row.type,
      severity: row.severity,
    }));

  return {
    solution: {
      id: solution.id,
      documentId: solution.documentId,
      slug: solution.slug,
      name: solution.name || solution.title,
      shortDescription: solution.short_description,
      description: solution.description,
      workflow: solution.workflow,
      solutionType: solution.solution_type,
      integrationPattern: solution.integration_patterns,
      licensingModel: solution.licensing_model,
      visibilityLevel: solution.visibility_level,
      vendor: vendor
        ? {
            id: vendor.id,
            documentId: vendor.documentId,
            slug: vendor.slug,
            name: vendor.name,
          }
        : null,
    },
    guides,
    briefs,
    kbArticles,
  };
});
