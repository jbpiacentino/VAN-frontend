<template>
  <div class="flex justify-center py-16">
    <span class="loading loading-spinner loading-lg" :aria-label="t('common.loading')"></span>
  </div>
</template>

<script setup lang="ts">
const { t } = useL10n();
</script>
