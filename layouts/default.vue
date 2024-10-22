<script setup lang="ts">
</script>

<template>
  <NuxtLoadingIndicator />
  <AppNav />
  <main class="default-layout">
    <slot />
  </main>
  <!-- TODO: remake -->
  <SpeedDial />

  <ClientOnly>
    <AppFooter />
  </ClientOnly>
</template>

<style>
</style>
