<template>
  <LoadingState v-if="pending" />
  <ErrorState v-else-if="error" :message="error.message" />

  <section v-else-if="guide" class="space-y-6">
    <div class="hero rounded-box bg-base-300">
      <div class="hero-content w-full flex-col items-start gap-3 px-6 py-8">
        <p class="text-xs uppercase tracking-wide text-primary">{{ t('guide.label') }}</p>
        <h1 class="text-4xl font-bold">{{ guide.title }}</h1>
        <p class="text-base-content/70">{{ guide.summary || t('common.noSummary') }}</p>
      </div>
    </div>

    <article v-if="hasGuideAccess" class="card border border-base-300 bg-base-100">
      <div class="card-body">
        <h2 class="card-title">{{ t('guide.content') }}</h2>
        <MarkdownContent v-if="guide.body" :source="guide.body" />
        <p v-else>{{ t('guide.noBody') }}</p>
      </div>
    </article>
    <article v-else class="card border border-base-300 bg-base-100">
      <div class="card-body space-y-4">
        <h2 class="card-title">{{ t('guide.accessTitle') }}</h2>
        <p class="text-sm text-base-content/70">
          {{ t('guide.accessIntro') }}
        </p>

        <form class="grid gap-3 md:grid-cols-2" @submit.prevent="unlockGuide">
          <label class="form-control">
            <span class="label-text">{{ t('guide.fullName') }}</span>
            <input
              v-model.trim="form.fullName"
              required
              type="text"
              class="input input-bordered"
              autocomplete="name"
            />
          </label>

          <label class="form-control">
            <span class="label-text">{{ t('guide.businessEmail') }}</span>
            <input
              v-model.trim="form.email"
              required
              type="email"
              class="input input-bordered"
              autocomplete="email"
            />
          </label>

          <label class="form-control">
            <span class="label-text">{{ t('guide.company') }}</span>
            <input
              v-model.trim="form.company"
              required
              type="text"
              class="input input-bordered"
              autocomplete="organization"
            />
          </label>

          <label class="form-control">
            <span class="label-text">{{ t('guide.jobTitle') }}</span>
            <input
              v-model.trim="form.jobTitle"
              required
              type="text"
              class="input input-bordered"
              autocomplete="organization-title"
            />
          </label>

          <label class="form-control md:col-span-2">
            <span class="label-text">{{ t('guide.countryOptional') }}</span>
            <input v-model.trim="form.country" type="text" class="input input-bordered" />
          </label>

          <label class="label md:col-span-2 cursor-pointer justify-start gap-2">
            <input v-model="form.optIn" type="checkbox" class="checkbox checkbox-sm" />
            <span class="label-text">{{ t('guide.optIn') }}</span>
          </label>

          <p v-if="formError" class="text-sm text-error md:col-span-2">{{ formError }}</p>

          <div class="md:col-span-2">
            <button class="btn btn-primary" :disabled="submitting" type="submit">
              {{ submitting ? t('guide.submitting') : t('guide.unlock') }}
            </button>
          </div>
        </form>
      </div>
    </article>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">{{ t('guide.relatedSolutions') }}</h2>
      <div v-if="solutions.length" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink
          v-for="item in solutions"
          :key="item.documentId || item.id || item.slug"
          :to="`/solutions/${item.slug}`"
          class="card border border-base-300 bg-base-100 transition hover:shadow-md"
        >
          <div class="card-body">
            <h3 class="card-title text-lg">{{ item.name }}</h3>
            <p v-if="item.vendor?.slug" class="text-sm text-base-content/70">
              {{ t('common.by') }}
              <span class="font-medium">{{ item.vendor.name }}</span>
            </p>
            <p class="text-sm text-base-content/80">
              {{ item.shortDescription || t('common.noSummary') }}
            </p>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100">
        <span>{{ t('guide.noRelatedSolutions') }}</span>
      </div>
    </section>

    <section class="space-y-3">
      <h2 class="text-2xl font-bold">{{ t('guide.products') }}</h2>
      <div v-if="products.length" class="flex flex-wrap gap-2">
        <span
          v-for="product in products"
          :key="product.documentId || product.id || product.slug"
          class="badge badge-outline"
        >
          {{ product.name }}
        </span>
      </div>
      <div v-else class="alert border border-base-300 bg-base-100">
        <span>{{ t('guide.noRelatedProducts') }}</span>
      </div>
    </section>
  </section>

  <div v-else class="alert border border-base-300 bg-base-100">
    <span>{{ t('guide.notFound') }}</span>
  </div>
</template>

<script setup lang="ts">
  const { t } = useL10n();
  const route = useRoute();
  const slug = computed(() => String(route.params.slug || ''));
  const { data, pending, error } = await useFetch(() => `/api/solution-guides/${slug.value}`);

  const guide = computed(() => data.value?.guide || null);
  const solutions = computed(() => data.value?.solutions || []);
  const products = computed(() => data.value?.products || []);

  const guideAccessCookie = useCookie<string>('sg_access', {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
  });
  const guideLeadProfileCookie = useCookie<string>('sg_lead_profile', {
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
  });

  const form = reactive({
    fullName: '',
    email: '',
    company: '',
    jobTitle: '',
    country: '',
    optIn: true,
  });
  const submitting = ref(false);
  const formError = ref('');
  const autoUnlockTried = ref(false);

  const unlockedSlugs = computed(
    () =>
      new Set(
        String(guideAccessCookie.value || '')
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean)
      )
  );
  const hasGuideAccess = computed(() => unlockedSlugs.value.has(slug.value));

  type LeadProfile = {
    fullName: string;
    email: string;
    company: string;
    jobTitle: string;
    country?: string;
    optIn?: boolean;
  };

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isValidLeadProfile(value: any): value is LeadProfile {
    return Boolean(
      value &&
        typeof value.fullName === 'string' &&
        value.fullName.trim() &&
        typeof value.email === 'string' &&
        isValidEmail(value.email.trim()) &&
        typeof value.company === 'string' &&
        value.company.trim() &&
        typeof value.jobTitle === 'string' &&
        value.jobTitle.trim()
    );
  }

  const savedLeadProfile = computed<LeadProfile | null>(() => {
    const raw = String(guideLeadProfileCookie.value || '').trim();
    if (!raw) return null;
    try {
      const parsed = JSON.parse(decodeURIComponent(raw));
      return isValidLeadProfile(parsed)
        ? {
            fullName: parsed.fullName.trim(),
            email: parsed.email.trim(),
            company: parsed.company.trim(),
            jobTitle: parsed.jobTitle.trim(),
            country: String(parsed.country || '').trim(),
            optIn: Boolean(parsed.optIn),
          }
        : null;
    } catch {
      return null;
    }
  });

  function persistLeadProfile(profile: LeadProfile) {
    guideLeadProfileCookie.value = encodeURIComponent(
      JSON.stringify({
        fullName: profile.fullName,
        email: profile.email,
        company: profile.company,
        jobTitle: profile.jobTitle,
        country: profile.country || '',
        optIn: Boolean(profile.optIn),
      })
    );
  }

  function applyProfileToForm(profile: LeadProfile) {
    form.fullName = profile.fullName;
    form.email = profile.email;
    form.company = profile.company;
    form.jobTitle = profile.jobTitle;
    form.country = profile.country || '';
    form.optIn = Boolean(profile.optIn);
  }

  function addGuideAccess(targetSlug: string) {
    const values = new Set(
      String(guideAccessCookie.value || '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean)
    );
    values.add(targetSlug);
    guideAccessCookie.value = Array.from(values).join(',');
  }

  async function submitLead(
    profile: LeadProfile,
    accessMethod: 'form_submit' | 'cookie_reuse',
    showErrors = true
  ) {
    const query = route.query || {};
    try {
      await $fetch('/api/access/solution-guide-contact', {
        method: 'POST',
        body: {
          documentType: 'SG',
          guideSlug: slug.value,
          guideTitle: guide.value?.title || '',
          eventType: 'unlock',
          accessMethod,
          fullName: profile.fullName,
          email: profile.email,
          company: profile.company,
          jobTitle: profile.jobTitle,
          country: profile.country || '',
          optIn: Boolean(profile.optIn),
          pageUrl: route.fullPath || '',
          referrer: import.meta.client ? document.referrer || '' : '',
          utmSource: String(query.utm_source || ''),
          utmMedium: String(query.utm_medium || ''),
          utmCampaign: String(query.utm_campaign || ''),
        },
      });
      addGuideAccess(slug.value);
      persistLeadProfile(profile);
      return true;
    } catch (err: any) {
      if (showErrors) {
        formError.value =
          err?.data?.statusMessage || err?.message || t('guide.formSubmitError');
      }
      return false;
    }
  }

  async function unlockGuide() {
    formError.value = '';
    if (!form.fullName || !form.email || !form.company || !form.jobTitle) {
      formError.value = t('guide.formRequired');
      return;
    }
    if (!isValidEmail(form.email)) {
      formError.value = t('guide.formInvalidEmail');
      return;
    }

    submitting.value = true;
    try {
      await submitLead(
        {
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          jobTitle: form.jobTitle.trim(),
          country: form.country.trim(),
          optIn: Boolean(form.optIn),
        },
        'form_submit',
        true
      );
    } finally {
      submitting.value = false;
    }
  }

  watchEffect(async () => {
    if (import.meta.server) return;
    if (!slug.value || hasGuideAccess.value || autoUnlockTried.value) return;
    if (!savedLeadProfile.value) return;

    autoUnlockTried.value = true;
    formError.value = '';
    applyProfileToForm(savedLeadProfile.value);
    submitting.value = true;
    try {
      await submitLead(savedLeadProfile.value, 'cookie_reuse', false);
    } finally {
      submitting.value = false;
    }
  });

  useServerSeoMeta({
    title: () =>
      guide.value?.title ? `${guide.value.title} | ${t('guide.label')}` : t('guide.seoFallbackTitle'),
    description: () => guide.value?.summary || t('guide.seoDescription'),
  });
</script>
