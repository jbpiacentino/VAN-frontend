<template>
  <LoadingState v-if="loading" />
  <ErrorState v-else-if="error" :message="error" />

  <SurfacePanel v-else>
    <p class="m-0 text-xs uppercase tracking-[0.08em] text-[var(--muted)]">Landing</p>
    <h1 class="mt-1.5 mb-3 text-4xl font-bold">{{ landing?.title || landing?.name || 'Alliance Network' }}</h1>
    <MarkdownContent v-if="landing?.content || landing?.body" :source="landing.content || landing.body" />
    <p v-else>No landing page content found.</p>
  </SurfacePanel>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import LoadingState from '../components/LoadingState.vue';
import ErrorState from '../components/ErrorState.vue';
import MarkdownContent from '../components/MarkdownContent.vue';
import SurfacePanel from '../components/SurfacePanel.vue';
import { getLandingPage } from '../services/contentService';

const loading = ref(true);
const error = ref('');
const landing = ref(null);

onMounted(async () => {
  try {
    landing.value = await getLandingPage();
  } catch (err) {
    error.value = err.message || 'Failed to fetch landing page.';
  } finally {
    loading.value = false;
  }
});
</script>
