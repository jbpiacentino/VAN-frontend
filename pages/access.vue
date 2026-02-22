<template>
  <section class="mx-auto flex min-h-[70vh] w-full max-w-md items-center">
    <ClientOnly>
      <div class="card w-full border border-base-300 bg-base-100 shadow-sm">
        <div class="card-body">
          <h1 class="card-title text-2xl">Protected Access</h1>

          <label class="form-control mt-3 w-full">
            <input
              v-model="password"
              type="password"
              class="input input-bordered w-full"
              placeholder="Password"
              @keydown.enter.prevent="submit"
            />
          </label>

          <p v-if="errorMessage" class="text-sm text-error">{{ errorMessage }}</p>

          <div class="card-actions mt-2 justify-end">
            <button class="btn btn-primary" :disabled="pending || !password" @click="submit">
              {{ pending ? 'Checking...' : 'Enter' }}
            </button>
          </div>
        </div>
      </div>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
const route = useRoute();
const password = ref('');
const pending = ref(false);
const errorMessage = ref('');

  async function submit() {
    if (pending.value || !password.value) return;
    pending.value = true;
    errorMessage.value = '';
    try {
    await $fetch('/api/access/login', {
      method: 'POST',
      body: { password: password.value },
    });

    const redirect = String(route.query.redirect || '/');
    const target = redirect.startsWith('/') ? redirect : '/';
    if (import.meta.client) {
      window.location.assign(target);
      return;
    }
    await navigateTo(target);
  } catch {
    errorMessage.value = 'Invalid password';
  } finally {
    pending.value = false;
  }
}

  useServerSeoMeta({
    title: 'Access',
    description: 'Password-protected access page.',
  });
</script>
