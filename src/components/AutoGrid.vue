<template>
  <section class="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]" :class="className">
    <slot />
  </section>
</template>

<script setup>
defineProps({
  className: {
    type: [String, Array, Object],
    default: ''
  }
});
</script>
