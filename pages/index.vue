<template>
  <LoadingState v-if="pending" />
  <ErrorState v-else-if="error" :message="error.message" />

  <SurfacePanel v-else>
    <p class="m-0 text-xs uppercase tracking-[0.08em] text-base-content/60">Landing</p>
    <h1 class="mt-1.5 mb-3 text-4xl font-bold">{{ landingTitle }}</h1>
    <MarkdownContent v-if="landingContent" :source="landingContent" />
    <p v-else>No landing page content found.</p>
  </SurfacePanel>
</template>

<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/landing');

const landingTitle = computed(() => data.value?.title || data.value?.name || 'Alliance Network');
const landingContent = computed(() => data.value?.content || '');

useServerSeoMeta({
  title: 'Vates Alliance Network',
  description: 'Official VAN landing page with alliance overview and resources.',
});
</script>
