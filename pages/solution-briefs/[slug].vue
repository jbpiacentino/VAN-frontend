<template>
  <LoadingState v-if="pending" />
  <ErrorState v-else-if="error" :message="error.message" />

  <section v-else-if="brief" class="space-y-6">
    <div class="hero rounded-box bg-base-300">
      <div class="hero-content w-full flex-col items-start gap-3 px-6 py-8">
        <p class="text-xs uppercase tracking-wide text-primary">{{ t('brief.label') }}</p>
        <h1 class="text-4xl font-bold">{{ brief.title }}</h1>
        <p class="text-base-content/70">{{ brief.shortDescription || t('common.noSummary') }}</p>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <article class="card border border-base-300 bg-base-100">
        <div class="card-body">
          <h2 class="card-title">{{ t('brief.content') }}</h2>
          <MarkdownContent v-if="brief.description" :source="brief.description" />
          <p v-else>{{ t('brief.noDescription') }}</p>
        </div>
      </article>
      <aside class="card bg-base-200">
        <div class="card-body space-y-3">
          <h2 class="card-title">{{ t('brief.details') }}</h2>
          <div>
            <p class="text-sm font-semibold">{{ t('brief.workflow') }}</p>
            <p class="text-base-content/80">{{ brief.workflow || t('common.na') }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ t('brief.integrationType') }}</p>
            <p class="text-base-content/80">{{ brief.integrationType || t('common.na') }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ t('brief.supportedCapabilities') }}</p>
            <p class="text-base-content/80">{{ brief.supportedCapabilities || t('common.na') }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ t('brief.solution') }}</p>
            <NuxtLink
              v-if="brief.solution?.slug"
              :to="`/solutions/${brief.solution.slug}`"
              class="link link-primary"
            >
              {{ brief.solution.name }}
            </NuxtLink>
            <p v-else class="text-base-content/70">{{ t('common.na') }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ t('brief.vendor') }}</p>
            <NuxtLink
              v-if="brief.vendor?.slug"
              :to="`/vendors/${brief.vendor.slug}`"
              class="link link-primary"
            >
              {{ brief.vendor.name }}
            </NuxtLink>
            <p v-else class="text-base-content/70">{{ t('common.na') }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">{{ t('brief.product') }}</p>
            <NuxtLink
              v-if="brief.product?.slug"
              :to="`/products/${brief.product.slug}`"
              class="link link-primary"
            >
              {{ brief.product.name }}
            </NuxtLink>
            <p v-else class="text-base-content/80">{{ brief.product?.name || t('common.na') }}</p>
          </div>
        </div>
      </aside>
    </div>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">{{ t('brief.requirements') }}</h2>
      <div class="card border border-base-300 bg-base-100">
        <div class="card-body">
          <p>{{ brief.requirements || t('brief.requirementsNone') }}</p>
        </div>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">{{ t('brief.limitations') }}</h2>
      <div class="card border border-base-300 bg-base-100">
        <div class="card-body">
          <p>{{ brief.limitations || t('brief.limitationsNone') }}</p>
        </div>
      </div>
    </section>
  </section>

  <div v-else class="alert border border-base-300 bg-base-100">
    <span>{{ t('brief.notFound') }}</span>
  </div>
</template>

<script setup lang="ts">
  const { t } = useL10n();
  const route = useRoute();
  const slug = computed(() => String(route.params.slug || ''));
  const { data, pending, error } = await useFetch(() => `/api/solution-briefs/${slug.value}`);

  const brief = computed(() => data.value?.brief || null);

  useServerSeoMeta({
    title: () =>
      brief.value?.title ? `${brief.value.title} | ${t('brief.label')}` : t('brief.seoFallbackTitle'),
    description: () => brief.value?.shortDescription || t('brief.seoDescription'),
  });
</script>
