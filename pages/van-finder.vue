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
    <div class="flex justify-end">
      <label class="label cursor-pointer gap-2">
        <span class="label-text text-xs">{{ t('finder.includeNonMembers') }}</span>
        <input v-model="includeNonMembers" type="checkbox" class="toggle toggle-xs" />
      </label>
    </div>

    <LoadingState v-if="pending" />
    <ErrorState v-else-if="error" :message="error.message" />

    <template v-else>
      <section v-if="items.length" class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <VanFinderVendorCard
          v-for="vendor in items"
          :key="vendor.documentId || vendor.id || vendor.slug"
          :vendor="vendor"
          :van-tier="vendor.vanTier"
          :description="vendor.descriptionPreview"
          :resources="visibleResources(vendor)"
        />
      </section>

      <SurfacePanel v-else-if="total === 0">
        <p>{{ t('finder.noResults') }}</p>
      </SurfacePanel>

      <PagerControls
        v-if="items.length"
        :page="page"
        :page-size="pageSize"
        :total-pages="totalPages"
        @update:page="page = $event"
        @update:page-size="pageSize = $event"
      />
    </template>
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
  const page = ref(1);
  const pageSize = ref(10);
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
    page: String(page.value),
    pageSize: String(pageSize.value),
  }));

  const { data, pending, error, refresh } = await useFetch('/api/van-finder/vendors', {
    query: params,
  });

  watch(params, () => refresh());

  const items = computed(() => data.value?.items || []);
  const total = computed(() => Number(data.value?.meta?.total || 0));
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(total.value / Math.max(1, Number(pageSize.value || 20))))
  );
  const focusOptions = computed(() => data.value?.focusOptions || []);

  watch([debouncedQuery, selectedFocuses, includeNonMembers, pageSize], () => {
    page.value = 1;
  });

  watch(totalPages, (next) => {
    if (page.value > next) {
      page.value = next;
    }
  });

  watch([items, total, page, totalPages], ([nextItems, nextTotal, nextPage, nextTotalPages]) => {
    if (nextTotal > 0 && nextItems.length === 0 && nextPage > nextTotalPages) {
      page.value = nextTotalPages;
    }
  });

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
    title: t('finder.title'),
    description: t('finder.seoDescription'),
  });
</script>
