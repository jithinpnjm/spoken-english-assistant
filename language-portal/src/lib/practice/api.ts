import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const ACCESS_CODE_KEY = 'languagePortal.practiceAccessCode';

/** API origin. Empty string = same origin (production). Set PRACTICE_API_BASE at build/start time for local dev. */
export function usePracticeApiBase(): string {
  const {siteConfig} = useDocusaurusContext();
  const base = siteConfig.customFields?.practiceApiBase;
  return typeof base === 'string' ? base.replace(/\/$/, '') : '';
}

export function readAccessCode(): string {
  try {
    return window.localStorage.getItem(ACCESS_CODE_KEY) || '';
  } catch {
    return '';
  }
}

export function saveAccessCode(code: string) {
  try {
    if (code) window.localStorage.setItem(ACCESS_CODE_KEY, code);
    else window.localStorage.removeItem(ACCESS_CODE_KEY);
  } catch {
    // Storage can be unavailable (private mode); the code then lasts for this page view only.
  }
}

export class PracticeApiError extends Error {
  constructor(message: string, readonly status: number, readonly accessCodeRequired = false) {
    super(message);
  }
}

export async function postJson<T>(apiBase: string, path: string, body: unknown, accessCode: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${apiBase}${path}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', ...(accessCode ? {'X-Practice-Code': accessCode} : {})},
      body: JSON.stringify(body),
    });
  } catch {
    throw new PracticeApiError('Could not reach the practice server. Check your connection and try again.', 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      res.status === 404
        ? 'The practice server is not running here (this page may be served as a static site only).'
        : data?.error || `Request failed (${res.status}).`;
    throw new PracticeApiError(message, res.status, Boolean(data?.accessCodeRequired));
  }
  return data as T;
}

export function bridgeWebSocketUrl(apiBase: string, path: string, accessCode: string): string {
  const origin = apiBase || window.location.origin;
  const url = new URL(path, origin.replace(/^http/, 'ws'));
  if (accessCode) url.searchParams.set('code', accessCode);
  return url.toString();
}
