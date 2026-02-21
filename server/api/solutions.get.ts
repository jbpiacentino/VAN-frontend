import { strapiFetchAll } from '../utils/strapi';

export default defineEventHandler(async () => {
  const rows = await strapiFetchAll('solutions', {
    populate: '*',
    'sort[0]': 'name:asc',
  });

  return rows.map((solution) => ({
    id: solution.id,
    documentId: solution.documentId,
    slug: solution.slug,
    name: solution.name,
    title: solution.title,
    summary: solution.summary,
    shortDescription: solution.short_description,
    description: solution.description,
  }));
});
