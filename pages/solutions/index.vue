<template>
  <section class="space-y-6">
    <SurfacePanel>
      <p class="m-0 text-xs uppercase tracking-[0.08em] text-primary">{{ t('solutions.label') }}</p>
      <h1 class="mt-1.5 mb-1 text-4xl font-bold">{{ t('solutions.title') }}</h1>
      <p class="text-base-content/70">{{ t('solutions.subtitle') }}</p>
    </SurfacePanel>

    <LoadingState v-if="pending" />
    <ErrorState v-else-if="error" :message="error.message" />

    <template v-else>
      <section v-if="solutions.length" class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="item in solutions"
          :key="item.documentId || item.id || item.slug"
          :to="`/solutions/${item.slug}`"
          class="card border border-base-300 bg-base-100 transition hover:shadow-md"
        >
          <div class="card-body gap-3">
            <div class="flex flex-wrap gap-2">
              <span v-if="item.solutionType" class="badge badge-outline">{{
                item.solutionType
              }}</span>
              <span v-if="item.workflow" class="badge badge-outline">{{ item.workflow }}</span>
            </div>
            <h2 class="card-title leading-tight">{{ item.name }}</h2>
            <p class="text-sm text-base-content/80">
              {{ item.shortDescription || item.summary || t('common.noSummary') }}
            </p>
            <p v-if="item.vendor?.slug" class="text-sm text-base-content/70">
              {{ t('solutions.vendor') }}:
              <span class="font-medium">{{ item.vendor.name }}</span>
            </p>
          </div>
        </NuxtLink>
      </section>

      <SurfacePanel v-else>
        <p>{{ t('solutions.none') }}</p>
      </SurfacePanel>

      <SurfacePanel v-if="pagination.total > 0">
        <PagerControls
          :page="pagination.page"
          :page-size="pagination.pageSize"
          :total-pages="pagination.pageCount"
          @update:page="onPageChange"
          @update:page-size="onPageSizeChange"
        />
      </SurfacePanel>
    </template>
  </section>
</template>

<script setup lang="ts">
  const { t } = useL10n();
  const route = useRoute();
  const router = useRouter();

  function parsePositiveInt(value: unknown, fallback: number) {
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
  }

  const page = ref(parsePositiveInt(route.query.page, 1));
  const pageSize = ref(parsePositiveInt(route.query.pageSize, 10));

  watch(
    () => route.query,
    (query) => {
      page.value = parsePositiveInt(query.page, 1);
      pageSize.value = parsePositiveInt(query.pageSize, 10);
    }
  );

  const query = computed(() => ({
    page: page.value,
    pageSize: pageSize.value,
  }));

  const { data, pending, error } = await useFetch('/api/solutions', {
    query,
    default: () => ({
      items: [],
      pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 },
    }),
  });

  const solutions = computed(() => data.value?.items || []);
  const pagination = computed(() => {
    const value = data.value?.pagination;
    return {
      page: Number(value?.page || 1),
      pageSize: Number(value?.pageSize || pageSize.value),
      pageCount: Number(value?.pageCount || 1),
      total: Number(value?.total || 0),
    };
  });

  function updateQuery(nextPage: number, nextPageSize: number) {
    router.replace({
      query: {
        ...route.query,
        page: String(nextPage),
        pageSize: String(nextPageSize),
      },
    });
  }

  function onPageChange(nextPage: number) {
    page.value = nextPage;
    updateQuery(nextPage, pageSize.value);
  }

  function onPageSizeChange(nextPageSize: number) {
    pageSize.value = nextPageSize;
    page.value = 1;
    updateQuery(1, nextPageSize);
  }

  useServerSeoMeta({
    title: t('solutions.seoTitle'),
    description: t('solutions.seoDescription'),
  });
</script>
