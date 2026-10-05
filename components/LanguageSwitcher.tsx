'use client';

import { LANGS, useI18n } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="lang-switch" role="group" aria-label={t('nav.languageAria')}>
      {LANGS.map((l, i) => (
        <span key={l} className="lang-switch-item">
          {i > 0 && <span className="lang-switch-sep" aria-hidden="true">/</span>}
          <button
            type="button"
            className="lang-switch-btn"
            lang={l}
            aria-label={t(`nav.language.${l}` as 'nav.language.en')}
            aria-pressed={lang === l}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
