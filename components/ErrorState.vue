<template>
  <div class="alert alert-error">
    <span>{{ message || 'An unexpected error occurred.' }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ message?: string }>();
</script>
