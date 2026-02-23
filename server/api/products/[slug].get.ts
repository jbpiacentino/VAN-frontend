import { relationItems, strapiFetch } from '../../utils/strapi';

function dedupeByDocumentId(items: any[]) {
  return items.filter(
    (item, index, arr) =>
      arr.findIndex((other) => String(other?.documentId || other?.id || '') === String(item?.documentId || item?.id || '')) ===
      index
  );
}

function normalizeLinks(value: any) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string' && item.trim()) {
        return { label: item.trim(), url: item.trim() };
      }
      if (!item || typeof item !== 'object' || Array.isArray(item)) return null;
      const url = String(item.url || item.href || item.link || '').trim();
      const label = String(item.label || item.title || item.name || url).trim();
      if (!url) return null;
      return { label: label || url, url };
    })
    .filter(Boolean);
}

export default defineEventHandler(async (event) => {
  const slug = String(getRouterParam(event, 'slug') || '').trim();
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing product slug' });
  }

  const response = await strapiFetch('/products', {
    populate: '*',
    'filters[slug][$eq]': slug,
    'pagination[pageSize]': 1,
  });

  const rows = Array.isArray(response?.data) ? response.data : [];
  const product = rows[0];
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' });
  }

  const guides = dedupeByDocumentId(relationItems(product.solution_guides)).map((item) => ({
    id: item.id,
    documentId: item.documentId,
    slug: item.slug || '',
    title: item.title || item.name || '',
    summary: item.summary || '',
    href: item.slug ? `/solution-guides/${item.slug}` : '',
  }));
  const briefs = dedupeByDocumentId(relationItems(product.solution_briefs)).map((item) => ({
    id: item.id,
    documentId: item.documentId,
    slug: item.slug || '',
    title: item.title || item.name || '',
    shortDescription: item.short_description || '',
    href: item.slug ? `/solution-briefs/${item.slug}` : '',
  }));
  const kbArticles = dedupeByDocumentId(relationItems(product.kb_articles)).map((item) => ({
    id: item.id,
    documentId: item.documentId,
    slug: item.slug || '',
    title: item.title || item.name || '',
    type: item.type || '',
    href: item.slug ? `/kb-articles/${item.slug}` : '',
  }));

  return {
    product: {
      id: product.id,
      documentId: product.documentId,
      slug: product.slug || '',
      name: product.name || product.title || '',
      description: product.description || '',
      createdAt: product.createdAt || null,
      updatedAt: product.updatedAt || null,
      publishedAt: product.publishedAt || null,
      links: normalizeLinks(product.links),
    },
    relatedResources: {
      guides: guides.filter((item) => item.slug && item.title),
      briefs: briefs.filter((item) => item.slug && item.title),
      kbArticles: kbArticles.filter((item) => item.slug && item.title),
    },
  };
});
