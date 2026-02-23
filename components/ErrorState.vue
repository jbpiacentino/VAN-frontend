<template>
  <div class="alert alert-error">
    <span>{{ message || t('error.unexpected') }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message?: string }>();
const { t } = useL10n();
</script>
