<template>
  <div class="flex flex-wrap items-center justify-between gap-3">
    <label v-if="showPageSize" class="label gap-2 p-0">
      <span class="label-text">{{ t('finder.perPage') }}</span>
      <select
        :value="pageSize"
        class="select select-sm select-bordered"
        @change="onPageSizeChange"
      >
        <option v-for="size in pageSizeOptions" :key="size" :value="size">
          {{ size }}
        </option>
      </select>
    </label>
    <div class="ml-auto flex items-center gap-2">
      <p class="text-sm text-base-content/70">
        {{ t('finder.pageStatus', { page, totalPages }) }}
      </p>
      <div class="join">
        <button
          class="btn btn-sm join-item"
          :disabled="page <= 1"
          type="button"
          @click="emit('update:page', Math.max(1, page - 1))"
        >
          {{ t('finder.previous') }}
        </button>
        <button
          class="btn btn-sm join-item"
          :disabled="page >= totalPages"
          type="button"
          @click="emit('update:page', Math.min(totalPages, page + 1))"
        >
          {{ t('finder.next') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    page: number;
    pageSize: number;
    totalPages: number;
    pageSizeOptions?: number[];
    showPageSize?: boolean;
  }>(),
  {
    pageSizeOptions: () => [10, 20, 50],
    showPageSize: true,
  }
);

const emit = defineEmits<{
  (event: 'update:page', value: number): void;
  (event: 'update:pageSize', value: number): void;
}>();

const { t } = useL10n();

function onPageSizeChange(event: Event) {
  const value = Number((event.target as HTMLSelectElement).value || 10);
  emit('update:pageSize', Number.isFinite(value) && value > 0 ? value : props.pageSize);
}
</script>
