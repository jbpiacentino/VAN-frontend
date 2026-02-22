<template>
  <LoadingState v-if="pending" />
  <ErrorState v-else-if="error" :message="error.message" />

  <section v-else-if="brief" class="space-y-6">
    <div class="hero rounded-box bg-base-300">
      <div class="hero-content w-full flex-col items-start gap-3 px-6 py-8">
        <p class="text-xs uppercase tracking-wide text-primary">Solution brief</p>
        <h1 class="text-4xl font-bold">{{ brief.title }}</h1>
        <p class="text-base-content/70">{{ brief.shortDescription || 'No summary available.' }}</p>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <article class="card border border-base-300 bg-base-100">
        <div class="card-body">
          <h2 class="card-title">Brief content</h2>
          <MarkdownContent v-if="brief.description" :source="brief.description" />
          <p v-else>No brief description available.</p>
        </div>
      </article>
      <aside class="card bg-base-200">
        <div class="card-body space-y-3">
          <h2 class="card-title">Details</h2>
          <div>
            <p class="text-sm font-semibold">Workflow</p>
            <p class="text-base-content/80">{{ brief.workflow || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">Integration type</p>
            <p class="text-base-content/80">{{ brief.integrationType || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">Supported capabilities</p>
            <p class="text-base-content/80">{{ brief.supportedCapabilities || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">Solution</p>
            <NuxtLink
              v-if="brief.solution?.slug"
              :to="`/solutions/${brief.solution.slug}`"
              class="link link-primary"
            >
              {{ brief.solution.name }}
            </NuxtLink>
            <p v-else class="text-base-content/70">N/A</p>
          </div>
          <div>
            <p class="text-sm font-semibold">Vendor</p>
            <NuxtLink
              v-if="brief.vendor?.slug"
              :to="`/vendors/${brief.vendor.slug}`"
              class="link link-primary"
            >
              {{ brief.vendor.name }}
            </NuxtLink>
            <p v-else class="text-base-content/70">N/A</p>
          </div>
          <div>
            <p class="text-sm font-semibold">Product</p>
            <p class="text-base-content/80">{{ brief.product?.name || 'N/A' }}</p>
          </div>
        </div>
      </aside>
    </div>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Requirements</h2>
      <div class="card border border-base-300 bg-base-100">
        <div class="card-body">
          <p>{{ brief.requirements || 'No requirements specified.' }}</p>
        </div>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Limitations</h2>
      <div class="card border border-base-300 bg-base-100">
        <div class="card-body">
          <p>{{ brief.limitations || 'No limitations specified.' }}</p>
        </div>
      </div>
    </section>
  </section>

  <div v-else class="alert border border-base-300 bg-base-100">
    <span>Solution brief not found.</span>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const slug = computed(() => String(route.params.slug || ''));
  const { data, pending, error } = await useFetch(() => `/api/solution-briefs/${slug.value}`);

  const brief = computed(() => data.value?.brief || null);

  useServerSeoMeta({
    title: () => (brief.value?.title ? `${brief.value.title} | Solution Brief` : 'Solution Brief'),
    description: () => brief.value?.shortDescription || 'Solution brief details and references.',
  });
</script>
