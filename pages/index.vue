<template>
  <LoadingState v-if="pending" />
  <ErrorState v-else-if="error" :message="error.message" />

  <SurfacePanel v-else>
    <p class="m-0 text-xs uppercase tracking-[0.08em] text-base-content/60">{{ t('landing.label') }}</p>
    <h1 class="mt-1.5 mb-3 text-4xl font-bold">{{ landingTitle }}</h1>
    <MarkdownContent v-if="landingContent" :source="landingContent" />
    <p v-else>{{ t('landing.noContent') }}</p>
  </SurfacePanel>
</template>

<script setup lang="ts">
const { t } = useL10n();
const { data, pending, error } = await useFetch('/api/static-pages/landing-page');

const landingTitle = computed(() => data.value?.title || data.value?.name || t('landing.defaultTitle'));
const landingContent = computed(() => data.value?.content || '');

useSeoMeta({
  title: () => landingTitle.value || t('landing.seoTitle'),
  description: () => landingContent.value || t('landing.seoDescription'),
});
</script>
