<template>
  <VanFinderControls
    :query="query"
    :selected-focuses="selectedFocuses"
    :focus-options="focusOptions"
    @update:query="query = $event"
    @clear-query="clearQuery"
    @select-all-focuses="selectAllFocuses"
    @toggle-focus="toggleFocus"
  />

  <LoadingState v-if="loading" />
  <ErrorState v-else-if="error" :message="error" />

  <section v-else class="space-y-4">
    <div class="flex items-center justify-between gap-3">
      <h2 class="text-3xl font-bold text-base-content">
        {{ t('finder.resultsCount', { count: filteredVendors.length }) }}
      </h2>
      <label class="label cursor-pointer gap-2">
        <span class="label-text">Include non VAN members</span>
        <input v-model="includeNonMembers" type="checkbox" class="toggle toggle-sm" />
      </label>
    </div>

    <section
      v-if="filteredVendors.length"
      class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
    >
      <VanFinderVendorCard
        v-for="vendor in filteredVendors"
        :key="vendorKey(vendor)"
        :vendor="vendor"
        :tier-badge="tierBadge(vendor)"
        :description="previewDescription(vendor)"
        :resources="visibleResources(vendor)"
      />
    </section>

    <SurfacePanel v-else>
      <p>{{ t('finder.noResults') }}</p>
    </SurfacePanel>
  </section>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    BeakerIcon,
    MapIcon,
    PuzzlePieceIcon,
    WrenchScrewdriverIcon,
  } from '@heroicons/vue/24/outline';
  import VanFinderControls from '../components/VanFinderControls.vue';
  import VanFinderVendorCard from '../components/VanFinderVendorCard.vue';
  import SurfacePanel from '../components/SurfacePanel.vue';
  import LoadingState from '../components/LoadingState.vue';
  import ErrorState from '../components/ErrorState.vue';
  import {
    getKnowledgeArticles,
    getSolutionBriefs,
    getSolutionGuides,
    getSolutions,
    getVendors,
  } from '../services/contentService';

  const { t } = useI18n();
  const loading = ref(true);
  const error = ref('');
  const vendors = ref([]);
  const query = ref('');
  const selectedFocuses = ref([]);
  const includeNonMembers = ref(false);
  const resourceCounts = ref({});

  const RESOURCE_META = {
    solutions: {
      icon: PuzzlePieceIcon,
    },
    briefs: {
      icon: BeakerIcon,
    },
    guides: {
      icon: MapIcon,
    },
    kb: {
      icon: WrenchScrewdriverIcon,
    },
  };

  function vendorKey(vendor) {
    return vendor.documentId || vendor.id || vendor.slug;
  }

  function isActiveVendor(vendor) {
    return Boolean(vendor.isVanMember);
  }

  function membershipPriority(vendor) {
    const tier = String(vendor.vanTier || '')
      .trim()
      .toLowerCase();
    if (tier === 'strategic' || tier === 'startegic') return 0;
    if (tier === 'regular') return 1;
    return 2;
  }

  function words(input) {
    return String(input || '')
      .toLowerCase()
      .split(/\s+/)
      .map((w) => w.trim())
      .filter(Boolean);
  }

  function levenshtein(a, b) {
    const s = String(a || '');
    const tStr = String(b || '');
    if (!s) return tStr.length;
    if (!tStr) return s.length;

    const rows = s.length + 1;
    const cols = tStr.length + 1;
    const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));

    for (let i = 0; i < rows; i += 1) dp[i][0] = i;
    for (let j = 0; j < cols; j += 1) dp[0][j] = j;

    for (let i = 1; i < rows; i += 1) {
      for (let j = 1; j < cols; j += 1) {
        const cost = s[i - 1] === tStr[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }

    return dp[rows - 1][cols - 1];
  }

  function fuzzyNameMatch(name, searchText) {
    if (!searchText) return true;

    const n = String(name || '').toLowerCase();
    const q = String(searchText || '').toLowerCase();
    if (!n) return false;
    if (n.includes(q)) return true;

    const qWords = words(q);
    const nWords = words(n);

    if (qWords.length && qWords.every((word) => n.includes(word))) return true;

    return qWords.every((qWord) =>
      nWords.some((nWord) => {
        if (nWord.includes(qWord) || qWord.includes(nWord)) return true;
        return levenshtein(nWord, qWord) <= 2;
      })
    );
  }

  function tierBadge(vendor) {
    const tier = String(vendor.vanTier || '').toLowerCase();
    if (tier === 'regular') return t('finder.tierRegular');
    if (tier === 'startegic' || tier === 'strategic') return t('finder.tierStrategic');
    return '';
  }

  function fullDescription(vendor) {
    return (
      vendor.shortDescription || vendor.description || vendor.summary || 'No description available.'
    );
  }

  function markdownToPreviewText(value) {
    const input = String(value || '');
    return input
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '$1')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/[*_`>#-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function previewDescription(vendor) {
    return markdownToPreviewText(fullDescription(vendor));
  }

  function solutionSearchTexts(solution) {
    const raw = solution?.raw || solution || {};
    return [
      solution?.name,
      solution?.title,
      solution?.slug,
      solution?.shortDescription,
      solution?.summary,
      solution?.description,
      raw.name,
      raw.title,
      raw.slug,
      raw.short_description,
      raw.summary,
      raw.description,
    ]
      .map((value) => markdownToPreviewText(value))
      .filter(Boolean);
  }

  function vendorSolutions(vendor) {
    return relationItems(vendor?.raw?.solutions || vendor?.solutions);
  }

  function vendorMatchesSearch(vendor, searchText) {
    if (!searchText) return true;

    const vendorTexts = [
      vendor?.name,
      vendor?.slug,
      ...(vendor?.areaOfFocus || []),
      vendor?.shortDescription,
      vendor?.summary,
      vendor?.description,
    ]
      .map((value) => markdownToPreviewText(value))
      .filter(Boolean);

    if (vendorTexts.some((text) => fuzzyNameMatch(text, searchText))) return true;

    for (const solution of vendorSolutions(vendor)) {
      const texts = solutionSearchTexts(solution);
      if (texts.some((text) => fuzzyNameMatch(text, searchText))) return true;
    }

    return false;
  }

  function vendorNameMatchesSearch(vendor, searchText) {
    if (!searchText) return true;
    const nameTexts = [vendor?.name, vendor?.slug]
      .map((value) => markdownToPreviewText(value))
      .filter(Boolean);
    return nameTexts.some((text) => fuzzyNameMatch(text, searchText));
  }

  function relationItems(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (Array.isArray(value.data)) return value.data;
    if (value.data && typeof value.data === 'object') return [value.data];
    if (typeof value === 'object') return [value];
    return [];
  }

  function candidateVendorKeysFromRelation(vendorRel) {
    const keys = [];
    if (!vendorRel || typeof vendorRel !== 'object') return keys;
    if (vendorRel.documentId) keys.push(`doc:${vendorRel.documentId}`);
    if (vendorRel.id) keys.push(`id:${vendorRel.id}`);
    if (vendorRel.slug) keys.push(`slug:${vendorRel.slug}`);
    return keys;
  }

  function buildVendorIndex(vendorList) {
    const index = new Map();
    for (const vendor of vendorList) {
      const key = vendorKey(vendor);
      if (vendor.documentId) index.set(`doc:${vendor.documentId}`, key);
      if (vendor.id) index.set(`id:${vendor.id}`, key);
      if (vendor.slug) index.set(`slug:${vendor.slug}`, key);
    }
    return index;
  }

  function resolveVendorKeyForSolution(solution, vendorIndex) {
    const vendorRel = solution?.raw?.vendor || solution?.vendor;
    const candidates = candidateVendorKeysFromRelation(vendorRel);
    for (const candidate of candidates) {
      if (vendorIndex.has(candidate)) return vendorIndex.get(candidate);
    }
    return null;
  }

  function solutionRefs(entry) {
    if (!entry || typeof entry !== 'object') return [];
    const refs = [];
    if (entry.documentId) refs.push(`doc:${entry.documentId}`);
    if (entry.id !== undefined && entry.id !== null) refs.push(`id:${entry.id}`);
    if (entry.slug) refs.push(`slug:${entry.slug}`);
    if (entry.name) refs.push(`name:${entry.name}`);
    if (entry.title) refs.push(`title:${entry.title}`);
    return refs;
  }

  function getRelatedSolutions(entity) {
    const raw = entity?.raw || entity || {};
    const candidates = [
      raw.solution,
      raw.solutions,
      raw.related_solution,
      raw.related_solutions,
      entity?.solution,
      entity?.solutions,
    ];

    for (const candidate of candidates) {
      const items = relationItems(candidate);
      if (items.length) return items;
    }

    return [];
  }

  function createEmptyCountMap(vendorList) {
    const map = {};
    for (const vendor of vendorList) {
      map[vendorKey(vendor)] = {
        solutions: 0,
        briefs: 0,
        guides: 0,
        kb: 0,
      };
    }
    return map;
  }

  function visibleResources(vendor) {
    const key = vendorKey(vendor);
    const counts = resourceCounts.value[key] || {};
    const values = [
      {
        key: 'solutions',
        count: Number(counts.solutions || 0),
        label: t('finder.resourceSolutions'),
      },
      { key: 'briefs', count: Number(counts.briefs || 0), label: t('finder.resourceBriefs') },
      { key: 'guides', count: Number(counts.guides || 0), label: t('finder.resourceGuides') },
      { key: 'kb', count: Number(counts.kb || 0), label: t('finder.resourceKb') },
    ];
    return values
      .filter((entry) => entry.count > 0)
      .map((entry) => ({ ...entry, icon: RESOURCE_META[entry.key]?.icon || '' }));
  }

  function clearQuery() {
    query.value = '';
  }

  function selectAllFocuses() {
    selectedFocuses.value = [];
  }

  function toggleFocus(focus) {
    if (selectedFocuses.value.includes(focus)) {
      selectedFocuses.value = selectedFocuses.value.filter((item) => item !== focus);
      return;
    }
    selectedFocuses.value = [...selectedFocuses.value, focus];
  }

  const searchableVendors = computed(() =>
    includeNonMembers.value ? vendors.value : vendors.value.filter(isActiveVendor)
  );

  const focusOptions = computed(() => {
    const set = new Set(
      searchableVendors.value.flatMap((vendor) =>
        Array.isArray(vendor.areaOfFocus) ? vendor.areaOfFocus : []
      )
    );
    return Array.from(set).sort((a, b) => String(a).localeCompare(String(b)));
  });

  const filteredVendors = computed(() => {
    const q = String(query.value || '').trim();
    const nameMatchedVendorKeys = new Set(
      q
        ? searchableVendors.value
            .filter((vendor) => vendorNameMatchesSearch(vendor, q))
            .map((vendor) => vendorKey(vendor))
        : []
    );
    const hasNameMatches = nameMatchedVendorKeys.size > 0;

    return searchableVendors.value
      .filter((vendor) => {
        const vendorFocuses = Array.isArray(vendor.areaOfFocus) ? vendor.areaOfFocus : [];
        const focusMatch =
          selectedFocuses.value.length === 0 ||
          selectedFocuses.value.some((focus) => vendorFocuses.includes(focus));
        const searchMatch = hasNameMatches
          ? nameMatchedVendorKeys.has(vendorKey(vendor))
          : vendorMatchesSearch(vendor, q);
        return focusMatch && searchMatch;
      })
      .sort((a, b) => {
        const p = membershipPriority(a) - membershipPriority(b);
        if (p !== 0) return p;
        return String(a.name || '').localeCompare(String(b.name || ''));
      });
  });

  onMounted(async () => {
    try {
      const [vendorList, allSolutions, allGuides, allBriefs, allKb] = await Promise.all([
        getVendors(),
        getSolutions(),
        getSolutionGuides(),
        getSolutionBriefs(),
        getKnowledgeArticles(),
      ]);

      vendors.value = vendorList;
      const countsByVendor = createEmptyCountMap(vendorList);
      const vendorIndex = buildVendorIndex(vendorList);

      const solutionOwner = new Map();
      for (const solution of allSolutions) {
        const ownerKey = resolveVendorKeyForSolution(solution, vendorIndex);
        if (!ownerKey || !countsByVendor[ownerKey]) continue;
        for (const ref of solutionRefs(solution)) {
          solutionOwner.set(ref, ownerKey);
        }
        countsByVendor[ownerKey].solutions += 1;
      }

      for (const guide of allGuides) {
        const owners = new Set();
        for (const relSolution of getRelatedSolutions(guide)) {
          for (const ref of solutionRefs(relSolution)) {
            const ownerKey = solutionOwner.get(ref);
            if (ownerKey) owners.add(ownerKey);
          }
        }
        for (const ownerKey of owners) {
          if (countsByVendor[ownerKey]) countsByVendor[ownerKey].guides += 1;
        }
      }

      for (const brief of allBriefs) {
        const owners = new Set();
        for (const relSolution of getRelatedSolutions(brief)) {
          for (const ref of solutionRefs(relSolution)) {
            const ownerKey = solutionOwner.get(ref);
            if (ownerKey) owners.add(ownerKey);
          }
        }
        for (const ownerKey of owners) {
          if (countsByVendor[ownerKey]) countsByVendor[ownerKey].briefs += 1;
        }
      }

      for (const kb of allKb) {
        const owners = new Set();
        for (const relSolution of getRelatedSolutions(kb)) {
          for (const ref of solutionRefs(relSolution)) {
            const ownerKey = solutionOwner.get(ref);
            if (ownerKey) owners.add(ownerKey);
          }
        }
        for (const ownerKey of owners) {
          if (countsByVendor[ownerKey]) countsByVendor[ownerKey].kb += 1;
        }
      }

      resourceCounts.value = countsByVendor;
    } catch (err) {
      error.value = err.message || 'Failed to fetch vendors.';
    } finally {
      loading.value = false;
    }
  });
</script>
