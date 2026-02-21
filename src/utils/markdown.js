function escapeHtml(input) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function sanitizeHref(rawHref) {
  const href = rawHref.trim();
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith('/')) return href;
  return '#';
}

function sanitizeImageSrc(rawSrc) {
  const src = rawSrc.trim();
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith('/')) return src;
  // Handle shorthand like !26-4209x2769.jpg from Strapi uploads
  return `/uploads/${src}`;
}

function parseInline(line) {
  let out = line;

  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    const safeSrc = sanitizeImageSrc(src);
    if (!safeSrc) return '';
    return `<img src="${safeSrc}" alt="${alt}" loading="lazy" />`;
  });
  out = out.replace(/(^|\s)!([A-Za-z0-9._/-]+\.(?:png|jpg|jpeg|gif|webp|svg))/gi, (_, prefix, src) => {
    const safeSrc = sanitizeImageSrc(src);
    if (!safeSrc) return prefix;
    return `${prefix}<img src="${safeSrc}" alt="" loading="lazy" />`;
  });
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => {
    return `<a href="${sanitizeHref(href)}" target="_blank" rel="noreferrer">${text}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');

  return out;
}

export function renderMarkdown(markdown) {
  if (!markdown || typeof markdown !== 'string') return '';

  const lines = escapeHtml(markdown).split(/\r?\n/);
  const parts = [];
  let inList = false;

  const closeList = () => {
    if (inList) {
      parts.push('</ul>');
      inList = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length;
      parts.push(`<h${level}>${parseInline(heading[2])}</h${level}>`);
      continue;
    }

    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      if (!inList) {
        parts.push('<ul>');
        inList = true;
      }
      parts.push(`<li>${parseInline(bullet[1])}</li>`);
      continue;
    }

    closeList();
    parts.push(`<p>${parseInline(line)}</p>`);
  }

  closeList();
  return parts.join('\n');
}
