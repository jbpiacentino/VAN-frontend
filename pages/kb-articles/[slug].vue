<template>
  <LoadingState v-if="pending" />
  <ErrorState v-else-if="error" :message="error.message" />

  <section v-else-if="article" class="space-y-6">
    <div class="hero rounded-box bg-base-300">
      <div
        class="hero-content w-full flex-col items-start gap-3 px-6 py-8 md:flex-row md:items-center md:justify-between"
      >
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-wide text-primary">{{ t('kb.label') }}</p>
          <h1 class="text-4xl font-bold">{{ article.title }}</h1>
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="badge badge-outline">{{ article.type || t('kb.article') }}</span>
          <span v-if="article.severity" class="badge badge-outline">{{ article.severity }}</span>
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <article class="card border border-base-300 bg-base-100">
        <div class="card-body space-y-4">
          <div>
            <h2 class="card-title text-xl">{{ t('kb.symptoms') }}</h2>
            <p>{{ article.symptoms || t('common.na') }}</p>
          </div>
          <div>
            <h2 class="card-title text-xl">{{ t('kb.rootCause') }}</h2>
            <p>{{ article.rootCause || t('common.na') }}</p>
          </div>
          <div v-if="article.resolution">
            <h2 class="card-title text-xl">{{ t('kb.resolution') }}</h2>
            <p>{{ article.resolution }}</p>
          </div>
          <div v-if="article.body || article.summary">
            <h2 class="card-title text-xl">{{ t('kb.additionalNotes') }}</h2>
            <MarkdownContent :source="article.body || article.summary" />
          </div>
        </div>
      </article>

      <aside class="card bg-base-200">
        <div class="card-body space-y-3">
          <h2 class="card-title">{{ t('kb.relatedResources') }}</h2>

          <div>
            <p class="text-sm font-semibold">{{ t('kb.solutions') }}</p>
            <ul v-if="solutions.length" class="space-y-1">
              <li
                v-for="solution in solutions"
                :key="solution.documentId || solution.id || solution.slug"
              >
                <NuxtLink :to="`/solutions/${solution.slug}`" class="link link-primary">
                  {{ solution.name }}
                </NuxtLink>
              </li>
            </ul>
            <p v-else class="text-base-content/70">{{ t('common.na') }}</p>
          </div>

          <div>
            <p class="text-sm font-semibold">{{ t('kb.products') }}</p>
            <div v-if="products.length" class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="product in products"
                :key="product.documentId || product.id || product.slug"
                :to="product.slug ? `/products/${product.slug}` : '#'"
                :class="product.slug ? 'badge badge-outline hover:badge-primary' : 'badge badge-outline'"
                :aria-disabled="!product.slug"
              >
                {{ product.name }}
              </NuxtLink>
            </div>
            <p v-else class="text-base-content/70">{{ t('common.na') }}</p>
          </div>
        </div>
      </aside>
    </div>
  </section>

  <div v-else class="alert border border-base-300 bg-base-100">
    <span>{{ t('kb.notFound') }}</span>
  </div>
</template>

<script setup lang="ts">
  const { t } = useL10n();
  const route = useRoute();
  const slug = computed(() => String(route.params.slug || ''));
  const { data, pending, error } = await useFetch(() => `/api/kb-articles/${slug.value}`);

  const article = computed(() => data.value?.article || null);
  const solutions = computed(() => data.value?.solutions || []);
  const products = computed(() => data.value?.products || []);

  useServerSeoMeta({
    title: () => (article.value?.title ? `${article.value.title} | ${t('kb.label')}` : t('kb.seoFallbackTitle')),
    description: () =>
      article.value?.symptoms ||
      article.value?.summary ||
      t('kb.seoDescription'),
  });
</script>
