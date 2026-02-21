<template>
  <LoadingState v-if="loading" />
  <ErrorState v-else-if="error" :message="error" />

  <section v-else-if="vendor" class="space-y-6">
    <div class="hero rounded-box bg-base-300">
      <div
        class="hero-content w-full flex-col items-start gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between"
      >
        <div class="space-y-2">
          <p class="text-xs uppercase tracking-wide text-base-content/60">Vendor profile</p>
          <h1 class="text-4xl font-bold">{{ vendor.name }}</h1>
          <p class="text-base-content/70">
            {{ vendor.shortDescription || 'Alliance partner profile and solution highlights.' }}
          </p>
        </div>
        <div v-if="vendor.logoUrl" class="rounded-box border border-base-300 bg-base-100 p-4">
          <img
            :src="vendor.logoUrl"
            :alt="`${vendor.name} logo`"
            class="h-20 w-auto object-contain"
          />
        </div>
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <article class="card">
        <div class="card-body">
          <h2 class="card-title">About {{ vendor.name }}</h2>
          <MarkdownContent v-if="vendor.description" :source="vendor.description" />
          <p v-else>{{ vendor.summary || 'No description available yet.' }}</p>
        </div>
      </article>

      <aside class="card bg-base-200">
        <div class="card-body space-y-3">
          <h2 class="card-title">Partner Details</h2>
          <div>
            <p class="text-sm font-semibold">VAN tier</p>
            <p class="text-base-content/80">{{ vendorTierLabel(vendor) }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">Areas of focus</p>
            <p class="text-base-content/80">{{ joinedList(vendor.areaOfFocus) }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">Regions</p>
            <p class="text-base-content/80">{{ joinedList(vendor.regions) }}</p>
          </div>
          <div>
            <p class="text-sm font-semibold">Website</p>
            <a
              v-if="vendor.website"
              :href="vendor.website"
              target="_blank"
              rel="noreferrer"
              class="link link-primary break-all"
              >{{ vendor.website }}</a
            >
            <p v-else class="text-base-content/60">N/A</p>
          </div>
          <div>
            <p class="text-sm font-semibold">Links</p>
            <ul v-if="vendor.links?.length" class="space-y-1">
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
            <p v-else class="text-base-content/60">N/A</p>
          </div>
        </div>
      </aside>
    </div>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Solution Briefs</h2>
      <div v-if="briefs.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="brief in briefs"
          :key="brief.documentId || brief.id || brief.slug || brief.title"
          class="card border border-base-300 bg-base-100"
        >
          <div class="card-body">
            <h3 class="card-title text-lg">{{ brief.title }}</h3>
            <p class="text-sm text-base-content/80">
              {{ brief.shortDescription || brief.description || 'No summary available.' }}
            </p>
          </div>
        </article>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100">
        <span>No solution briefs linked to this vendor.</span>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">Solution Guides</h2>
      <div v-if="guides.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="guide in guides"
          :key="guide.documentId || guide.id || guide.slug || guide.title"
          class="card border border-base-300 bg-base-100"
        >
          <div class="card-body">
            <h3 class="card-title text-lg">{{ guide.title }}</h3>
            <p class="text-sm text-base-content/80">
              {{ guide.summary || 'No summary available.' }}
            </p>
          </div>
        </article>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100">
        <span>No solution guides linked to this vendor.</span>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">KB Articles</h2>
      <ul v-if="kbArticles.length" class="menu rounded-box border border-base-300 bg-base-100">
        <li
          v-for="kb in kbArticles"
          :key="kb.documentId || kb.id || kb.slug || kb.title"
          class="border-b border-base-200 last:border-0"
        >
          <div class="flex items-center justify-between gap-3 py-2">
            <span class="font-medium">{{ kb.title }}</span>
            <span class="text-xs text-base-content/60">{{ kb.type || 'article' }}</span>
          </div>
        </li>
      </ul>
      <div v-else class="alert border border-base-300 bg-base-100">
        <span>No KB articles linked to this vendor.</span>
      </div>
    </section>
  </section>

  <div v-else class="alert border border-base-300 bg-base-100">
    <span>Vendor not found.</span>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import LoadingState from '../components/LoadingState.vue';
  import ErrorState from '../components/ErrorState.vue';
  import MarkdownContent from '../components/MarkdownContent.vue';
  import {
    getKnowledgeArticles,
    getSolutionBriefs,
    getSolutionGuides,
    getVendorBySlug,
  } from '../services/contentService';

  const props = defineProps({
    slug: {
      type: String,
      required: true,
    },
  });

  const loading = ref(true);
  const error = ref('');
  const vendor = ref(null);
  const briefs = ref([]);
  const guides = ref([]);
  const kbArticles = ref([]);

  function relationItems(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (Array.isArray(value.data)) return value.data;
    if (value.data && typeof value.data === 'object') return [value.data];
    if (typeof value === 'object') return [value];
    return [];
  }

  function solutionRefs(entry) {
    if (!entry || typeof entry !== 'object') return [];
    const refs = [];
    if (entry.documentId) refs.push(`doc:${entry.documentId}`);
    if (entry.id !== undefined && entry.id !== null) refs.push(`id:${entry.id}`);
    if (entry.slug) refs.push(`slug:${entry.slug}`);
    if (entry.name) refs.push(`name:${entry.name}`);
    if (entry.title) refs.push(`title:${entry.title}`);
    return refs;
  }

  function vendorSolutionRefSet(vendorEntry) {
    const refs = new Set();
    for (const solution of relationItems(vendorEntry?.solutions || vendorEntry?.raw?.solutions)) {
      for (const ref of solutionRefs(solution)) refs.add(ref);
    }
    return refs;
  }

  function entityBelongsToVendor(entity, refSet) {
    const raw = entity?.raw || entity || {};
    const candidates = [
      entity?.solution,
      raw.solution,
      entity?.solutions,
      raw.solutions,
      raw.related_solution,
      raw.related_solutions,
    ];

    for (const candidate of candidates) {
      for (const rel of relationItems(candidate)) {
        for (const ref of solutionRefs(rel)) {
          if (refSet.has(ref)) return true;
        }
      }
    }
    return false;
  }

  function joinedList(values) {
    return Array.isArray(values) && values.length ? values.join(', ') : 'N/A';
  }

  function vendorTierLabel(vendorEntry) {
    if (vendorEntry?.vanTier) return vendorEntry.vanTier;
    return 'Not a VAN member';
  }

  onMounted(async () => {
    try {
      const [vendorEntry, allBriefs, allGuides, allKb] = await Promise.all([
        getVendorBySlug(props.slug),
        getSolutionBriefs(),
        getSolutionGuides(),
        getKnowledgeArticles(),
      ]);

      vendor.value = vendorEntry;
      if (!vendorEntry) return;

      const refs = vendorSolutionRefSet(vendorEntry);
      briefs.value = allBriefs.filter((entry) => entityBelongsToVendor(entry, refs));
      guides.value = allGuides.filter((entry) => entityBelongsToVendor(entry, refs));
      kbArticles.value = allKb.filter((entry) => entityBelongsToVendor(entry, refs));
    } catch (err) {
      error.value = err.message || 'Failed to fetch vendor details.';
    } finally {
      loading.value = false;
    }
  });
</script>
