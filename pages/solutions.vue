<template>
  <section class="space-y-4">
    <SurfacePanel>
      <p class="m-0 text-xs uppercase tracking-[0.08em] text-base-content/60">Solutions</p>
      <h1 class="mt-1.5 mb-3 text-4xl font-bold">Solutions Catalog</h1>
    </SurfacePanel>

    <LoadingState v-if="pending" />
    <ErrorState v-else-if="error" :message="error.message" />

    <section v-else-if="solutions.length" class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <article v-for="item in solutions" :key="item.documentId || item.id || item.slug" class="card border border-base-300 bg-base-100">
        <div class="card-body">
          <h2 class="card-title">{{ item.name || item.title }}</h2>
          <p class="text-sm text-base-content/80">{{ item.shortDescription || item.summary || 'No summary available.' }}</p>
        </div>
      </article>
    </section>

    <SurfacePanel v-else>
      <p>No solutions available.</p>
    </SurfacePanel>
  </section>
</template>

<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/solutions');
const solutions = computed(() => data.value || []);

useServerSeoMeta({
  title: 'VAN Solutions',
  description: 'Browse VAN partner solutions.',
});
</script>
