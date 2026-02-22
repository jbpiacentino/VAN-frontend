<template>
  <LoadingState v-if="pending" />
  <ErrorState v-else-if="error" :message="error.message" />

  <section v-else-if="solution" class="space-y-6">
    <div class="hero rounded-box bg-base-300">
      <div class="hero-content w-full flex-col items-start gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-wide text-base-content/60">Solution</p>
          <h1 class="text-4xl font-bold">{{ solution.name }}</h1>
          <p class="text-base-content/70">{{ solution.shortDescription || 'No summary available.' }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-if="solution.solutionType" class="badge badge-outline">{{ solution.solutionType }}</span>
          <span v-if="solution.workflow" class="badge badge-outline">{{ solution.workflow }}</span>
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <article class="card border border-base-300 bg-base-100">
        <div class="card-body">
          <h2 class="card-title">Overview</h2>
          <MarkdownContent v-if="solution.description" :source="solution.description" />
          <p v-else>No description available.</p>
        </div>
      </article>
      <aside class="card bg-base-200">
        <div class="card-body space-y-3">
          <h2 class="card-title">Details</h2>
          <div>
            <p class="text-sm font-semibold">Vendor</p>
            <NuxtLink
              v-if="solution.vendor?.slug"
              class="link link-primary"
              :to="`/vendors/${solution.vendor.slug}`"
            >
              {{ solution.vendor.name }}
            </NuxtLink>
            <p v-else class="text-base-content/70">N/A</p>
          </div>
          <div>
            <p class="text-sm font-semibold">Type</p>
            <p class="text-base-content/80">{{ solution.solutionType || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">Integration pattern</p>
            <p class="text-base-content/80">{{ solution.integrationPattern || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">Licensing model</p>
            <p class="text-base-content/80">{{ solution.licensingModel || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">Visibility</p>
            <p class="text-base-content/80">{{ solution.visibilityLevel || 'N/A' }}</p>
          </div>
        </div>
      </aside>
    </div>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Solution Guides</h2>
      <div v-if="guides.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="guide in guides"
          :key="guide.documentId || guide.id || guide.slug"
          :to="`/solution-guides/${guide.slug}`"
          class="card border border-base-300 bg-base-100 transition hover:shadow-md"
        >
          <div class="card-body">
            <h3 class="card-title text-lg">{{ guide.title }}</h3>
            <p class="text-sm text-base-content/80">{{ guide.summary || 'No summary available.' }}</p>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100"><span>No solution guides linked to this solution.</span></div>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Solution Briefs</h2>
      <div v-if="briefs.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="brief in briefs"
          :key="brief.documentId || brief.id || brief.slug"
          :to="`/solution-briefs/${brief.slug}`"
          class="card border border-base-300 bg-base-100 transition hover:shadow-md"
        >
          <div class="card-body">
            <h3 class="card-title text-lg">{{ brief.title }}</h3>
            <p class="text-sm text-base-content/80">{{ brief.shortDescription || brief.description || 'No summary available.' }}</p>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100"><span>No solution briefs linked to this solution.</span></div>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">KB Articles</h2>
      <ul v-if="kbArticles.length" class="menu rounded-box border border-base-300 bg-base-100">
        <li v-for="kb in kbArticles" :key="kb.documentId || kb.id || kb.slug" class="border-b border-base-200 last:border-0">
          <NuxtLink :to="`/kb-articles/${kb.slug}`" class="flex items-center justify-between gap-3 py-2">
            <span class="font-medium">{{ kb.title }}</span>
            <span class="text-xs text-base-content/60">{{ kb.type || 'article' }}</span>
          </NuxtLink>
        </li>
      </ul>
      <div v-else class="alert border border-base-300 bg-base-100"><span>No KB articles linked to this solution.</span></div>
    </section>
  </section>

  <div v-else class="alert border border-base-300 bg-base-100"><span>Solution not found.</span></div>
</template>

<script setup lang="ts">
const route = useRoute();
const slug = computed(() => String(route.params.slug || ''));
const { data, pending, error } = await useFetch(() => `/api/solutions/${slug.value}`);

const solution = computed(() => data.value?.solution || null);
const guides = computed(() => data.value?.guides || []);
const briefs = computed(() => data.value?.briefs || []);
const kbArticles = computed(() => data.value?.kbArticles || []);

useServerSeoMeta({
  title: () => (solution.value?.name ? `${solution.value.name} | Solution` : 'Solution'),
  description: () => solution.value?.shortDescription || 'Solution details and linked resources.',
});
</script>
