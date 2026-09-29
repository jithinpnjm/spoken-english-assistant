import React, {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useAllDocsData} from '@docusaurus/plugin-content-docs/client';
import {usePracticeApiBase} from '../lib/practice/api';
import {displayName, fetchProgress, signOut, type Progress} from '../lib/progressApi';

const norm = (p: string) => p.replace(/\/$/, '');

function groupLabel(key: string) {
  return key
    .replace(/^\/docs\//, '')
    .split('/')
    .map((part) => part.replace(/^vol(\d+)-/, 'Vol $1 · ').replace(/-/g, ' '))
    .join(' / ');
}

export default function ProgressPage(): React.JSX.Element {
  const apiBase = usePracticeApiBase();
  const docsData = useAllDocsData();
  const [progress, setProgress] = useState<Progress | null | undefined>(undefined);

  useEffect(() => {
    void fetchProgress(apiBase).then(setProgress);
  }, [apiBase]);

  const groups = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const plugin of Object.values(docsData)) {
      for (const version of plugin.versions) {
        for (const doc of version.docs) {
          const path = norm(doc.path);
          const parts = path.split('/'); // ['', 'docs', 'german', 'a1', 'vol3-grammar', 'x']
          if (parts.length < 6) continue;
          const key = parts.slice(0, 5).join('/');
          map.set(key, [...(map.get(key) || []), path]);
        }
      }
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [docsData]);

  const lastVisited = useMemo(() => {
    if (!progress) return null;
    const entries = Object.entries(progress.visited).sort(([, a], [, b]) => b.localeCompare(a));
    return entries[0]?.[0] ?? null;
  }, [progress]);

  return (
    <Layout title="My progress" description="Your personal study progress">
      <main className="container margin-vert--lg" style={{maxWidth: 900}}>
        {progress === undefined && <p>Loading...</p>}
        {progress === null && <p>Progress is only available when you are signed in.</p>}
        {progress && (
          <>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
              <h1 style={{margin: 0}}>{displayName(progress.user)}'s progress</h1>
              <button className="button button--secondary" onClick={() => signOut(apiBase)}>
                Sign out
              </button>
            </div>
            <p>
              {Object.keys(progress.done).length} lessons finished · {Object.keys(progress.visited).length} opened.{' '}
              {lastVisited && <Link to={lastVisited}>Continue where you left off</Link>}
            </p>
            {groups.map(([key, paths]) => {
              const finished = paths.filter((p) => progress.done[p]).length;
              const pct = Math.round((finished / paths.length) * 100);
              return (
                <section key={key} style={{margin: '1.25rem 0'}}>
                  <strong>{groupLabel(key)}</strong> — {finished}/{paths.length}
                  <div style={{height: 8, borderRadius: 4, background: 'var(--ifm-color-emphasis-200)', marginTop: 4}}>
                    <div style={{width: `${pct}%`, height: 8, borderRadius: 4, background: 'var(--ifm-color-success)'}} />
                  </div>
                </section>
              );
            })}
          </>
        )}
      </main>
    </Layout>
  );
}
