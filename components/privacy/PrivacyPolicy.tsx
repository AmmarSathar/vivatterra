'use client';

import { type ReactNode } from 'react';
import { useI18n, type Lang, type MessageKey } from '@/lib/i18n';
import { PRIVACY } from '@/lib/privacy';

type Block =
  | { p: MessageKey }
  | { ul: MessageKey[] }
  | { person: true };

const SECTIONS: { id: string; h: MessageKey; blocks: Block[] }[] = [
  {
    id: 'who',
    h: 'privacy.who.h',
    blocks: [{ p: 'privacy.who.p1' }, { p: 'privacy.who.p2' }],
  },
  {
    id: 'collect',
    h: 'privacy.collect.h',
    blocks: [
      { p: 'privacy.collect.p1' },
      { ul: ['privacy.collect.li1', 'privacy.collect.li2', 'privacy.collect.li3', 'privacy.collect.li4'] },
      { p: 'privacy.collect.p2' },
      { p: 'privacy.collect.p3' },
      { p: 'privacy.collect.p4' },
      { p: 'privacy.collect.p5' },
    ],
  },
  {
    id: 'why',
    h: 'privacy.why.h',
    blocks: [
      { p: 'privacy.why.p1' },
      { ul: ['privacy.why.li1', 'privacy.why.li2', 'privacy.why.li3', 'privacy.why.li4'] },
      { p: 'privacy.why.p2' },
    ],
  },
  {
    id: 'consent',
    h: 'privacy.consent.h',
    blocks: [{ p: 'privacy.consent.p1' }, { p: 'privacy.consent.p2' }],
  },
  {
    id: 'use',
    h: 'privacy.use.h',
    blocks: [{ p: 'privacy.use.p1' }, { p: 'privacy.use.p2' }, { p: 'privacy.use.p3' }],
  },
  {
    id: 'providers',
    h: 'privacy.providers.h',
    blocks: [{ p: 'privacy.providers.p1' }, { p: 'privacy.providers.p2' }, { p: 'privacy.providers.p3' }],
  },
  {
    id: 'retention',
    h: 'privacy.retention.h',
    blocks: [{ p: 'privacy.retention.p1' }, { p: 'privacy.retention.p2' }],
  },
  { id: 'security', h: 'privacy.security.h', blocks: [{ p: 'privacy.security.p1' }] },
  { id: 'rights', h: 'privacy.rights.h', blocks: [{ p: 'privacy.rights.p1' }] },
  {
    id: 'person',
    h: 'privacy.person.h',
    blocks: [{ p: 'privacy.person.p1' }, { person: true }],
  },
  {
    id: 'questions',
    h: 'privacy.questions.h',
    blocks: [{ p: 'privacy.questions.p1' }, { p: 'privacy.questions.p2' }],
  },
  { id: 'changes', h: 'privacy.changes.h', blocks: [{ p: 'privacy.changes.p1' }] },
];

export default function PrivacyPolicy() {
  const { lang, t, rich } = useI18n();

  // A configured value, or a highlighted placeholder when it is still unknown.
  const ph = (text: string) => `<ph>${text}</ph>`;
  const plain = (v: string, phKey: MessageKey) => (v.trim() ? v.trim() : ph(t(phKey)));
  const localized = (v: Partial<Record<Lang, string>>, phKey: MessageKey) =>
    (v[lang] ?? '').trim() || ph(t(phKey));

  const dateText = PRIVACY.lastUpdated
    ? new Date(`${PRIVACY.lastUpdated}T12:00:00`).toLocaleDateString(
        lang === 'fr' ? 'fr-CA' : lang === 'es' ? 'es-419' : 'en-CA',
        { year: 'numeric', month: 'long', day: 'numeric' }
      )
    : ph(t('privacy.ph.date'));

  const vars = {
    legalName: plain(PRIVACY.legalName, 'privacy.ph.legalName'),
    hosting: localized(PRIVACY.hosting, 'privacy.ph.hosting'),
    storage: localized(PRIVACY.storage, 'privacy.ph.storage'),
    outside: localized(PRIVACY.outsideQuebec, 'privacy.ph.outside'),
    retention: localized(PRIVACY.retention, 'privacy.ph.retention'),
    date: dateText,
  };

  const hasPlaceholders =
    !PRIVACY.legalName.trim() ||
    !PRIVACY.responsibleName.trim() ||
    !PRIVACY.responsibleTitle.trim() ||
    !PRIVACY.contactEmail.trim() ||
    !PRIVACY.lastUpdated.trim() ||
    !(PRIVACY.hosting[lang] ?? '').trim() ||
    !(PRIVACY.storage[lang] ?? '').trim() ||
    !(PRIVACY.outsideQuebec[lang] ?? '').trim() ||
    !(PRIVACY.retention[lang] ?? '').trim();

  const personRow = (labelKey: MessageKey, value: string, phKey: MessageKey, isEmail = false): ReactNode => (
    <>
      <dt>{t(labelKey)}</dt>
      <dd>
        {value.trim() ? (
          isEmail ? <a href={`mailto:${value.trim()}`}>{value.trim()}</a> : value.trim()
        ) : (
          <mark className="privacy-ph">{t(phKey)}</mark>
        )}
      </dd>
    </>
  );

  return (
    <div className="wa-page privacy-page">
      <div className="wa-inner privacy-inner">
        <header>
          <div className="wa-eyebrow">{t('privacy.eyebrow')}</div>
          <h1 className="wa-title">{t('privacy.title')}</h1>
          <p className="privacy-updated">{rich('privacy.updated', vars)}</p>
          {hasPlaceholders && <p className="privacy-draft">{t('privacy.draft')}</p>}
          <p className="wa-body" style={{ marginTop: 24 }}>{rich('privacy.intro')}</p>
        </header>

        {SECTIONS.map((s) => (
          <section key={s.id} className="privacy-section" aria-labelledby={`privacy-${s.id}`}>
            <h2 className="wa-h3" id={`privacy-${s.id}`}>{t(s.h)}</h2>
            {s.blocks.map((b, i) => {
              if ('p' in b) return <p key={i} className="wa-body">{rich(b.p, vars)}</p>;
              if ('ul' in b)
                return (
                  <ul key={i} className="privacy-list">
                    {b.ul.map((k) => <li key={k}>{t(k)}</li>)}
                  </ul>
                );
              return (
                <dl key={i} className="privacy-person">
                  {personRow('privacy.person.name', PRIVACY.responsibleName, 'privacy.ph.responsibleName')}
                  {personRow('privacy.person.title', PRIVACY.responsibleTitle, 'privacy.ph.responsibleTitle')}
                  {personRow('privacy.person.email', PRIVACY.contactEmail, 'privacy.ph.contactEmail', true)}
                </dl>
              );
            })}
          </section>
        ))}
      </div>
    </div>
  );
}
