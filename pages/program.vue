<template>
  <LoadingState v-if="pending" />
  <ErrorState v-else-if="error" :message="error.message" />

  <SurfacePanel v-else>
    <p class="m-0 text-xs uppercase tracking-[0.08em] text-base-content/60">{{ t('program.label') }}</p>
    <h1 class="mt-1.5 mb-3 text-4xl font-bold">{{ programTitle }}</h1>
    <MarkdownContent v-if="programContent" :source="programContent" />
    <p v-else>{{ t('program.noContent') }}</p>
  </SurfacePanel>
</template>

<script setup lang="ts">
const { t } = useL10n();
const { data, pending, error } = await useFetch('/api/static-pages/program');

const programTitle = computed(() => data.value?.title || t('program.title'));
const programContent = computed(() => data.value?.content || '');

useSeoMeta({
  title: () => programTitle.value || t('program.seoTitle'),
  description: () => programContent.value || t('program.seoDescription'),
});
</script>
