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
          <!-- <span v-if="solution.workflow" class="badge badge-outline">{{ solution.workflow }}</span> -->
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
          <!-- <h2 class="card-title">{{ t('solution.details') }}</h2> -->
          <div>
            <p class="text-sm font-semibold">{{ t('solution.vendor') }}</p>
            <NuxtLink v-if="solution.vendor?.slug" class="link link-primary" :to="vendorLink">
              {{ solution.vendor.name }}
            </NuxtLink>
            <p v-else class="text-base-content/70">{{ t('common.na') }}</p>
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
            <!-- <p class="text-sm font-semibold">{{ t('solution.relatedResources') }}</p> -->
            <div
              v-if="
                solution.relatedResources?.guides?.length ||
                solution.relatedResources?.briefs?.length ||
                solution.relatedResources?.kbArticles?.length
              "
              class="mt-2 space-y-2"
            >
              <div v-if="solution.relatedResources?.guides?.length" class="space-y-1">
                <p class="text-xs font-semibold uppercase text-base-content/60">
                  {{ t('vendor.solutionGuides') }}
                </p>
                <ul class="space-y-0.5">
                  <li
                    v-for="guide in solution.relatedResources.guides"
                    :key="guide.documentId || guide.id"
                  >
                    <NuxtLink class="link link-primary" :to="guide.href">
                      {{ guide.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>

              <div v-if="solution.relatedResources?.briefs?.length" class="space-y-1">
                <p class="text-xs font-semibold uppercase text-base-content/60">
                  {{ t('vendor.solutionBriefs') }}
                </p>
                <ul class="space-y-0.5">
                  <li
                    v-for="brief in solution.relatedResources.briefs"
                    :key="brief.documentId || brief.id"
                  >
                    <NuxtLink class="link link-primary" :to="brief.href">
                      {{ brief.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>

              <div v-if="solution.relatedResources?.kbArticles?.length" class="space-y-1">
                <p class="text-xs font-semibold uppercase text-base-content/60">
                  {{ t('vendor.kbArticles') }}
                </p>
                <ul class="space-y-0.5">
                  <li
                    v-for="kb in solution.relatedResources.kbArticles"
                    :key="kb.documentId || kb.id"
                  >
                    <NuxtLink class="link link-primary" :to="kb.href">
                      {{ kb.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
            <div v-else class="mt-2 text-base-content/70">
              {{ t('solution.noRelatedResources') }}
            </div>
          </div>

          <div v-if="solution.products?.length">
            <p class="text-sm font-semibold">{{ t('solution.products') }}</p>
            <div class="mt-2 flex flex-wrap gap-2">
              <NuxtLink
                v-for="product in solution.products"
                :key="product.documentId || product.id"
                :to="product.slug ? `/products/${product.slug}` : '#'"
                :class="product.slug ? 'badge badge-outline hover:badge-primary' : 'badge badge-outline'"
                :aria-disabled="!product.slug"
              >
                {{ product.name }}
              </NuxtLink>
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
    description: () => solution.value?.shortDescription || t('solution.seoDescriptionFallback'),
  });
</script>
