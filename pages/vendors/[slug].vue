<template>
  <LoadingState v-if="pending" />
  <ErrorState v-else-if="error" :message="error.message" />

  <section v-else-if="vendor" class="space-y-6">
    <div class="hero rounded-box bg-base-300">
      <div
        class="hero-content w-full flex-col items-start gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between"
      >
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-wide text-primary">{{ t('vendor.profile') }}</p>
          <h1 class="text-4xl font-bold">{{ vendor.name }}</h1>
          <p class="text-base-content/70">
            {{ vendor.shortDescription || t('vendor.shortDescriptionFallback') }}
          </p>
        </div>
        <div v-if="vendor.logoUrl" class="rounded-box border border-base-300 bg-base-100 p-4">
          <img
            :src="vendor.logoUrl"
            :alt="`${vendor.name} logo`"
            class="h-20 w-auto object-contain"
          />
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <article class="card">
        <div class="card-body">
          <h2 class="card-title">{{ t('vendor.about', { name: vendor.name }) }}</h2>
          <MarkdownContent v-if="vendor.description" :source="vendor.description" />
          <p v-else>{{ vendor.summary || t('vendor.noDescription') }}</p>
        </div>
      </article>

      <aside class="card bg-base-200">
        <div class="card-body space-y-3">
          <h2 class="card-title">{{ t('vendor.partnerDetails') }}</h2>
          <div>
            <p class="text-sm font-semibold">{{ t('vendor.vanTier') }}</p>
            <p class="text-base-content/80">{{ vendor.vanTier || t('vendor.notMember') }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ t('vendor.areasOfFocus') }}</p>
            <p class="text-base-content/80">{{ joinedList(vendor.areaOfFocus) }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ t('vendor.regions') }}</p>
            <p class="text-base-content/80">{{ joinedList(vendor.regions) }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ t('vendor.website') }}</p>
            <a
              v-if="vendor.website"
              :href="vendor.website"
              target="_blank"
              rel="noreferrer"
              class="link link-primary break-all"
              >{{ vendor.website }}</a
            >
            <p v-else class="text-base-content/60">{{ t('common.na') }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ t('vendor.links') }}</p>
            <ul v-if="vendor.links?.length" class="space-y-1">
              <li v-for="link in vendor.links" :key="link.url">
                <a
                  :href="link.url"
                  target="_blank"
                  rel="noreferrer"
                  class="link link-primary break-all"
                  >{{ link.label }}</a
                >
              </li>
            </ul>
            <p v-else class="text-base-content/60">{{ t('common.na') }}</p>
          </div>
        </div>
      </aside>
    </div>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">{{ t('vendor.solutions') }}</h2>
      <div v-if="pagedSolutions.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="solution in pagedSolutions"
          :key="solution.documentId || solution.id || solution.slug || solution.name"
          :to="`/solutions/${solution.slug}`"
          class="card border border-base-300 bg-base-100 transition hover:shadow-md"
        >
          <div class="card-body">
            <h3 class="card-title line-clamp-2 text-lg">{{ solution.name }}</h3>
            <p class="line-clamp-2 text-sm text-base-content/80">
              {{ solution.shortDescription || t('common.noSummary') }}
            </p>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100">
        <span>{{ t('vendor.noSolutions') }}</span>
      </div>
      <PagerControls
        v-if="solutions.length > solutionsPageSize"
        :page="solutionsPage"
        :page-size="solutionsPageSize"
        :total-pages="solutionsTotalPages"
        :total-items="solutions.length"
        :show-page-size="false"
        @update:page="solutionsPage = $event"
      >
        <template #status="{ page, pageSize, totalItems }">
          {{ t('pager.itemsStatus', { shown: Math.min(page * pageSize, totalItems), total: totalItems, resource: t('pager.resourceSolutions') }) }}
        </template>
      </PagerControls>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">{{ t('vendor.solutionGuides') }}</h2>
      <div v-if="pagedGuides.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="guide in pagedGuides"
          :key="guide.documentId || guide.id || guide.slug || guide.title"
          :to="`/solution-guides/${guide.slug}`"
          class="card border border-base-300 bg-base-100 transition hover:shadow-md"
        >
          <div class="card-body">
            <h3 class="card-title line-clamp-2 text-lg">{{ guide.title }}</h3>
            <p class="line-clamp-2 text-sm text-base-content/80">
              {{ guide.summary || t('common.noSummary') }}
            </p>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100">
        <span>{{ t('vendor.noGuides') }}</span>
      </div>
      <PagerControls
        v-if="guides.length > guidesPageSize"
        :page="guidesPage"
        :page-size="guidesPageSize"
        :total-pages="guidesTotalPages"
        :total-items="guides.length"
        :show-page-size="false"
        @update:page="guidesPage = $event"
      >
        <template #status="{ page, pageSize, totalItems }">
          {{ t('pager.itemsStatus', { shown: Math.min(page * pageSize, totalItems), total: totalItems, resource: t('pager.resourceGuides') }) }}
        </template>
      </PagerControls>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">{{ t('vendor.solutionBriefs') }}</h2>
      <div v-if="pagedBriefs.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="brief in pagedBriefs"
          :key="brief.documentId || brief.id || brief.slug || brief.title"
          :to="`/solution-briefs/${brief.slug}`"
          class="card border border-base-300 bg-base-100 transition hover:shadow-md"
        >
          <div class="card-body">
            <h3 class="card-title line-clamp-2 text-lg">{{ brief.title }}</h3>
            <p class="line-clamp-2 text-sm text-base-content/80">
              {{ brief.shortDescription || brief.description || t('common.noSummary') }}
            </p>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100">
        <span>{{ t('vendor.noBriefs') }}</span>
      </div>
      <PagerControls
        v-if="briefs.length > briefsPageSize"
        :page="briefsPage"
        :page-size="briefsPageSize"
        :total-pages="briefsTotalPages"
        :total-items="briefs.length"
        :show-page-size="false"
        @update:page="briefsPage = $event"
      >
        <template #status="{ page, pageSize, totalItems }">
          {{ t('pager.itemsStatus', { shown: Math.min(page * pageSize, totalItems), total: totalItems, resource: t('pager.resourceBriefs') }) }}
        </template>
      </PagerControls>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">{{ t('vendor.kbArticles') }}</h2>
      <div v-if="pagedKbArticles.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="kb in pagedKbArticles"
          :key="kb.documentId || kb.id || kb.slug || kb.title"
          :to="`/kb-articles/${kb.slug}`"
          class="card border border-base-300 bg-base-100 transition hover:shadow-md"
        >
          <div class="card-body">
            <h3 class="card-title line-clamp-2 text-lg">{{ kb.title }}</h3>
            <p class="line-clamp-2 text-sm text-base-content/70">{{ kb.type || t('kb.article') }}</p>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100">
        <span>{{ t('vendor.noKb') }}</span>
      </div>
      <PagerControls
        v-if="kbArticles.length > kbPageSize"
        :page="kbPage"
        :page-size="kbPageSize"
        :total-pages="kbTotalPages"
        :total-items="kbArticles.length"
        :show-page-size="false"
        @update:page="kbPage = $event"
      >
        <template #status="{ page, pageSize, totalItems }">
          {{ t('pager.itemsStatus', { shown: Math.min(page * pageSize, totalItems), total: totalItems, resource: t('pager.resourceKbArticles') }) }}
        </template>
      </PagerControls>
    </section>
  </section>

  <div v-else class="alert border border-base-300 bg-base-100"><span>{{ t('vendor.notFound') }}</span></div>
</template>

<script setup lang="ts">
  const { t } = useL10n();
  const route = useRoute();
  const slug = computed(() => String(route.params.slug || ''));

  const { data, pending, error } = await useFetch(() => `/api/vendors/${slug.value}`);

  const vendor = computed(() => data.value?.vendor || null);
  const solutions = computed(() =>
    (data.value?.vendor?.solutions || []).filter((solution: any) =>
      String(solution?.slug || '').trim()
    )
  );
  const briefs = computed(() => data.value?.briefs || []);
  const guides = computed(() => data.value?.guides || []);
  const kbArticles = computed(() => data.value?.kbArticles || []);

  const joinedList = (values: string[]) =>
    Array.isArray(values) && values.length ? values.join(', ') : t('common.na');

  const solutionsPage = ref(1);
  const solutionsPageSize = ref(6);
  const briefsPage = ref(1);
  const briefsPageSize = ref(6);
  const guidesPage = ref(1);
  const guidesPageSize = ref(6);
  const kbPage = ref(1);
  const kbPageSize = ref(6);

  function pagedSlice<T>(items: T[], page: number, pageSize: number) {
    const safeSize = Math.max(1, Number(pageSize || 10));
    const safePage = Math.max(1, Number(page || 1));
    const start = (safePage - 1) * safeSize;
    return items.slice(start, start + safeSize);
  }

  function calcTotalPages(total: number, pageSize: number) {
    return Math.max(1, Math.ceil(Number(total || 0) / Math.max(1, Number(pageSize || 10))));
  }

  const solutionsTotalPages = computed(() =>
    calcTotalPages(solutions.value.length, solutionsPageSize.value)
  );
  const briefsTotalPages = computed(() =>
    calcTotalPages(briefs.value.length, briefsPageSize.value)
  );
  const guidesTotalPages = computed(() =>
    calcTotalPages(guides.value.length, guidesPageSize.value)
  );
  const kbTotalPages = computed(() => calcTotalPages(kbArticles.value.length, kbPageSize.value));

  const pagedSolutions = computed(() =>
    pagedSlice(solutions.value, solutionsPage.value, solutionsPageSize.value)
  );
  const pagedBriefs = computed(() =>
    pagedSlice(briefs.value, briefsPage.value, briefsPageSize.value)
  );
  const pagedGuides = computed(() =>
    pagedSlice(guides.value, guidesPage.value, guidesPageSize.value)
  );
  const pagedKbArticles = computed(() =>
    pagedSlice(kbArticles.value, kbPage.value, kbPageSize.value)
  );

  watch(solutionsPageSize, () => {
    solutionsPage.value = 1;
  });
  watch(briefsPageSize, () => {
    briefsPage.value = 1;
  });
  watch(guidesPageSize, () => {
    guidesPage.value = 1;
  });
  watch(kbPageSize, () => {
    kbPage.value = 1;
  });

  watch(solutionsTotalPages, (next) => {
    if (solutionsPage.value > next) solutionsPage.value = next;
  });
  watch(briefsTotalPages, (next) => {
    if (briefsPage.value > next) briefsPage.value = next;
  });
  watch(guidesTotalPages, (next) => {
    if (guidesPage.value > next) guidesPage.value = next;
  });
  watch(kbTotalPages, (next) => {
    if (kbPage.value > next) kbPage.value = next;
  });

  useServerSeoMeta({
    title: () =>
      vendor.value?.name ? `${vendor.value.name} | VAN` : t('vendor.seoFallbackTitle'),
    description: () =>
      vendor.value?.shortDescription || t('vendor.seoDescription'),
  });
</script>
