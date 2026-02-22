import { getCookie, getRequestURL, sendRedirect } from 'h3';

function isPublicPath(pathname: string) {
  if (pathname === '/access') return true;
  if (pathname.startsWith('/api/access')) return true;
  if (pathname.startsWith('/_nuxt')) return true;
  if (pathname.startsWith('/__nuxt')) return true;
  if (pathname.startsWith('/@vite')) return true;
  if (pathname.startsWith('/@id')) return true;
  if (pathname === '/__vite_ping') return true;
  if (pathname === '/favicon.ico') return true;
  if (pathname === '/robots.txt') return true;
  if (pathname === '/site.webmanifest') return true;
  if (pathname === '/manifest.webmanifest') return true;
  if (pathname.startsWith('/assets/')) return true;
  return false;
}

function isEnabled(value: unknown) {
  const raw = String(value || '').trim().toLowerCase();
  return raw === '1' || raw === 'true' || raw === 'yes' || raw === 'on';
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);
  const protectionEnabled = isEnabled(config.protectedAccess);
  const url = getRequestURL(event);
  const path = url.pathname;
  const accessGranted = getCookie(event, 'van_access') === '1';

  if (!protectionEnabled) {
    if (path === '/access') {
      return sendRedirect(event, '/', 302);
    }
    return;
  }

  if (isPublicPath(path)) {
    if (path === '/access' && accessGranted) {
      const redirect = String(url.searchParams.get('redirect') || '/');
      const target = redirect.startsWith('/') && !redirect.startsWith('/access') ? redirect : '/';
      return sendRedirect(event, target, 302);
    }
    return;
  }

  if (accessGranted) return;

  // Avoid redirecting API calls; return 401 for gated APIs.
  if (path.startsWith('/api/')) {
    throw createError({ statusCode: 401, statusMessage: 'Access denied' });
  }

  const requested = `${url.pathname}${url.search || ''}`;
  return sendRedirect(event, `/access?redirect=${encodeURIComponent(requested)}`, 302);
});
