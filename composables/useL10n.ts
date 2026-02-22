export type Locale = 'en' | 'fr';

type MessageDict = Record<string, string>;

const messages: Record<Locale, MessageDict> = {
  en: {
    'nav.program': 'Program',
    'nav.vanFinder': 'VAN Finder',
    'nav.solutions': 'Solutions',
    'common.theme': 'Theme',
    'common.locale': 'Language',
    'common.all': 'All',
    'common.search': 'Search',
    'common.clear': 'Clear',
    'finder.title': 'VAN Finder',
    'finder.includeNonMembers': 'Include non VAN members',
    'finder.searchPlaceholder': 'Type a member or solution name',
    'finder.resultsCount': '{count} match your search',
    'finder.perPage': 'Per page',
    'finder.pageStatus': 'Page {page} of {totalPages}',
    'finder.previous': 'Previous',
    'finder.next': 'Next',
    'finder.noResults': 'No matching vendor or solution found.',
    'finder.resourceSolutions': 'Solutions',
    'finder.resourceBriefs': 'Solution briefs',
    'finder.resourceGuides': 'Solution guides',
    'finder.resourceKb': 'Knowledge base articles',
    'finder.tierRegular': 'VAN member',
    'finder.tierStrategic': 'Strategic',
  },
  fr: {
    'nav.program': 'Programme',
    'nav.vanFinder': 'Recherche VAN',
    'nav.solutions': 'Solutions',
    'common.theme': 'Theme',
    'common.locale': 'Langue',
    'common.all': 'Tous',
    'common.search': 'Rechercher',
    'common.clear': 'Effacer',
    'finder.title': 'Recherche VAN',
    'finder.includeNonMembers': 'Inclure les non-membres VAN',
    'finder.searchPlaceholder': 'Saisissez un nom de membre ou de solution',
    'finder.resultsCount': '{count} resultat(s)',
    'finder.perPage': 'Par page',
    'finder.pageStatus': 'Page {page} sur {totalPages}',
    'finder.previous': 'Precedent',
    'finder.next': 'Suivant',
    'finder.noResults': 'Aucun fournisseur ou solution correspondant.',
    'finder.resourceSolutions': 'Solutions',
    'finder.resourceBriefs': 'Briefs de solution',
    'finder.resourceGuides': 'Guides de solution',
    'finder.resourceKb': 'Articles base de connaissances',
    'finder.tierRegular': 'Membre VAN',
    'finder.tierStrategic': 'Strategique',
  },
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
