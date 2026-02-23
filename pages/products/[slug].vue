<template>
  <LoadingState v-if="pending" />
  <ErrorState v-else-if="error" :message="error.message" />

  <section v-else-if="product" class="space-y-6">
    <div class="hero rounded-box bg-base-300">
      <div class="hero-content w-full flex-col items-start gap-3 px-6 py-8">
        <p class="text-xs uppercase tracking-wide text-primary">{{ t('product.label') }}</p>
        <h1 class="text-4xl font-bold">{{ product.name }}</h1>
        <p class="text-base-content/70">{{ product.description || t('products.noDescription') }}</p>
      </div>
    </div>

    <section v-if="product.links?.length" class="space-y-3">
      <h2 class="text-2xl font-bold">{{ t('product.links') }}</h2>
      <div class="card border border-base-300 bg-base-100">
        <div class="card-body">
          <ul class="space-y-1">
            <li v-for="link in product.links" :key="`${link.url}-${link.label}`">
              <a :href="link.url" class="link link-primary" target="_blank" rel="noopener noreferrer">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">{{ t('vendor.solutionGuides') }}</h2>
      <div v-if="guides.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="guide in guides"
          :key="guide.documentId || guide.id || guide.slug"
          :to="guide.href"
          class="card border border-base-300 bg-base-100 transition hover:shadow-md"
        >
          <div class="card-body">
            <h3 class="card-title text-lg">{{ guide.title }}</h3>
            <p class="text-sm text-base-content/80">{{ guide.summary || t('common.noSummary') }}</p>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100">
        <span>{{ t('product.noGuides') }}</span>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">{{ t('vendor.solutionBriefs') }}</h2>
      <div v-if="briefs.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="brief in briefs"
          :key="brief.documentId || brief.id || brief.slug"
          :to="brief.href"
          class="card border border-base-300 bg-base-100 transition hover:shadow-md"
        >
          <div class="card-body">
            <h3 class="card-title text-lg">{{ brief.title }}</h3>
            <p class="text-sm text-base-content/80">
              {{ brief.shortDescription || t('common.noSummary') }}
            </p>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100">
        <span>{{ t('product.noBriefs') }}</span>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">{{ t('vendor.kbArticles') }}</h2>
      <div v-if="kbArticles.length" class="card border border-base-300 bg-base-100">
        <div class="card-body">
          <ul class="space-y-2">
            <li v-for="article in kbArticles" :key="article.documentId || article.id || article.slug">
              <NuxtLink :to="article.href" class="link link-primary">
                {{ article.title }}
              </NuxtLink>
              <span v-if="article.type" class="ml-2 text-sm text-base-content/70">({{ article.type }})</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100">
        <span>{{ t('product.noKb') }}</span>
      </div>
    </section>
  </section>

  <div v-else class="alert border border-base-300 bg-base-100">
    <span>{{ t('product.notFound') }}</span>
  </div>
</template>

<script setup lang="ts">
const { t } = useL10n();
const route = useRoute();
const slug = computed(() => String(route.params.slug || ''));
const { data, pending, error } = await useFetch(() => `/api/products/${slug.value}`);

const product = computed(() => data.value?.product || null);
const guides = computed(() => data.value?.relatedResources?.guides || []);
const briefs = computed(() => data.value?.relatedResources?.briefs || []);
const kbArticles = computed(() => data.value?.relatedResources?.kbArticles || []);

useServerSeoMeta({
  title: () =>
    product.value?.name ? `${product.value.name} | ${t('product.label')}` : t('product.seoFallbackTitle'),
  description: () => product.value?.description || t('product.seoDescription'),
});
</script>
