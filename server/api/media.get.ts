import { send, setResponseHeader } from 'h3';
import { getStrapiConfig } from '../utils/strapi';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  let source = String(query.u || query.url || '').trim();
  if (!source) {
    throw createError({ statusCode: 400, statusMessage: 'Missing media URL' });
  }

  const { baseUrl, token } = getStrapiConfig();
  if (source.startsWith('/')) {
    source = `${baseUrl}${source}`;
  }

  let sourceUrl: URL;
  let baseOrigin: string;
  try {
    sourceUrl = new URL(source);
    baseOrigin = new URL(baseUrl).origin;
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid media URL' });
  }

  if (sourceUrl.origin !== baseOrigin) {
    throw createError({ statusCode: 403, statusMessage: 'Cross-origin media proxy is not allowed' });
  }

  const response = await fetch(sourceUrl.toString(), {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: `Failed to fetch media (${response.status})`,
    });
  }

  const contentType = response.headers.get('content-type') || 'application/octet-stream';
  const cacheControl = response.headers.get('cache-control') || 'public, max-age=300';
  setResponseHeader(event, 'content-type', contentType);
  setResponseHeader(event, 'cache-control', cacheControl);

  const bytes = Buffer.from(await response.arrayBuffer());
  return send(event, bytes);
});
