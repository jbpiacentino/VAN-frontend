<template>
  <article
    class="card cursor-pointer border border-base-300 bg-base-100 shadow-sm transition hover:shadow-lg"
    role="link"
    tabindex="0"
    @click="openVendor"
    @keydown.enter.prevent="openVendor"
    @keydown.space.prevent="openVendor"
  >
    <div class="card-body relative p-5">
      <VanTierBadge :tier="vanTier" />
      <div class="flex h-20 items-center justify-center pt-6">
        <img
          v-if="vendor.logoUrl"
          :src="vendor.logoUrl"
          :alt="`${vendor.name} logo`"
          class="max-h-20 w-auto object-contain"
        />
      </div>
      <h3 class="card-title mt-2 text-4xl">{{ vendor.name }}</h3>
      <p v-if="vendor.areaOfFocus?.length" class="text-sm text-base-content/70">
        {{ vendor.areaOfFocus.join(', ') }}
      </p>
      <p class="line-clamp-6 text-base-content">{{ description }}</p>
      <div v-if="vendor.solutions?.length" class="space-y-1 pt-1">
        <p class="text-xs font-semibold uppercase tracking-wide text-base-content/60">
          {{ t('finder.resourceSolutions') }}
        </p>
        <div class="flex flex-wrap gap-1.5">
          <NuxtLink
            v-for="solution in previewSolutions"
            :key="solution.documentId || solution.id || solution.slug"
            :to="`/solutions/${solution.slug}`"
            class="badge badge-soft badge-info badge-xs"
            @click.stop
          >
            {{ solution.name }}
          </NuxtLink>
          <NuxtLink
            v-if="remainingSolutions > 0"
            :to="`/vendors/${vendor.slug}`"
            class="badge badge-ghost badge-sm"
            @click.stop
          >
            +{{ remainingSolutions }}
          </NuxtLink>
        </div>
      </div>
      <div v-if="resources.length" class="mt-auto flex flex-wrap gap-1.5 pt-2">
        <span
          v-for="item in resources"
          :key="`${item.key}-${item.count}`"
          class="badge badge-xs badge-soft gap-1 text-xs"
          :title="item.label"
          :aria-label="`${item.label}: ${item.count}`"
        >
          <component :is="item.icon" class="h-3.5 w-3.5 text-content" aria-hidden="true" /> :
          <span>{{ item.count }}</span>
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  const { t } = useL10n();
  const props = defineProps<{
    vendor: Record<string, any>;
    vanTier?: string | null;
    description?: string;
    resources?: Array<{ key: string; count: number; label: string; icon: any }>;
  }>();

  const router = useRouter();
  const previewSolutions = computed(() =>
    Array.isArray(props.vendor?.solutions)
      ? props.vendor.solutions.filter((solution) => String(solution?.slug || '').trim()).slice(0, 3)
      : []
  );
  const remainingSolutions = computed(() =>
    Math.max(0, Number(props.vendor?.solutions?.length || 0) - previewSolutions.value.length)
  );

  function openVendor() {
    router.push(`/vendors/${props.vendor.slug}`);
  }
</script>
