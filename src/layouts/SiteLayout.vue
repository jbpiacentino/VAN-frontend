<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="navbar sticky top-0 z-40 border-b border-base-300 bg-base-100/90 px-0 backdrop-blur-md"
    >
      <div
        class="mx-auto flex w-[min(1080px,92vw)] flex-wrap items-center justify-between gap-4 py-2"
      >
        <RouterLink
          to="/"
          class="btn btn-ghost px-2 text-lg font-bold tracking-[0.02em] text-[var(--brand)]"
          >Vates VAN</RouterLink
        >
        <nav class="flex flex-wrap gap-2">
          <RouterLink to="/program" class="btn btn-ghost btn-sm">{{ t('nav.program') }}</RouterLink>
          <RouterLink to="/van-finder" class="btn btn-ghost btn-sm">{{
            t('nav.vanFinder')
          }}</RouterLink>
          <RouterLink to="/solutions" class="btn btn-ghost btn-sm">{{
            t('nav.solutions')
          }}</RouterLink>
        </nav>
        <div class="inline-flex items-center gap-3 text-sm text-base-content/70">
          <label for="theme-select" class="font-medium">{{ t('common.theme') }}</label>
          <select
            id="theme-select"
            v-model="themeModel"
            class="select select-sm border-base-300 bg-base-100"
          >
            <option v-for="theme in themes" :key="theme" :value="theme">{{ theme }}</option>
          </select>
          <label for="locale-select" class="font-medium">{{ t('common.locale') }}</label>
          <select
            id="locale-select"
            v-model="localeModel"
            class="select select-sm border-base-300 bg-base-100"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>
        </div>
      </div>
    </header>

    <main class="mx-auto w-[min(1080px,92vw)] flex-1 py-10 max-[720px]:pt-6">
      <slot />
    </main>

    <footer class="footer border-t border-base-300 bg-base-100">
      <div class="mx-auto flex min-h-16 w-[min(1080px,92vw)] items-center text-[var(--muted)]">
        <p>Vates Alliance Network (VAN)</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref, watch } from 'vue';
  import { RouterLink } from 'vue-router';
  import { useI18n } from 'vue-i18n';

  const { locale, t } = useI18n({ useScope: 'global' });
  const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
  ];
  const themeModel = ref('light');

  const localeModel = computed({
    get: () => locale.value,
    set: (value) => {
      locale.value = value;
    },
  });

  onMounted(() => {
    const saved = localStorage.getItem('van-theme');
    if (saved && themes.includes(saved)) {
      themeModel.value = saved;
    } else {
      const existing = document.documentElement.getAttribute('data-theme');
      if (existing && themes.includes(existing)) {
        themeModel.value = existing;
      }
    }

    applyTheme(themeModel.value);
  });

  function applyTheme(next) {
    const theme = themes.includes(next) ? next : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.body?.setAttribute('data-theme', theme);
    localStorage.setItem('van-theme', theme);
  }

  watch(themeModel, (next) => {
    applyTheme(next);
  });
</script>
