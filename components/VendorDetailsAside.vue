<template>
  <aside class="card bg-base-200">
    <div class="card-body space-y-3">
      <div>
        <VanTierBadge :tier="vendor?.vanTier" inline />
      </div>
      <div>
        <p class="text-sm font-semibold">{{ t('vendor.areasOfFocus') }}</p>
        <p class="text-base-content/80">{{ joinedList(vendor?.areaOfFocus) }}</p>
      </div>
      <div>
        <p class="text-sm font-semibold">{{ t('vendor.regions') }}</p>
        <p class="text-base-content/80">{{ joinedList(vendor?.regions) }}</p>
      </div>
      <div>
        <p class="text-sm font-semibold">{{ t('vendor.website') }}</p>
        <a
          v-if="vendor?.website"
          :href="vendor.website"
          target="_blank"
          rel="noreferrer"
          class="link link-primary break-all"
          >{{ vendor.website }}</a
        >
        <p v-else class="text-base-content/60">{{ t('common.na') }}</p>
      </div>
      <div>
        <p class="text-sm font-semibold">{{ t('vendor.links') }}</p>
        <ul v-if="vendor?.links?.length" class="space-y-1">
          <li v-for="link in vendor.links" :key="link.url">
            <a
              :href="link.url"
              target="_blank"
              rel="noreferrer"
              class="link link-primary break-all"
              >{{ link.label }}</a
            >
          </li>
        </ul>
        <p v-else class="text-base-content/60">{{ t('common.na') }}</p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
  const { t } = useL10n();

  defineProps<{
    vendor: Record<string, any> | null;
  }>();

  function joinedList(values: string[] | undefined) {
    return Array.isArray(values) && values.length ? values.join(', ') : t('common.na');
  }
</script>
