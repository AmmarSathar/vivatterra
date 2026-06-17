'use client';

import { useEffect, useState } from 'react';

// Keep the loader up long enough for the fill to read, even on a fast load.
const MIN_VISIBLE_MS = 1500;
// Hard ceiling so a stalled `load` event can never trap the user behind it.
const MAX_VISIBLE_MS = 6000;
// Matches the .site-loader fade-out transition in CSS.
const FADE_MS = 550;

export default function SiteLoader() {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const started = performance.now();
    document.body.classList.add('is-loading');

    let fadeTimer: number;
    const removeTimer = window.setTimeout(() => finish(), MAX_VISIBLE_MS);

    function finish() {
      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        setLeaving(true);
        document.body.classList.remove('is-loading');
        fadeTimer = window.setTimeout(() => setDone(true), FADE_MS);
      }, wait);
    }

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      window.removeEventListener('load', finish);
      window.clearTimeout(removeTimer);
      window.clearTimeout(fadeTimer);
      document.body.classList.remove('is-loading');
    };
  }, []);

  if (done) return null;

  return (
    <div
      className={`site-loader${leaving ? ' is-leaving' : ''}`}
      role="status"
      aria-label="Loading"
    >
      <div className="site-loader-logo" aria-hidden="true">
        <span className="site-loader-fill" />
      </div>
    </div>
  );
}
