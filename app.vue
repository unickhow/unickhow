<script setup lang="ts">
import { useFavicon } from '@vueuse/core'

const icon = useFavicon()
icon.value = 'favicon.gif'
</script>

<template>
  <!-- another bug 🙄, indicator always being invisible -->
  <NuxtLoadingIndicator />
  <AppNav />
  <main>
    <NuxtPage />
  </main>
  <SpeedDial />
  <ClientOnly>
    <AppFooter />
  </ClientOnly>
</template>

<style>
/* ! for page transition, see nuxt.config.ts */
/* .page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(.5rem);
} */
</style>
