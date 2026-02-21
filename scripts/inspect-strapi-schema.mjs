import fs from 'node:fs';
import path from 'node:path';

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
    collections: null,
    out: null,
    pageSize: 1,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--collections') {
      opts.collections = (argv[i + 1] || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      i += 1;
    } else if (arg === '--out') {
      opts.out = argv[i + 1] || null;
      i += 1;
    } else if (arg === '--page-size') {
      const n = Number.parseInt(argv[i + 1], 10);
      if (Number.isFinite(n) && n > 0) opts.pageSize = n;
      i += 1;
    }
  }

  return opts;
}

function classify(value) {
  if (value === null) return { type: 'null' };

  if (Array.isArray(value)) {
    if (value.length === 0) return { type: 'array', items: 'unknown' };
    const first = value.find((v) => v !== null) ?? value[0];
    const firstType = classify(first).type;
    const looksLikeRelation =
      first &&
      typeof first === 'object' &&
      !Array.isArray(first) &&
      ('id' in first || 'documentId' in first);

    return {
      type: looksLikeRelation ? 'relation-many' : 'array',
      items: firstType,
    };
  }

  const t = typeof value;
  if (t !== 'object') return { type: t };

  const keys = Object.keys(value);
  const looksLikeMedia = keys.includes('url') && (keys.includes('mime') || keys.includes('ext'));
  const looksLikeRelation = keys.includes('id') || keys.includes('documentId');

  if (looksLikeMedia) return { type: 'media' };
  if (looksLikeRelation) return { type: 'relation-one' };
  return { type: 'object' };
}

function inferSchemaFromRecord(record) {
  const fields = {};
  for (const [key, value] of Object.entries(record || {})) {
    const info = classify(value);
    fields[key] = {
      type: info.type,
      ...(info.items ? { items: info.items } : {}),
      nullable: value === null,
    };
  }
  return fields;
}

async function fetchCollection({ baseUrl, apiPrefix, token, collection, pageSize }) {
  const prefix = apiPrefix || '';
  const url = new URL(`${baseUrl}${prefix}/${collection}`);
  url.searchParams.set('populate', '*');
  url.searchParams.set('pagination[page]', '1');
  url.searchParams.set('pagination[pageSize]', String(pageSize));

  const response = await fetch(url, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `HTTP ${response.status} ${response.statusText} for ${url.toString()} :: ${body.slice(0, 300)}`
    );
  }

  const json = await response.json();
  const rows = Array.isArray(json?.data) ? json.data : json?.data ? [json.data] : [];

  return {
    url: url.toString(),
    rows,
    meta: json?.meta || null,
  };
}

async function main() {
  loadDotEnv(path.resolve(process.cwd(), '.env'));

  const args = parseArgs(process.argv.slice(2));
  const baseUrl = (process.env.VITE_STRAPI_BASE_URL || '').replace(/\/$/, '');
  const apiPrefix = process.env.VITE_STRAPI_API_PREFIX ?? '/api';
  const token = process.env.VITE_STRAPI_API_TOKEN || '';

  const defaultCollections = [
    'vendors',
    'solutions',
    'solution-guides',
    'solution-briefs',
    'kb-articles',
    'compatibility-records',
    'products',
    'VAN-members',
  ];
  const collections = args.collections?.length ? args.collections : defaultCollections;

  if (!baseUrl) {
    throw new Error('Missing VITE_STRAPI_BASE_URL. Set it in .env');
  }

  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    apiPrefix,
    collections: {},
  };

  for (const collection of collections) {
    try {
      const result = await fetchCollection({
        baseUrl,
        apiPrefix,
        token,
        collection,
        pageSize: args.pageSize,
      });

      const sample = result.rows[0] || null;
      report.collections[collection] = {
        ok: true,
        endpoint: result.url,
        sampleCount: result.rows.length,
        total: result.meta?.pagination?.total ?? null,
        fields: sample ? inferSchemaFromRecord(sample) : {},
        note: sample ? null : 'No rows returned; fields cannot be inferred from empty data.',
      };
    } catch (err) {
      report.collections[collection] = {
        ok: false,
        error: err.message,
      };
    }
  }

  const output = JSON.stringify(report, null, 2);

  if (args.out) {
    fs.writeFileSync(path.resolve(process.cwd(), args.out), output + '\n', 'utf8');
    console.log(`Wrote schema report to ${args.out}`);
  } else {
    console.log(output);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
