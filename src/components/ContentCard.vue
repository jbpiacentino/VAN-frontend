<template>
  <article class="card border border-base-300 bg-base-100">
    <div class="card-body p-4">
      <h3 class="card-title text-xl">{{ item.title || item.name || 'Untitled' }}</h3>
      <p>{{ item.description || item.excerpt || item.summary || 'Content summary coming soon.' }}</p>
      <p v-if="item.vendorName"><strong>Vendor:</strong> {{ item.vendorName }}</p>
      <a
        v-if="item.url"
        :href="item.url"
        target="_blank"
        rel="noreferrer"
        class="link link-hover mt-2 inline-block font-semibold text-[var(--brand)]"
        >Read more</a
      >
    </div>
  </article>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>
