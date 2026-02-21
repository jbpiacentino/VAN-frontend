<template>
  <PageHero eyebrow="Solutions" title="Solutions Catalog">
    <p>Collection: <code>solutions</code></p>
  </PageHero>

  <LoadingState v-if="loading" />
  <ErrorState v-else-if="error" :message="error" />

  <AutoGrid v-else-if="solutions.length">
    <ContentCard
      v-for="item in solutions"
      :key="item.documentId || item.id || item.slug || item.title || item.name"
      :item="item"
    />
  </AutoGrid>

  <SurfacePanel v-else>
    <p>No solutions available.</p>
  </SurfacePanel>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import AutoGrid from '../components/AutoGrid.vue';
import PageHero from '../components/PageHero.vue';
import SurfacePanel from '../components/SurfacePanel.vue';
import LoadingState from '../components/LoadingState.vue';
import ErrorState from '../components/ErrorState.vue';
import ContentCard from '../components/ContentCard.vue';
import { getSolutions } from '../services/contentService';

const loading = ref(true);
const error = ref('');
const solutions = ref([]);

onMounted(async () => {
  try {
    solutions.value = await getSolutions();
  } catch (err) {
    error.value = err.message || 'Failed to fetch solutions.';
  } finally {
    loading.value = false;
  }
});
</script>
