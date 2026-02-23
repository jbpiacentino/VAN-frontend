<template>
  <div class="absolute top-3 right-3">
    <span
      v-if="isRegular"
      class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-base-100 p-1"
    >
      <img :src="vanBadgeLogo" :alt="t('finder.tierRegular')" class="h-6 w-6 object-contain" />
    </span>

    <span v-else-if="isStrategic" class="flex items-center gap-1">
      <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-base-100 p-1">
        <img :src="vanBadgeLogo" :alt="t('finder.tierStrategic')" class="h-6 w-6 object-contain" />
      </span>
      <span class="badge badge-sm badge-soft badge-secondary">
        {{ t('finder.tierStrategic') }}
      </span>
    </span>

    <span v-else class="badge badge-ghost">
      {{ t('finder.tierNonMember') }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import vanBadgeLogo from '~/assets/van-shuttle-256x256.png';

  const { t } = useL10n();

  const props = defineProps<{
    tier?: string | null;
  }>();

  const normalizedTier = computed(() =>
    String(props.tier || '')
      .trim()
      .toLowerCase()
  );
  const isRegular = computed(() => normalizedTier.value === 'regular');
  const isStrategic = computed(
    () => normalizedTier.value === 'strategic' || normalizedTier.value === 'startegic'
  );
</script>
