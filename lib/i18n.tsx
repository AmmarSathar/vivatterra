'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import es from '@/locales/es.json';

export type Lang = 'en' | 'fr' | 'es';
export const LANGS: Lang[] = ['en', 'fr', 'es'];
export type MessageKey = keyof typeof en;

const STORAGE_KEY = 'vt-lang';
const MESSAGES: Record<Lang, Record<string, string>> = { en, fr, es };

type Vars = Record<string, string | number>;

interface I18nValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Plain-text translation (attributes, aria labels, placeholders, titles). */
  t: (key: MessageKey, vars?: Vars) => string;
  /** Translation with inline <b>, <i>, <fig>, <hl> markup rendered as elements. */
  rich: (key: MessageKey, vars?: Vars) => ReactNode;
}

const I18nContext = createContext<I18nValue | null>(null);

function interpolate(str: string, vars?: Vars) {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

const TAG_RE = /<(b|i|fig|hl|ph)>([\s\S]*?)<\/\1>/g;

function renderRich(str: string): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  let n = 0;
  for (const m of str.matchAll(TAG_RE)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(str.slice(last, idx));
    const inner = m[2];
    const key = `r${n++}`;
    if (m[1] === 'b') out.push(<strong key={key}>{inner}</strong>);
    else if (m[1] === 'i') out.push(<em key={key}>{inner}</em>);
    else if (m[1] === 'fig') out.push(<strong key={key} className="wa-fig">{inner}</strong>);
    else if (m[1] === 'ph') out.push(<mark key={key} className="privacy-ph">{inner}</mark>);
    else out.push(<span key={key} className="wa-em">{inner}</span>);
    last = idx + m[0].length;
  }
  if (last < str.length) out.push(str.slice(last));
  return out.length === 1 && typeof out[0] === 'string' ? out[0] : <>{out}</>;
}

function routeMetaKey(pathname: string): 'home' | 'about' | 'contact' | 'carmen' | 'privacy' | null {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/carmen-pecha')) return 'carmen';
  if (pathname.startsWith('/privacy')) return 'privacy';
  return null;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start in English so server and first client render match; the
  // visitor's saved choice is applied right after mount.
  const [lang, setLangState] = useState<Lang>('en');
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'fr' || saved === 'es' || saved === 'en') setLangState(saved);
    } catch {
      /* storage unavailable: stay on English */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  // Keep <html lang>, the document title and the meta description in sync.
  useEffect(() => {
    document.documentElement.lang = lang;
    const key = routeMetaKey(pathname);
    if (!key) return;
    const msgs = MESSAGES[lang];
    const apply = () => {
      document.title = msgs[`meta.${key}.title`];
      const desc = msgs[`meta.${key}.description`];
      let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = 'description';
        document.head.appendChild(tag);
      }
      tag.content = desc;
    };
    apply();
    // Next.js writes its own (English) metadata after a client navigation;
    // re-apply once that has settled.
    const timer = window.setTimeout(apply, 120);
    return () => window.clearTimeout(timer);
  }, [lang, pathname]);

  const value = useMemo<I18nValue>(() => {
    const msgs = MESSAGES[lang];
    const t = (key: MessageKey, vars?: Vars) => interpolate(msgs[key] ?? en[key], vars);
    return { lang, setLang, t, rich: (key, vars) => renderRich(t(key, vars)) };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}
