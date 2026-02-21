<template>
  <div class="prose max-w-none prose-headings:my-3 prose-p:my-2 prose-li:my-1" v-html="html"></div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it';

const props = defineProps<{ source?: string }>();
const md = new MarkdownIt({ html: false, linkify: true, breaks: true });

const html = computed(() => md.render(props.source || ''));
</script>
