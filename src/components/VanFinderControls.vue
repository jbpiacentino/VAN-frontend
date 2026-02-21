<template>
  <section class="mb-6 space-y-5">
    <h1 class="text-center text-4xl font-bold text-base-content md:text-5xl">VAN finder</h1>

    <div class="join w-full">
      <label class="input input-bordered join-item w-full border-base-300 bg-base-100">
        <MagnifyingGlassIcon class="h-5 w-5 opacity-60" />
        <input
          id="member-search"
          :value="query"
          type="search"
          class="grow"
          :placeholder="t('finder.searchPlaceholder')"
          @input="$emit('update:query', $event.target.value)"
        />
        <button
          v-if="query"
          type="button"
          class="btn btn-ghost btn-circle btn-xs"
          :title="t('finder.reset')"
          @click="$emit('clear-query')"
        >
          <XMarkIcon class="h-4 w-4" />
        </button>
      </label>
      <button class="btn btn-primary join-item" type="button" :aria-label="t('common.search')">
        <MagnifyingGlassIcon class="h-5 w-5" />
      </button>
    </div>

    <form class="filter flex flex-wrap items-center gap-2" @submit.prevent>
      <button
        type="button"
        class="btn btn-xs btn-soft"
        :class="selectedFocuses.length === 0 ? 'btn-primary' : 'btn-outline'"
        :aria-label="t('common.all')"
        @click="$emit('select-all-focuses')"
      >
        {{ t('common.all') }}
      </button>
      <button
        v-for="focus in focusOptions"
        :key="focus"
        type="button"
        class="btn btn-xs btn-soft"
        :class="selectedFocuses.includes(focus) ? 'btn-primary' : 'btn-outline'"
        :aria-label="focus"
        @click="$emit('toggle-focus', focus)"
      >
        {{ focus }}
      </button>
    </form>
  </section>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline';

  defineProps({
    query: {
      type: String,
      default: '',
    },
    selectedFocuses: {
      type: Array,
      default: () => [],
    },
    focusOptions: {
      type: Array,
      default: () => [],
    },
  });

  defineEmits(['update:query', 'clear-query', 'select-all-focuses', 'toggle-focus']);

  const { t } = useI18n();
</script>
