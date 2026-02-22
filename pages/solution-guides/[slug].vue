<template>
  <LoadingState v-if="pending" />
  <ErrorState v-else-if="error" :message="error.message" />

  <section v-else-if="guide" class="space-y-6">
    <div class="hero rounded-box bg-base-300">
      <div class="hero-content w-full flex-col items-start gap-3 px-6 py-8">
        <p class="text-xs uppercase tracking-wide text-base-content/60">Solution guide</p>
        <h1 class="text-4xl font-bold">{{ guide.title }}</h1>
        <p class="text-base-content/70">{{ guide.summary || 'No summary available.' }}</p>
      </div>
    </div>

    <article class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <h2 class="card-title">Guide content</h2>
        <MarkdownContent v-if="guide.body" :source="guide.body" />
        <p v-else>No guide body available.</p>
      </div>
    </article>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Related Solutions</h2>
      <div v-if="solutions.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="item in solutions"
          :key="item.documentId || item.id || item.slug"
          :to="`/solutions/${item.slug}`"
          class="card border border-base-300 bg-base-100 transition hover:shadow-md"
        >
          <div class="card-body">
            <h3 class="card-title text-lg">{{ item.name }}</h3>
            <p v-if="item.vendor?.slug" class="text-sm text-base-content/70">
              by
              <span class="font-medium">{{ item.vendor.name }}</span>
            </p>
            <p class="text-sm text-base-content/80">{{ item.shortDescription || 'No summary available.' }}</p>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100"><span>No related solutions.</span></div>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Products</h2>
      <div v-if="products.length" class="flex flex-wrap gap-2">
        <span v-for="product in products" :key="product.documentId || product.id || product.slug" class="badge badge-outline">
          {{ product.name }}
        </span>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100"><span>No related products.</span></div>
    </section>
  </section>

  <div v-else class="alert border border-base-300 bg-base-100"><span>Solution guide not found.</span></div>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = computed(() => String(route.params.slug || ''));
const { data, pending, error } = await useFetch(() => `/api/solution-guides/${slug.value}`);

const guide = computed(() => data.value?.guide || null);
const solutions = computed(() => data.value?.solutions || []);
const products = computed(() => data.value?.products || []);

useServerSeoMeta({
  title: () => (guide.value?.title ? `${guide.value.title} | Solution Guide` : 'Solution Guide'),
  description: () => guide.value?.summary || 'Solution guide details and related resources.',
});
</script>
