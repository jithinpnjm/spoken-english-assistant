import React, {useEffect, useState, type ReactNode} from 'react';
import Footer from '@theme-original/DocItem/Footer';
import type FooterType from '@theme/DocItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {usePracticeApiBase} from '../../../lib/practice/api';
import {fetchProgress, sendProgress} from '../../../lib/progressApi';

type Props = WrapperProps<typeof FooterType>;

function ProgressButton({path}: {path: string}) {
  const apiBase = usePracticeApiBase();
  const [signedIn, setSignedIn] = useState(false);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const progress = await fetchProgress(apiBase);
      if (cancelled || !progress) return;
      setSignedIn(true);
      setDone(Boolean(progress.done[path]));
      void sendProgress(apiBase, path, 'visit');
    })();
    return () => {
      cancelled = true;
    };
  }, [apiBase, path]);

  if (!signedIn) return null;

  const toggle = async () => {
    setBusy(true);
    const next = await sendProgress(apiBase, path, done ? 'undone' : 'done');
    if (next) setDone(Boolean(next.done[path]));
    setBusy(false);
  };

  return (
    <div style={{margin: '1.5rem 0', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap'}}>
      <button className={done ? 'button button--success' : 'button button--primary'} onClick={toggle} disabled={busy}>
        {done ? 'Done - click to undo' : 'Mark this lesson as done'}
      </button>
      <a href="/progress">See my progress</a>
    </div>
  );
}

export default function FooterWrapper(props: Props): ReactNode {
  const {metadata} = useDoc();
  return (
    <>
      <ProgressButton path={metadata.permalink.replace(/\/$/, '')} />
      <Footer {...props} />
    </>
  );
}
