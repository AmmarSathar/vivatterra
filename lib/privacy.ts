import type { Lang } from '@/lib/i18n';

/**
 * Owner-editable facts for the Privacy Policy (/privacy).
 *
 * Every field starts empty. While a field is empty, the policy shows a clearly
 * highlighted "[CONFIRM ...]" placeholder in that spot; once it is filled in,
 * the placeholder is replaced automatically in all three languages. When every
 * field is filled, the "Draft" notice on the page disappears.
 *
 * Plain values (name, title, email, ISO date) are shared by all languages.
 * Sentence-length values are per language: { en: '...', fr: '...', es: '...' }.
 */
type Localized = Partial<Record<Lang, string>>;

export const PRIVACY: {
  legalName: string;
  responsibleName: string;
  responsibleTitle: string;
  contactEmail: string;
  /** ISO date, e.g. '2026-10-05'. Formatted per language on the page. */
  lastUpdated: string;
  /** Hosting provider and whether it keeps server logs. */
  hosting: Localized;
  /** Where Contact form submissions are sent and stored (mailbox provider, copies kept by Resend). */
  storage: Localized;
  /** Whether personal information is processed or stored outside Québec. */
  outsideQuebec: Localized;
  /** Retention period for Contact form messages. */
  retention: Localized;
} = {
  legalName: '',
  responsibleName: '',
  responsibleTitle: '',
  contactEmail: '',
  lastUpdated: '',
  hosting: {},
  storage: {},
  outsideQuebec: {},
  retention: {},
};
