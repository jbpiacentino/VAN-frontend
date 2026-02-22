import { d as defineEventHandler, u as useRuntimeConfig } from '../../nitro/nitro.mjs';
import { a as strapiFetch } from '../../_/strapi.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

function asRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value;
}
function withAttributes(value) {
  const base = asRecord(value);
  const attrs = asRecord(base.attributes);
  return { ...attrs, ...base };
}
function normalizeString(value, trim = true) {
  if (typeof value !== "string") return "";
  const normalized = value.replace(/\\n/g, "\n");
  return trim ? normalized.trim() : normalized;
}
function childNodes(node) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node.children)) return node.children;
  if (Array.isArray(node.content)) return node.content;
  return [];
}
function applyInlineMarks(text, node) {
  var _a;
  let output = text;
  const marks = Array.isArray(node == null ? void 0 : node.marks) ? node.marks : [];
  for (const mark of marks) {
    const markType = normalizeString(mark == null ? void 0 : mark.type).toLowerCase();
    if (markType === "strong" || markType === "bold") output = `**${output}**`;
    if (markType === "em" || markType === "italic") output = `*${output}*`;
    if (markType === "underline") output = `<u>${output}</u>`;
    if (markType === "strike" || markType === "strikethrough") output = `~~${output}~~`;
    if (markType === "code") output = `\`${output}\``;
    if (markType === "link") {
      const href = normalizeString(((_a = mark == null ? void 0 : mark.attrs) == null ? void 0 : _a.href) || (mark == null ? void 0 : mark.href) || (mark == null ? void 0 : mark.url));
      if (href) output = `[${output}](${href})`;
    }
  }
  if (node == null ? void 0 : node.code) output = `\`${output}\``;
  if (node == null ? void 0 : node.bold) output = `**${output}**`;
  if (node == null ? void 0 : node.italic) output = `*${output}*`;
  if (node == null ? void 0 : node.underline) output = `<u>${output}</u>`;
  if (node == null ? void 0 : node.strikethrough) output = `~~${output}~~`;
  return output;
}
function inlineNodeToMd(node) {
  var _a;
  if (!node) return "";
  if (typeof node === "string") return normalizeString(node, false);
  if (Array.isArray(node)) return node.map((item) => inlineNodeToMd(item)).join("");
  const type = normalizeString(node.type).toLowerCase();
  if (type === "hardbreak" || type === "hard_break" || type === "br") {
    return "\n";
  }
  if (typeof node.text === "string") {
    return applyInlineMarks(normalizeString(node.text, false), node);
  }
  const children = childNodes(node);
  const child = children.map((item) => inlineNodeToMd(item)).join("");
  const href = normalizeString(node.url || node.href || ((_a = node == null ? void 0 : node.attrs) == null ? void 0 : _a.href));
  if ((type === "link" || href) && child) {
    return href ? `[${child}](${href})` : child;
  }
  return child;
}
function blockListToMd(children, ordered) {
  return children.map((item, index) => {
    const raw = blockNodeToMd(item).trim();
    if (!raw) return "";
    const prefix = ordered ? `${index + 1}.` : "-";
    return `${prefix} ${raw.replace(/\n/g, "\n  ")}`;
  }).filter(Boolean).join("\n");
}
function blockNodeToMd(node) {
  var _a, _b;
  if (!node) return "";
  if (typeof node === "string") return normalizeString(node);
  if (Array.isArray(node)) return node.map((item) => blockNodeToMd(item)).filter(Boolean).join("\n\n");
  const type = normalizeString(node.type).toLowerCase();
  const children = childNodes(node);
  const text = inlineNodeToMd(children.length ? children : node).trim();
  if (type === "doc") {
    return children.map((item) => blockNodeToMd(item)).filter(Boolean).join("\n\n");
  }
  if (type === "heading") {
    const level = Number(node.level || ((_a = node == null ? void 0 : node.attrs) == null ? void 0 : _a.level) || 2);
    const safe = Number.isFinite(level) ? Math.min(6, Math.max(1, level)) : 2;
    return `${"#".repeat(safe)} ${text}`.trim();
  }
  if (type === "paragraph") return text;
  if (type === "quote" || type === "blockquote") return text ? `> ${text.replace(/\n/g, "\n> ")}` : "";
  if (type === "list" || type === "orderedlist" || type === "bulletlist") {
    const ordered = type === "orderedlist" || normalizeString(node.format).toLowerCase() === "ordered" || normalizeString((_b = node == null ? void 0 : node.attrs) == null ? void 0 : _b.listType).toLowerCase() === "ordered";
    return blockListToMd(children, ordered);
  }
  if (type === "list-item" || type === "listitem") {
    if (children.length) {
      return children.map((item) => blockNodeToMd(item)).filter(Boolean).join("\n").trim();
    }
    return text;
  }
  if (type === "code" || type === "codeblock" || type === "code_block") {
    const lang = normalizeString(node.language);
    return `\`\`\`${lang}
${text || inlineNodeToMd(children).trim()}
\`\`\``;
  }
  if (type === "horizontalrule" || type === "thematicbreak") {
    return "---";
  }
  if (text) return text;
  const blocks = asRecord(node).blocks;
  if (Array.isArray(blocks)) return blocks.map((item) => blockNodeToMd(item)).filter(Boolean).join("\n\n");
  return "";
}
function toMarkdown(value) {
  const plain = normalizeString(value);
  if (plain) return plain;
  if (Array.isArray(value)) {
    return value.map((item) => blockNodeToMd(item)).filter(Boolean).join("\n\n").trim();
  }
  if (!value || typeof value !== "object") return "";
  const obj = asRecord(value);
  const isRichTextNode = typeof obj.type === "string" || Array.isArray(obj.content) || Array.isArray(obj.children);
  if (isRichTextNode) {
    const md = blockNodeToMd(obj).trim();
    if (md) return md;
  }
  const directKeys = [
    "content",
    "blocks",
    "children",
    "body",
    "markdown",
    "text"
  ];
  for (const key of directKeys) {
    const md = toMarkdown(obj[key]);
    if (md) return md;
  }
  return blockNodeToMd(obj).trim();
}
function pickTitle(entry) {
  const titleKeys = ["title", "name", "heading", "Heading", "label"];
  for (const key of titleKeys) {
    const value = normalizeString(entry[key]);
    if (value) return value;
  }
  return "Alliance Network";
}
function pickContent(entry) {
  return toMarkdown(entry.content);
}
const landing_get = defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const singleType = String(config.landingSingleType || "landing-page");
  const response = await strapiFetch(`/${singleType}`, { populate: "*" });
  const raw = withAttributes((response == null ? void 0 : response.data) || null);
  if (!raw || Object.keys(raw).length === 0) return null;
  return {
    ...raw,
    title: pickTitle(raw),
    content: pickContent(raw)
  };
});

export { landing_get as default };
//# sourceMappingURL=landing.get.mjs.map
