<template>
  <div class="min-h-screen flex flex-col bg-base-100 text-base-content">
    <header
      v-if="!isAccessPage"
      class="navbar sticky top-0 z-40 border-b border-base-300 bg-base-100/90 px-0 backdrop-blur-md"
    >
      <div
        class="mx-auto flex w-[min(1080px,92vw)] flex-wrap items-center justify-between gap-4 py-2"
      >
        <NuxtLink to="/" class="btn btn-ghost px-2 text-lg font-bold tracking-[0.02em]">{{
          t('layout.brand')
        }}</NuxtLink>
        <nav class="flex flex-wrap gap-2">
          <NuxtLink to="/program" class="btn btn-ghost btn-sm">{{ t('nav.program') }}</NuxtLink>
          <NuxtLink to="/van-finder" class="btn btn-ghost btn-sm">{{
            t('nav.vanFinder')
          }}</NuxtLink>
          <NuxtLink to="/solutions" class="btn btn-ghost btn-sm">{{ t('nav.solutions') }}</NuxtLink>
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
      <NuxtPage />
    </main>

    <footer v-if="!isAccessPage" class="footer border-t border-base-300 bg-base-100">
      <div class="mx-auto flex min-h-16 w-[min(1080px,92vw)] items-center text-base-content/70">
        <p>{{ t('layout.footer') }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
  const { locale: localeModel, t } = useL10n();
  const route = useRoute();
  const isAccessPage = computed(() => route.path === '/access');

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

  const themeModel = useState('theme', () => 'light');

  onMounted(() => {
    const saved = localStorage.getItem('van-theme');
    if (saved && themes.includes(saved)) {
      themeModel.value = saved;
    } else {
      const current = document.documentElement.getAttribute('data-theme');
      if (current && themes.includes(current)) themeModel.value = current;
    }
    applyTheme(themeModel.value);

    const savedLocale = localStorage.getItem('van-locale');
    if (savedLocale === 'fr' || savedLocale === 'en') {
      localeModel.value = savedLocale;
    }
    applyLocale(localeModel.value);
  });

  watch(themeModel, (next) => applyTheme(next));
  watch(localeModel, (next) => applyLocale(next));

  function applyTheme(next: string) {
    const theme = themes.includes(next) ? next : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.body?.setAttribute('data-theme', theme);
    localStorage.setItem('van-theme', theme);
  }

  function applyLocale(next: 'en' | 'fr') {
    const locale = next === 'fr' ? 'fr' : 'en';
    document.documentElement.setAttribute('lang', locale);
    localStorage.setItem('van-locale', locale);
  }
</script>
