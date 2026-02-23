<template>
  <LoadingState v-if="pending" />
  <ErrorState v-else-if="error" :message="error.message" />

  <section v-else-if="solution" class="space-y-6">
    <div class="hero rounded-box bg-base-300">
      <div
        class="hero-content w-full flex-col items-start gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between"
      >
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-wide text-primary">{{ t('solution.label') }}</p>
          <h1 class="text-4xl font-bold">{{ solution.name }}</h1>
          <p class="text-base-content/70">
            {{ solution.shortDescription || solution.summary || t('common.noSummary') }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-if="solution.solutionType" class="badge badge-outline">{{
            solution.solutionType
          }}</span>
          <span v-if="solution.workflow" class="badge badge-outline">{{ solution.workflow }}</span>
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <article class="card border border-base-300 bg-base-100">
        <div class="card-body">
          <h2 class="card-title">{{ t('solution.overview') }}</h2>
          <MarkdownContent v-if="solution.description" :source="solution.description" />
          <p v-else class="text-base-content/70">{{ t('solution.noDescription') }}</p>
        </div>
      </article>

      <aside class="card border border-base-300 bg-base-100">
        <div class="card-body space-y-3">
          <h2 class="card-title">{{ t('solution.details') }}</h2>
          <div>
            <p class="text-sm font-semibold">{{ t('solution.vendor') }}</p>
            <NuxtLink v-if="solution.vendor?.slug" class="link link-primary" :to="vendorLink">
              {{ solution.vendor.name }}
            </NuxtLink>
            <p v-else class="text-base-content/70">{{ t('common.na') }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ t('solution.type') }}</p>
            <p class="text-base-content/80">{{ solution.solutionType || t('common.na') }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ t('solution.integrationPattern') }}</p>
            <p class="text-base-content/80">{{ solution.integrationPattern || t('common.na') }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ t('solution.licensingModel') }}</p>
            <p class="text-base-content/80">{{ solution.licensingModel || t('common.na') }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ t('solution.visibility') }}</p>
            <p class="text-base-content/80">{{ solution.visibilityLevel || t('common.na') }}</p>
          </div>

          <div>
            <p class="text-sm font-semibold">{{ t('solution.relatedResources') }}</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <span class="badge badge-outline">
                {{ t('solution.guidesShort') }}: {{ solution.relatedResources?.guides || 0 }}
              </span>
              <span class="badge badge-outline">
                {{ t('solution.briefsShort') }}: {{ solution.relatedResources?.briefs || 0 }}
              </span>
              <span class="badge badge-outline">
                {{ t('solution.kbShort') }}: {{ solution.relatedResources?.kbArticles || 0 }}
              </span>
            </div>
          </div>

          <div v-if="solution.products?.length">
            <p class="text-sm font-semibold">{{ t('solution.products') }}</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <span v-for="product in solution.products" :key="product.documentId || product.id" class="badge badge-outline">
                {{ product.name }}
              </span>
            </div>
          </div>

          <div class="text-xs text-base-content/60">
            {{ t('common.updated') }}
            {{ formatDate(solution.updatedAt || solution.publishedAt || solution.createdAt) }}
          </div>
        </div>
      </aside>
    </div>
  </section>

  <div v-else class="alert border border-base-300 bg-base-100">
    <span>{{ t('solution.notFound') }}</span>
  </div>
</template>

<script setup lang="ts">
  const { t } = useL10n();
  const route = useRoute();
  const slug = computed(() => String(route.params.slug || ''));
  const { data, pending, error } = await useFetch(() => `/api/solutions/${slug.value}`);

  const solution = computed(() => data.value || null);
  const vendorLink = computed(() =>
    solution.value?.vendor?.slug ? `/vendors/${solution.value.vendor.slug}` : '#'
  );

  function formatDate(value: string | null | undefined) {
    if (!value) return t('common.na');
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return t('common.na');
    return date.toLocaleDateString();
  }

  useServerSeoMeta({
    title: () =>
      solution.value?.name
        ? `${solution.value.name} | ${t('solution.label')}`
        : t('solution.seoFallbackTitle'),
    description: () =>
      solution.value?.shortDescription || t('solution.seoDescriptionFallback'),
  });
</script>
