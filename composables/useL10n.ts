import en from './l10n/en';
import fr from './l10n/fr';

export type Locale = 'en' | 'fr';
export type MessageDict = Record<string, string>;

const messages: Record<Locale, MessageDict> = {
  en,
  fr,
};

export function useL10n() {
  const locale = useState<Locale>('locale', () => 'en');

  function t(key: string, params: Record<string, string | number> = {}) {
    const dict = messages[locale.value] || messages.en;
    let value = dict[key] || messages.en[key] || key;
    for (const [k, v] of Object.entries(params)) {
      value = value.replaceAll(`{${k}}`, String(v));
    }
    return value;
  }

  return { locale, t };
}
