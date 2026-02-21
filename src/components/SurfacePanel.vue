<template>
  <component :is="as" class="card border border-base-300 bg-base-100" :class="className">
    <div class="card-body p-5">
      <slot />
    </div>
  </component>
</template>

<script setup>
defineProps({
  as: {
    type: String,
    default: 'section'
  },
  className: {
    type: [String, Array, Object],
    default: ''
  }
});
</script>
