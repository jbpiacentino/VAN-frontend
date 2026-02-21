<template>
  <section class="space-y-4">
    <SurfacePanel>
      <p class="m-0 text-xs uppercase tracking-[0.08em] text-base-content/60">Program</p>
      <h1 class="mt-1.5 mb-3 text-4xl font-bold">About the VAN Program</h1>
      <p>
        This static page is the foundation for VAN messaging before full CMS integration into the main Vates website.
      </p>
      <h2 class="mt-5 mb-2 text-2xl font-semibold">What VAN delivers</h2>
      <ul class="list-disc pl-5">
        <li>Alliance-based collaboration between Vates and vendor organizations</li>
        <li>Curated solutions to customer challenges</li>
        <li>Reusable knowledge assets for implementation and adoption</li>
      </ul>
    </SurfacePanel>
  </section>
</template>

<script setup lang="ts">
useServerSeoMeta({
  title: 'VAN Program',
  description: 'About the Vates Alliance Network program and value proposition.',
});
</script>
