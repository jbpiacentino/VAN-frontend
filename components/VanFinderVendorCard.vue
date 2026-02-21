<template>
  <NuxtLink :to="`/vendors/${vendor.slug}`" class="card border border-base-300 bg-base-100 shadow-sm transition hover:shadow-lg">
    <div class="card-body relative p-5">
      <span v-if="tierBadge" class="badge badge-neutral absolute top-4 right-4">{{ tierBadge }}</span>
      <div class="flex h-24 items-center justify-center">
        <img
          v-if="vendor.logoUrl"
          :src="vendor.logoUrl"
          :alt="`${vendor.name} logo`"
          class="max-h-20 w-auto object-contain"
        />
      </div>
      <h3 class="card-title mt-2 text-4xl">{{ vendor.name }}</h3>
      <p v-if="vendor.areaOfFocus?.length" class="text-sm text-base-content/70">{{ vendor.areaOfFocus.join(', ') }}</p>
      <p class="line-clamp-6 text-base-content">{{ description }}</p>
      <div v-if="resources.length" class="mt-auto flex flex-wrap gap-1.5 pt-2">
        <span
          v-for="item in resources"
          :key="`${item.key}-${item.count}`"
          class="badge badge-outline gap-1 text-xs"
          :title="item.label"
          :aria-label="`${item.label}: ${item.count}`"
        >
          <component :is="item.icon" class="h-3.5 w-3.5" aria-hidden="true" />
          <span>{{ item.count }}</span>
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  vendor: Record<string, any>;
  tierBadge?: string;
  description?: string;
  resources?: Array<{ key: string; count: number; label: string; icon: any }>;
}>();
</script>
