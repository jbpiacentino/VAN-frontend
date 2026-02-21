const AUTHORIZED_VENDOR_TYPES = ['compute', 'network', 'storage', 'isv', 'csp', 'other'];

function capitalize(value) {
  return String(value || '')
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export default {
  nav: {
    program: 'Program',
    vanFinder: 'VAN Finder',
    solutions: 'Solutions',
  },
  common: {
    all: 'All',
    theme: 'Theme',
    locale: 'Language',
    allTypes: 'All types',
    search: 'Search',
    viewDetails: 'Open profile',
    type: 'Type',
    visibility: 'Visibility',
  },
  finder: {
    title: 'VAN Finder',
    subtitle: 'Find VAN members (vendors) by name and type.',
    searchPlaceholder: 'Type a company or solution name',
    noResults: 'No active members match your search/filter.',
    resultsCount: '{count} match your search',
    viewCards: 'Cards',
    viewList: 'List',
    reset: 'Reset',
    tierRegular: 'VAN member',
    tierStrategic: 'Strategic',
    resourceSolutions: 'Solutions',
    resourceBriefs: 'Solution briefs',
    resourceGuides: 'Solution guides',
    resourceKb: 'Knowledge base articles',
  },
  vendor: {
    // type: Object.fromEntries(AUTHORIZED_VENDOR_TYPES.map((value) => [value, capitalize(value)]))
    type: {
      compute: 'Compute',
      network: 'Network',
      storage: 'Storage',
      isv: 'ISV',
      csp: 'CSP',
      other: 'Other',
    },
  },
};
