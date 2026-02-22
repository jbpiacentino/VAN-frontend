import { setCookie } from 'h3';

function isEnabled(value: unknown) {
  const raw = String(value || '').trim().toLowerCase();
  return raw === '1' || raw === 'true' || raw === 'yes' || raw === 'on';
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ password?: string }>(event);
  const input = String(body?.password || '');
  const config = useRuntimeConfig(event);
  const protectionEnabled = isEnabled(config.protectedAccess);
  const expected = String(config.protectedAccessPwd || '');

  if (!protectionEnabled) {
    return { ok: true, disabled: true };
  }

  if (!expected) {
    throw createError({ statusCode: 500, statusMessage: 'Missing PROTECTED_ACCESS_PWD' });
  }

  if (!input || input !== expected) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid password' });
  }

  setCookie(event, 'van_access', '1', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return { ok: true };
});
