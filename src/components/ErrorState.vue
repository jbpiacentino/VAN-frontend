<template>
  <div class="alert border border-error/40 bg-error/10 text-error-content">
    <span>{{ message || 'Unable to load content.' }}</span>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: ''
  }
});
</script>
