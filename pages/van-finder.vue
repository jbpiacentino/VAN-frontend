<template>
  <VanFinderControls
    :query="query"
    :selected-focuses="selectedFocuses"
    :focus-options="focusOptions"
    @update:query="query = $event"
    @clear-query="clearQuery"
    @select-all-focuses="selectedFocuses = []"
    @toggle-focus="toggleFocus"
  />

  <section class="space-y-4">
    <div class="flex items-center justify-between gap-3">
      <!-- <h2 class="text-3xl font-bold text-base-content">{{ total }} match your search</h2> -->
      <label class="label cursor-pointer gap-2">
        <span class="label-text">{{ t('finder.includeNonMembers') }}</span>
        <input v-model="includeNonMembers" type="checkbox" class="toggle toggle-sm" />
      </label>
    </div>

    <LoadingState v-if="pending" />
    <ErrorState v-else-if="error" :message="error.message" />

    <section v-else-if="items.length" class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <VanFinderVendorCard
        v-for="vendor in items"
        :key="vendor.documentId || vendor.id || vendor.slug"
        :vendor="vendor"
        :tier-badge="tierBadge(vendor)"
        :description="vendor.descriptionPreview"
        :resources="visibleResources(vendor)"
      />
    </section>

    <SurfacePanel v-else>
      <p>{{ t('finder.noResults') }}</p>
    </SurfacePanel>
  </section>
</template>

<script setup lang="ts">
  import {
    BeakerIcon,
    MapIcon,
    PuzzlePieceIcon,
    WrenchScrewdriverIcon,
  } from '@heroicons/vue/24/outline';
  const { t } = useL10n();

  const query = ref('');
  const selectedFocuses = ref<string[]>([]);
  const includeNonMembers = ref(false);
  const debouncedQuery = ref('');

  let timer: ReturnType<typeof setTimeout> | null = null;
  watch(query, (next) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      debouncedQuery.value = next;
    }, 180);
  });

  const params = computed(() => ({
    q: debouncedQuery.value,
    focuses: selectedFocuses.value.join(','),
    includeNonMembers: includeNonMembers.value ? 'true' : 'false',
    page: '1',
    pageSize: '30',
  }));

  const { data, pending, error, refresh } = await useFetch('/api/van-finder/vendors', {
    query: params,
  });

  watch(params, () => refresh());

  const items = computed(() => data.value?.items || []);
  const total = computed(() => Number(data.value?.meta?.total || 0));
  const focusOptions = computed(() => data.value?.focusOptions || []);

  function clearQuery() {
    query.value = '';
    debouncedQuery.value = '';
  }

  function toggleFocus(focus: string) {
    if (selectedFocuses.value.includes(focus)) {
      selectedFocuses.value = selectedFocuses.value.filter((item) => item !== focus);
      return;
    }
    selectedFocuses.value = [...selectedFocuses.value, focus];
  }

  function tierBadge(vendor: any) {
    const tier = String(vendor?.vanTier || '').toLowerCase();
    if (tier === 'regular') return t('finder.tierRegular');
    if (tier === 'strategic' || tier === 'startegic') return t('finder.tierStrategic');
    return '';
  }

  function visibleResources(vendor: any) {
    const counts = vendor?.resources || {};
    const values = [
      {
        key: 'solutions',
        count: Number(counts.solutions || 0),
        label: t('finder.resourceSolutions'),
        icon: PuzzlePieceIcon,
      },
      {
        key: 'briefs',
        count: Number(counts.briefs || 0),
        label: t('finder.resourceBriefs'),
        icon: BeakerIcon,
      },
      {
        key: 'guides',
        count: Number(counts.guides || 0),
        label: t('finder.resourceGuides'),
        icon: MapIcon,
      },
      {
        key: 'kb',
        count: Number(counts.kb || 0),
        label: t('finder.resourceKb'),
        icon: WrenchScrewdriverIcon,
      },
    ];
    return values.filter((entry) => entry.count > 0);
  }

  useServerSeoMeta({
    title: 'VAN Finder',
    description: 'Find Vates Alliance Network members, areas of focus, and linked resources.',
  });
</script>
