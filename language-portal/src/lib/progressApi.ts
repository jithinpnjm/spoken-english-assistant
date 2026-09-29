export interface Progress {
  user: string;
  done: Record<string, string>;
  visited: Record<string, string>;
}

export type ProgressAction = 'visit' | 'done' | 'undone';

export async function fetchProgress(apiBase: string): Promise<Progress | null> {
  try {
    const res = await fetch(`${apiBase}/api/progress`, {credentials: 'include'});
    return res.ok ? ((await res.json()) as Progress) : null;
  } catch {
    return null;
  }
}

export async function sendProgress(apiBase: string, path: string, action: ProgressAction): Promise<Progress | null> {
  try {
    const res = await fetch(`${apiBase}/api/progress`, {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({path, action}),
    });
    return res.ok ? ((await res.json()) as Progress) : null;
  } catch {
    return null;
  }
}

export async function signOut(apiBase: string) {
  try {
    await fetch(`${apiBase}/auth/logout`, {method: 'POST', credentials: 'include'});
  } finally {
    window.location.href = '/';
  }
}

export function displayName(user: string) {
  return user ? user.charAt(0).toUpperCase() + user.slice(1) : '';
}
