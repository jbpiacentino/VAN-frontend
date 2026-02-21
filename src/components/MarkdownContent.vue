<template>
  <div
    class="text-[#44484d] [&_p]:my-3 [&_p]:text-[1.02rem] [&_p]:leading-8 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1.5 [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-[2rem] [&_h1]:font-bold [&_h1]:leading-tight [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-[1.6rem] [&_h2]:font-bold [&_h2]:leading-tight [&_h3]:mt-3 [&_h3]:mb-2 [&_h3]:text-[1.25rem] [&_h3]:font-semibold [&_strong]:font-semibold [&_em]:italic [&_a]:font-semibold [&_a]:text-[var(--brand)] hover:[&_a]:underline [&_code]:rounded [&_code]:bg-[#edf1e8] [&_code]:px-1 [&_code]:py-0.5 [&_img]:my-3 [&_img]:block [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg"
    v-html="html"
  ></div>
</template>

<script setup>
import { computed } from 'vue';
import { renderMarkdown } from '../utils/markdown';

const props = defineProps({
  source: {
    type: String,
    default: ''
  }
});

const html = computed(() => renderMarkdown(props.source));
</script>
