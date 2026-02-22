import fs from 'node:fs';
import path from 'node:path';
import { seedData } from './seed-data.mjs';

const COLLECTION_ORDER = [
  'vendors',
  'VAN-members',
  'products',
  'solutions',
  'solution-guides',
  'solution-briefs',
  'kb-articles',
  'compatibility-records'
];

const COLLECTIONS_WITH_SLUG = new Set([
  'vendors',
  'products',
  'solutions',
  'solution-guides',
  'solution-briefs',
  'kb-articles',
  'compatibility-records'
]);
const COLLECTION_FINGERPRINT_FIELDS = {
  'compatibility-records': ['title', 'status', 'summary'],
  'VAN-members': ['tier', 'registered_at', 'expires_at']
};

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
  const raw = fs.readFileSync(filePath, 'utf8');
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx < 0) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    if (!key || process.env[key] !== undefined) continue;
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

function parseArgs(argv) {
  const opts = {
    apply: false,
    verbose: false,
    only: null
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--apply') {
      opts.apply = true;
    } else if (arg === '--verbose') {
      opts.verbose = true;
    } else if (arg === '--only') {
      opts.only = (argv[i + 1] || '').split(',').map((s) => s.trim()).filter(Boolean);
      i += 1;
    }
  }

  return opts;
}

function loadSchemaReport(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

function deriveVendorComponentShapeFromSchema(schemaReport) {
  const vendorFields = schemaReport?.collections?.vendors?.fields || {};
  return {
    regionsField: Object.prototype.hasOwnProperty.call(vendorFields, 'regions')
      ? 'regions'
      : Object.prototype.hasOwnProperty.call(vendorFields, 'region')
        ? 'region'
        : 'regions',
    focusField: Object.prototype.hasOwnProperty.call(vendorFields, 'areas_of_focus')
      ? 'areas_of_focus'
      : Object.prototype.hasOwnProperty.call(vendorFields, 'area_of_focus')
        ? 'area_of_focus'
        : 'areas_of_focus'
  };
}

function uniqueKeyForItem(collection, item) {
  if (COLLECTIONS_WITH_SLUG.has(collection) && item.slug) return { field: 'slug', value: item.slug };
  if (COLLECTIONS_WITH_SLUG.has(collection) && item.data?.slug) return { field: 'slug', value: item.data.slug };
  if (item.data?.title) return { field: 'title', value: item.data.title };
  if (item.data?.name) return { field: 'name', value: item.data.name };
  return null;
}

function normalizePayload(collection, item) {
  return {
    ...item.data,
    ...(COLLECTIONS_WITH_SLUG.has(collection) && item.slug ? { slug: item.slug } : {})
  };
}

function isRelationReference(value) {
  return typeof value === 'string' && value.startsWith('@');
}

function parseReference(ref) {
  const match = ref.match(/^@([^:]+):(.+)$/);
  if (!match) {
    throw new Error(`Invalid relation reference: ${ref}`);
  }
  return {
    collection: match[1],
    key: match[2]
  };
}

function registryKey(collection, key) {
  return `${collection}:${key}`;
}

function pickWritableFields(payload) {
  const readOnly = new Set(['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'locale', 'localizations']);
  const next = {};
  for (const [key, value] of Object.entries(payload)) {
    if (readOnly.has(key)) continue;
    next[key] = value;
  }
  return next;
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (value === null || value === undefined) return [];
  return [value];
}

function relationFirst(value) {
  if (!value) return null;
  if (Array.isArray(value)) return value[0] || null;
  if (Array.isArray(value?.data)) return value.data[0] || null;
  if (value?.data && typeof value.data === 'object') return value.data;
  if (typeof value === 'object') return value;
  return null;
}

function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function inferComponentValueKey(existingArray, fallbackKey) {
  if (!Array.isArray(existingArray)) return fallbackKey;
  const firstObject = existingArray.find((item) => item && typeof item === 'object' && !Array.isArray(item));
  if (!firstObject) return fallbackKey;

  const candidate = Object.keys(firstObject).find((key) => {
    if (['id', 'documentId', '__component'].includes(key)) return false;
    return typeof firstObject[key] === 'string';
  });

  return candidate || fallbackKey;
}

function inferVendorLinksKeys(existingArray, fallback = { labelKey: 'label', urlKey: 'url' }) {
  if (!Array.isArray(existingArray)) return fallback;
  const firstObject = existingArray.find((item) => item && typeof item === 'object' && !Array.isArray(item));
  if (!firstObject) return fallback;

  const keys = Object.keys(firstObject).filter((key) => !['id', 'documentId', '__component'].includes(key));
  const urlKey =
    keys.find((key) => /^(url|href|link)$/i.test(key)) ||
    keys.find((key) => /url|href|link/i.test(key)) ||
    fallback.urlKey;
  const labelKey =
    keys.find((key) => /^(label|title|name|text)$/i.test(key)) ||
    keys.find((key) => key !== urlKey) ||
    fallback.labelKey;

  return { labelKey, urlKey };
}

function normalizeVendorComponentArrays(payload, existingRecord, shape = {}) {
  const next = { ...payload };
  const regionsField = shape.regionsField || 'regions';
  const focusField = shape.focusField || 'areas_of_focus';

  if (regionsField !== 'regions' && next.regions !== undefined && next[regionsField] === undefined) {
    next[regionsField] = next.regions;
    delete next.regions;
  }
  if (focusField !== 'areas_of_focus' && next.areas_of_focus !== undefined && next[focusField] === undefined) {
    next[focusField] = next.areas_of_focus;
    delete next.areas_of_focus;
  }

  const fields = [
    { name: regionsField, fallbackValueKey: shape.regionsValueKey || 'regions' },
    { name: focusField, fallbackValueKey: shape.focusValueKey || 'area_of_focus' }
  ];

  for (const field of fields) {
    if (!isStringArray(next[field.name])) continue;
    const valueKey = inferComponentValueKey(existingRecord?.[field.name], field.fallbackValueKey);
    next[field.name] = next[field.name].map((value) => ({ [valueKey]: value }));
  }

  if (Array.isArray(next.links) && next.links.every((entry) => entry && typeof entry === 'object')) {
    const detected = inferVendorLinksKeys(existingRecord?.links, {
      labelKey: shape.linksLabelKey || 'label',
      urlKey: shape.linksUrlKey || 'url'
    });

    next.links = next.links.map((entry) => ({
      [detected.labelKey]: String(entry.label || entry.title || entry.name || '').trim(),
      [detected.urlKey]: String(entry.url || entry.href || entry.link || '').trim()
    })).filter((entry) => entry[detected.urlKey]);
  }

  return next;
}

async function detectVendorComponentValueKeys(client, shape = {}) {
  const out = {};
  const vendors = await client.listAll('vendors');
  out.regionsField = shape.regionsField || 'regions';
  out.focusField = shape.focusField || 'areas_of_focus';
  const fields = [
    { sourceField: out.regionsField, outKey: 'regionsValueKey' },
    { sourceField: out.focusField, outKey: 'focusValueKey' }
  ];

  for (const field of fields) {
    for (const vendor of vendors) {
      const key = inferComponentValueKey(vendor?.[field.sourceField], '');
      if (key) {
        out[field.outKey] = key;
        break;
      }
    }
  }

  for (const vendor of vendors) {
    const keys = inferVendorLinksKeys(vendor?.links, null);
    if (keys?.labelKey && keys?.urlKey) {
      out.linksLabelKey = keys.labelKey;
      out.linksUrlKey = keys.urlKey;
      break;
    }
  }

  return out;
}

function normalizeUrl(baseUrl, maybeRelativeUrl) {
  if (!maybeRelativeUrl) return '';
  if (maybeRelativeUrl.startsWith('http://') || maybeRelativeUrl.startsWith('https://')) return maybeRelativeUrl;
  return `${baseUrl}${maybeRelativeUrl}`;
}

async function fetchJson(url, options = {}) {
  let response;
  try {
    response = await fetch(url, options);
  } catch (err) {
    const cause = err?.cause?.message ? ` :: ${err.cause.message}` : '';
    throw new Error(`Network error for ${url}: ${err.message}${cause}`);
  }
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!response.ok) {
    const details = json?.error ? JSON.stringify(json.error) : text.slice(0, 500);
    throw new Error(`HTTP ${response.status} ${response.statusText} for ${url}: ${details}`);
  }

  return json;
}

function buildClient() {
  const baseUrl = (process.env.VITE_STRAPI_BASE_URL || '').replace(/\/$/, '');
  const apiPrefix = process.env.VITE_STRAPI_API_PREFIX ?? '/api';
  const token =
    process.env.VITE_STRAPI_FULL_ACCESS_TOKEN ||
    process.env.STRAPI_API_TOKEN ||
    process.env.VITE_STRAPI_API_TOKEN ||
    '';

  if (!baseUrl) throw new Error('Missing VITE_STRAPI_BASE_URL in .env');
  if (!token) {
    throw new Error(
      'Missing VITE_STRAPI_FULL_ACCESS_TOKEN (or STRAPI_API_TOKEN / VITE_STRAPI_API_TOKEN) in .env'
    );
  }

  const root = `${baseUrl}${apiPrefix}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  const authHeaders = {
    Authorization: `Bearer ${token}`
  };

  return {
    root,
    baseUrl,
    headers,
    async findByField(collection, field, value) {
      const url = new URL(`${root}/${collection}`);
      url.searchParams.set(`filters[${field}][$eq]`, value);
      url.searchParams.set('pagination[pageSize]', '1');
      const json = await fetchJson(url.toString(), { headers });
      const rows = Array.isArray(json?.data) ? json.data : [];
      return rows[0] || null;
    },
    async create(collection, data) {
      const json = await fetchJson(`${root}/${collection}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ data })
      });
      return json?.data || null;
    },
    async update(collection, identifier, data) {
      const json = await fetchJson(`${root}/${collection}/${identifier}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify({ data })
      });
      return json?.data || null;
    },
    async remove(collection, identifier) {
      await fetchJson(`${root}/${collection}/${identifier}`, {
        method: 'DELETE',
        headers
      });
    },
    async listAll(collection, pageSize = 100) {
      const rows = [];
      let page = 1;

      while (true) {
        const url = new URL(`${root}/${collection}`);
        url.searchParams.set('pagination[page]', String(page));
        url.searchParams.set('pagination[pageSize]', String(pageSize));
        url.searchParams.set('populate', '*');

        const json = await fetchJson(url.toString(), { headers });
        const batch = Array.isArray(json?.data) ? json.data : [];
        rows.push(...batch);

        const total = json?.meta?.pagination?.total;
        if (typeof total === 'number' && rows.length >= total) break;
        if (batch.length < pageSize) break;
        page += 1;
      }

      return rows;
    },
    async findUploadsByName(fileName) {
      const url = new URL(`${root}/upload/files`);
      url.searchParams.set('filters[name][$eq]', fileName);
      url.searchParams.set('pagination[pageSize]', '100');
      const json = await fetchJson(url.toString(), { headers: authHeaders });
      const rows = toArray(json);
      return rows;
    },
    async deleteUpload(fileId) {
      await fetchJson(`${root}/upload/files/${fileId}`, {
        method: 'DELETE',
        headers: authHeaders
      });
    },
    async uploadFile({ filePath, sourceUrl, fileName, mimeType }) {
      let buffer;
      if (filePath) {
        const absolute = path.resolve(process.cwd(), filePath);
        if (!fs.existsSync(absolute)) {
          throw new Error(`Media file not found: ${filePath}`);
        }
        buffer = fs.readFileSync(absolute);
      } else if (sourceUrl) {
        let downloaded;
        try {
          downloaded = await fetch(sourceUrl);
        } catch (err) {
          const cause = err?.cause?.message ? ` :: ${err.cause.message}` : '';
          throw new Error(`Network error downloading ${sourceUrl}: ${err.message}${cause}`);
        }
        if (!downloaded.ok) {
          const body = await downloaded.text();
          throw new Error(`Failed downloading ${sourceUrl}: HTTP ${downloaded.status} ${downloaded.statusText} ${body.slice(0, 300)}`);
        }
        const ab = await downloaded.arrayBuffer();
        buffer = Buffer.from(ab);
      } else {
        throw new Error('uploadFile requires filePath or sourceUrl');
      }

      const form = new FormData();
      const blob = new Blob([buffer], { type: mimeType || 'application/octet-stream' });
      form.append('files', blob, fileName || path.basename(filePath || sourceUrl));

      let response;
      try {
        response = await fetch(`${root}/upload`, {
          method: 'POST',
          headers: authHeaders,
          body: form
        });
      } catch (err) {
        const cause = err?.cause?.message ? ` :: ${err.cause.message}` : '';
        throw new Error(`Network error for upload ${filePath}: ${err.message}${cause}`);
      }

      const text = await response.text();
      let json = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        json = null;
      }

      if (!response.ok) {
        const details = json?.error ? JSON.stringify(json.error) : text.slice(0, 500);
        throw new Error(`HTTP ${response.status} ${response.statusText} for upload ${filePath}: ${details}`);
      }

      const rows = toArray(json);
      return rows[0] || null;
    }
  };
}

function normalizeComparable(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value.trim().toLowerCase();
  return String(value).trim().toLowerCase();
}

function matchesFingerprint(record, payload, fields) {
  return fields.every((field) => {
    const left = normalizeComparable(record?.[field]);
    const right = normalizeComparable(payload?.[field]);
    return left === right;
  });
}

async function findByFingerprint(client, collection, payload) {
  const fields = COLLECTION_FINGERPRINT_FIELDS[collection] || [];
  if (!fields.length) return null;
  const records = await client.listAll(collection);
  return records.find((record) => matchesFingerprint(record, payload, fields)) || null;
}

async function findVanMemberByVendorRef(client, item, registry, verbose = false) {
  const vendorRef = item?.relations?.vendor;
  if (!isRelationReference(vendorRef)) return null;

  const parsed = parseReference(vendorRef);
  const target = registry.get(registryKey(parsed.collection, parsed.key));
  if (!target) return null;

  const targetDocumentId = String(target.documentId || '');
  const targetId = Number(target.id || 0);
  if (!targetDocumentId && !targetId) return null;

  const rows = await client.listAll('VAN-members');
  const matches = rows.filter((row) => {
    const vendor = relationFirst(row?.vendor);
    const vendorDocumentId = String(vendor?.documentId || '');
    const vendorId = Number(vendor?.id || 0);

    if (targetDocumentId && vendorDocumentId) {
      return vendorDocumentId === targetDocumentId;
    }
    if (targetId && vendorId) {
      return vendorId === targetId;
    }
    return false;
  });

  if (matches.length > 1) {
    const [keep, ...duplicates] = matches;
    for (const duplicate of duplicates) {
      const identifier = duplicate?.documentId || duplicate?.id;
      if (!identifier) continue;
      await client.remove('VAN-members', identifier);
    }
    if (verbose) {
      console.log(
        `[VAN-members] removed ${duplicates.length} duplicate membership record(s) for vendor ${parsed.key}`
      );
    }
    return keep || null;
  }

  return matches[0] || null;
}

async function resolveMediaAsset(client, mediaConfig) {
  if (!mediaConfig) return null;
  const fileName = mediaConfig.fileName || path.basename(mediaConfig.filePath || mediaConfig.sourceUrl || '');
  if (!fileName) return null;

  const existing = await client.findUploadsByName(fileName);
  if (existing.length > 0) {
    for (const file of existing) {
      if (file?.id) {
        await client.deleteUpload(file.id);
      }
    }
  }

  return client.uploadFile({
    filePath: mediaConfig.filePath,
    sourceUrl: mediaConfig.sourceUrl,
    fileName,
    mimeType: mediaConfig.mimeType
  });
}

function resolveRelationTargets(value, registry) {
  if (Array.isArray(value)) {
    return value.map((entry) => {
      if (!isRelationReference(entry)) return entry;
      const ref = parseReference(entry);
      const found = registry.get(registryKey(ref.collection, ref.key));
      if (!found) throw new Error(`Missing related record for ${entry}`);
      return found;
    });
  }

  if (isRelationReference(value)) {
    const ref = parseReference(value);
    const found = registry.get(registryKey(ref.collection, ref.key));
    if (!found) throw new Error(`Missing related record for ${value}`);
    return found;
  }

  return value;
}

function relationCandidates(resolvedValue) {
  const one = !Array.isArray(resolvedValue);
  if (one) {
    const id = resolvedValue?.id;
    const documentId = resolvedValue?.documentId;
    return [
      id,
      documentId,
      { connect: id ? [id] : [] },
      { connect: documentId ? [documentId] : [] },
      { set: id ? [id] : [] },
      { set: documentId ? [documentId] : [] }
    ].filter((candidate) => candidate !== undefined && candidate !== null);
  }

  const ids = resolvedValue.map((r) => r?.id).filter(Boolean);
  const documentIds = resolvedValue.map((r) => r?.documentId).filter(Boolean);

  return [
    ids,
    documentIds,
    { connect: ids },
    { connect: documentIds },
    { set: ids },
    { set: documentIds }
  ].filter((candidate) => {
    if (Array.isArray(candidate)) return candidate.length > 0;
    if (candidate && Array.isArray(candidate.connect)) return candidate.connect.length > 0;
    if (candidate && Array.isArray(candidate.set)) return candidate.set.length > 0;
    return true;
  });
}

async function upsertBaseEntries({ client, collections, dryRun, verbose, vendorComponentShapeFromSchema }) {
  const registry = new Map();
  const vendorComponentShape =
    !dryRun && collections.includes('vendors')
      ? await detectVendorComponentValueKeys(client, vendorComponentShapeFromSchema)
      : vendorComponentShapeFromSchema || {};

  for (const collection of collections) {
    const items = seedData[collection] || [];
    for (const item of items) {
      const key = uniqueKeyForItem(collection, item);
      const payload = pickWritableFields(normalizePayload(collection, item));
      const localRefKey = item.slug || key?.value || JSON.stringify(payload);
      const relationFreePayload = { ...payload };
      delete relationFreePayload.solutions;
      delete relationFreePayload.solution;
      delete relationFreePayload.vendor;
      delete relationFreePayload.products;
      delete relationFreePayload.solution_guides;
      delete relationFreePayload.solution_briefs;
      delete relationFreePayload.kb_articles;
      delete relationFreePayload.compatibility_record;
      delete relationFreePayload.compatibility_records;
      delete relationFreePayload.related_guides;

      if (item.media?.picture && !dryRun) {
        const uploadedPicture = await resolveMediaAsset(client, item.media.picture);
        const uploadedUrl = normalizeUrl(client.baseUrl, uploadedPicture?.url || '');
        if (uploadedUrl && collection === 'solutions') {
          const baseDescription = item.data?.description || '';
          relationFreePayload.description = `${baseDescription}\n\n![Solution illustration](${uploadedUrl})`;
        }
      }

      if (verbose) {
        if (key) {
          console.log(`[${collection}] upsert by ${key.field}=${key.value}`);
        } else if (collection === 'VAN-members' && isRelationReference(item?.relations?.vendor)) {
          const parsed = parseReference(item.relations.vendor);
          console.log(`[${collection}] upsert by vendor=${parsed.key}`);
        } else {
          console.log(`[${collection}] create (no filterable unique key found)`);
        }
      }

      if (dryRun) {
        registry.set(registryKey(collection, localRefKey), {
          id: 0,
          documentId: `${collection}-${localRefKey}`,
          dryRun: true
        });
        continue;
      }

      const existing = collection === 'VAN-members'
        ? await findVanMemberByVendorRef(client, item, registry, verbose)
        : key
          ? await client.findByField(collection, key.field, key.value)
          : await findByFingerprint(client, collection, relationFreePayload);

      const normalizedPayload =
        collection === 'vendors'
          ? normalizeVendorComponentArrays(relationFreePayload, existing, vendorComponentShape)
          : relationFreePayload;

      let saved;
      if (existing) {
        const identifier = existing.documentId || existing.id;
        saved = await client.update(collection, identifier, normalizedPayload);
      } else {
        saved = await client.create(collection, normalizedPayload);
      }

      if (item.media?.logo) {
        const uploadedLogo = await resolveMediaAsset(client, item.media.logo);
        if (!uploadedLogo?.id && !uploadedLogo?.documentId) {
          throw new Error(`Unable to resolve uploaded logo for ${collection}:${localRefKey}`);
        }

        const identifier = saved?.documentId || saved?.id;
        const candidates = relationCandidates(uploadedLogo);
        let logoError = null;
        for (const candidate of candidates) {
          try {
            await client.update(collection, identifier, { logo: candidate });
            logoError = null;
            break;
          } catch (err) {
            logoError = err;
          }
        }

        if (logoError) {
          throw new Error(`Failed setting logo for ${collection}:${localRefKey}. ${logoError.message}`);
        }
      }

      registry.set(registryKey(collection, localRefKey), {
        id: saved?.id,
        documentId: saved?.documentId
      });
    }
  }

  return registry;
}

async function applyRelations({ client, collections, registry, dryRun, verbose }) {
  for (const collection of collections) {
    const items = seedData[collection] || [];

    for (const item of items) {
      if (!item.relations || Object.keys(item.relations).length === 0) continue;

      const key = uniqueKeyForItem(collection, item);
      const localKey = item.slug || key?.value || JSON.stringify(pickWritableFields(normalizePayload(collection, item)));
      const current = registry.get(registryKey(collection, localKey));
      if (!current) throw new Error(`Missing registry entry for ${collection}:${localKey}`);

      for (const [field, relationValue] of Object.entries(item.relations)) {
        const resolved = resolveRelationTargets(relationValue, registry);
        const candidates = relationCandidates(resolved);

        if (verbose) {
          console.log(`[${collection}:${localKey}] set relation ${field}`);
        }

        if (dryRun) continue;

        const identifier = current.documentId || current.id;
        let lastError = null;
        for (const candidate of candidates) {
          try {
            await client.update(collection, identifier, { [field]: candidate });
            lastError = null;
            break;
          } catch (err) {
            lastError = err;
          }
        }

        if (lastError) {
          throw new Error(
            `Failed setting relation ${collection}:${localKey}.${field}. Last error: ${lastError.message}`
          );
        }
      }
    }
  }
}

async function main() {
  loadDotEnv(path.resolve(process.cwd(), '.env'));
  const schemaReport = loadSchemaReport(path.resolve(process.cwd(), 'strapi-schema-report.json'));
  const vendorComponentShapeFromSchema = deriveVendorComponentShapeFromSchema(schemaReport);

  const args = parseArgs(process.argv.slice(2));
  const dryRun = !args.apply;
  const selectedCollections = args.only?.length
    ? COLLECTION_ORDER.filter((name) => args.only.includes(name))
    : COLLECTION_ORDER;

  if (selectedCollections.length === 0) {
    throw new Error('No valid collections selected.');
  }

  const client = buildClient();

  console.log(dryRun ? 'Dry-run mode (no writes).' : 'Apply mode (writes enabled).');
  console.log(`Collections: ${selectedCollections.join(', ')}`);
  if (args.verbose) {
    console.log(
      `Vendor component fields from schema: regions=${vendorComponentShapeFromSchema.regionsField}, areas_of_focus=${vendorComponentShapeFromSchema.focusField}`
    );
  }

  const registry = await upsertBaseEntries({
    client,
    collections: selectedCollections,
    dryRun,
    verbose: args.verbose,
    vendorComponentShapeFromSchema
  });

  await applyRelations({
    client,
    collections: selectedCollections,
    registry,
    dryRun,
    verbose: args.verbose
  });

  console.log('Seed workflow completed.');
  if (dryRun) {
    console.log('Run with --apply to write data into Strapi.');
  }
}

main().catch((err) => {
  console.error(err.stack || err.message || err);
  process.exit(1);
});
