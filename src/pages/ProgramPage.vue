<template>
  <PageHero eyebrow="Program" title="About the VAN Program">
    <p>
      This static page is the foundation for VAN messaging before full CMS
      integration into the main Vates website.
    </p>
  </PageHero>

  <SurfacePanel>
    <h2 class="mt-0 mb-3 text-2xl font-bold">What VAN delivers</h2>
    <ul class="m-0 pl-5">
      <li>Alliance-based collaboration between Vates and vendor organizations</li>
      <li>Curated solutions to customer challenges</li>
      <li>Reusable knowledge assets for implementation and adoption</li>
    </ul>
  </SurfacePanel>
</template>

<script setup>
import PageHero from '../components/PageHero.vue';
import SurfacePanel from '../components/SurfacePanel.vue';
</script>
