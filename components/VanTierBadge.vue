<template>
  <div :class="wrapperClass">
    <span v-if="isStrategic" class="badge badge-sm badge-soft badge-primary">
      {{ t('finder.tierStrategic') }}
    </span>

    <span v-else-if="isAlliance" class="badge badge-sm badge-soft badge-secondary">
      {{ t('finder.tierAlliance') }}
    </span>

    <span v-else-if="isAssociate" class="badge badge-sm badge-soft badge-accent">
      {{ t('finder.tierAssociate') }}
    </span>

    <span v-else class="badge badge-sm badge-soft badge-ghost">
      {{ t('finder.tierNonMember') }}
    </span>
  </div>
</template>

<script setup lang="ts">
  const { t } = useL10n();

  const props = defineProps<{
    tier?: string | null;
    inline?: boolean;
  }>();

  const wrapperClass = computed(() =>
    props.inline
      ? 'flex justify-start'
      : 'pointer-events-none absolute top-3 right-3 z-10 flex justify-end'
  );

  const normalizedTier = computed(() =>
    String(props.tier || '')
      .trim()
      .toLowerCase()
  );
  const isAlliance = computed(
    () => normalizedTier.value === 'alliance' || normalizedTier.value === 'regular'
  );
  const isAssociate = computed(() => normalizedTier.value === 'associate');
  const isStrategic = computed(
    () => normalizedTier.value === 'strategic' || normalizedTier.value === 'startegic'
  );
</script>
