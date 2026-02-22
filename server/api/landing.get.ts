import { strapiFetch } from '../utils/strapi';

function asRecord(value: unknown): Record<string, any> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, any>;
}

function withAttributes(value: unknown): Record<string, any> {
  const base = asRecord(value);
  const attrs = asRecord(base.attributes);
  return { ...attrs, ...base };
}

function normalizeString(value: unknown, trim = true) {
  if (typeof value !== 'string') return '';
  // Handle accidentally escaped newlines from CMS copy/paste.
  const normalized = value.replace(/\\n/g, '\n');
  return trim ? normalized.trim() : normalized;
}

function childNodes(node: any): any[] {
  if (!node || typeof node !== 'object') return [];
  if (Array.isArray(node.children)) return node.children;
  if (Array.isArray(node.content)) return node.content;
  return [];
}

function applyInlineMarks(text: string, node: any): string {
  let output = text;
  const marks = Array.isArray(node?.marks) ? node.marks : [];
  for (const mark of marks) {
    const markType = normalizeString(mark?.type).toLowerCase();
    if (markType === 'strong' || markType === 'bold') output = `**${output}**`;
    if (markType === 'em' || markType === 'italic') output = `*${output}*`;
    if (markType === 'underline') output = `<u>${output}</u>`;
    if (markType === 'strike' || markType === 'strikethrough') output = `~~${output}~~`;
    if (markType === 'code') output = `\`${output}\``;
    if (markType === 'link') {
      const href = normalizeString(mark?.attrs?.href || mark?.href || mark?.url);
      if (href) output = `[${output}](${href})`;
    }
  }
  if (node?.code) output = `\`${output}\``;
  if (node?.bold) output = `**${output}**`;
  if (node?.italic) output = `*${output}*`;
  if (node?.underline) output = `<u>${output}</u>`;
  if (node?.strikethrough) output = `~~${output}~~`;
  return output;
}

function inlineNodeToMd(node: any): string {
  if (!node) return '';
  if (typeof node === 'string') return normalizeString(node, false);
  if (Array.isArray(node)) return node.map((item) => inlineNodeToMd(item)).join('');

  const type = normalizeString(node.type).toLowerCase();
  if (type === 'hardbreak' || type === 'hard_break' || type === 'br') {
    return '\n';
  }

  if (typeof node.text === 'string') {
    return applyInlineMarks(normalizeString(node.text, false), node);
  }

  const children = childNodes(node);
  const child = children.map((item: any) => inlineNodeToMd(item)).join('');
  const href = normalizeString(node.url || node.href || node?.attrs?.href);
  if ((type === 'link' || href) && child) {
    return href ? `[${child}](${href})` : child;
  }
  return child;
}

function blockListToMd(children: any[], ordered: boolean): string {
  return children
    .map((item: any, index: number) => {
      const raw = blockNodeToMd(item).trim();
      if (!raw) return '';
      const prefix = ordered ? `${index + 1}.` : '-';
      return `${prefix} ${raw.replace(/\n/g, '\n  ')}`;
    })
    .filter(Boolean)
    .join('\n');
}

function blockNodeToMd(node: any): string {
  if (!node) return '';
  if (typeof node === 'string') return normalizeString(node);
  if (Array.isArray(node)) return node.map((item) => blockNodeToMd(item)).filter(Boolean).join('\n\n');

  const type = normalizeString(node.type).toLowerCase();
  const children = childNodes(node);
  const text = inlineNodeToMd(children.length ? children : node).trim();

  if (type === 'doc') {
    return children.map((item: any) => blockNodeToMd(item)).filter(Boolean).join('\n\n');
  }

  if (type === 'heading') {
    const level = Number(node.level || node?.attrs?.level || 2);
    const safe = Number.isFinite(level) ? Math.min(6, Math.max(1, level)) : 2;
    return `${'#'.repeat(safe)} ${text}`.trim();
  }
  if (type === 'paragraph') return text;
  if (type === 'quote' || type === 'blockquote') return text ? `> ${text.replace(/\n/g, '\n> ')}` : '';
  if (type === 'list' || type === 'orderedlist' || type === 'bulletlist') {
    const ordered =
      type === 'orderedlist' ||
      normalizeString(node.format).toLowerCase() === 'ordered' ||
      normalizeString(node?.attrs?.listType).toLowerCase() === 'ordered';
    return blockListToMd(children, ordered);
  }
  if (type === 'list-item' || type === 'listitem') {
    if (children.length) {
      return children
        .map((item: any) => blockNodeToMd(item))
        .filter(Boolean)
        .join('\n')
        .trim();
    }
    return text;
  }
  if (type === 'code' || type === 'codeblock' || type === 'code_block') {
    const lang = normalizeString(node.language);
    return `\`\`\`${lang}\n${text || inlineNodeToMd(children).trim()}\n\`\`\``;
  }
  if (type === 'horizontalrule' || type === 'thematicbreak') {
    return '---';
  }
  if (text) return text;

  // Fallback for unknown object nodes.
  const blocks = asRecord(node).blocks;
  if (Array.isArray(blocks)) return blocks.map((item: any) => blockNodeToMd(item)).filter(Boolean).join('\n\n');
  return '';
}

function toMarkdown(value: unknown): string {
  const plain = normalizeString(value);
  if (plain) return plain;

  if (Array.isArray(value)) {
    return value.map((item) => blockNodeToMd(item)).filter(Boolean).join('\n\n').trim();
  }

  if (!value || typeof value !== 'object') return '';
  const obj = asRecord(value);

  const isRichTextNode = typeof obj.type === 'string' || Array.isArray(obj.content) || Array.isArray(obj.children);
  if (isRichTextNode) {
    const md = blockNodeToMd(obj).trim();
    if (md) return md;
  }

  const directKeys = [
    'content',
    'blocks',
    'children',
    'body',
    'markdown',
    'text',
  ];
  for (const key of directKeys) {
    const md = toMarkdown(obj[key]);
    if (md) return md;
  }

  return blockNodeToMd(obj).trim();
}

function pickTitle(entry: Record<string, any>) {
  const titleKeys = ['title', 'name', 'heading', 'Heading', 'label'];
  for (const key of titleKeys) {
    const value = normalizeString(entry[key]);
    if (value) return value;
  }
  return 'Alliance Network';
}

function pickContent(entry: Record<string, any>) {
  return toMarkdown(entry.content);
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const singleType = String(config.landingSingleType || 'landing-page');
  const response = await strapiFetch(`/${singleType}`, { populate: '*' });
  const raw = withAttributes(response?.data || null);

  if (!raw || Object.keys(raw).length === 0) return null;

  return {
    ...raw,
    title: pickTitle(raw),
    content: pickContent(raw),
  };
});
