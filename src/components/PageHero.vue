<template>
  <section class="hero mb-6 rounded-2xl border border-base-300 bg-base-200">
    <div class="hero-content w-full justify-start p-6">
      <div class="w-full">
    <p v-if="eyebrow" class="m-0 text-xs uppercase tracking-[0.08em] text-[var(--muted)]">{{ eyebrow }}</p>
    <h1 class="mt-1.5 mb-3 text-4xl font-bold">{{ title }}</h1>
    <p v-if="subtitle">{{ subtitle }}</p>
    <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
});
</script>
