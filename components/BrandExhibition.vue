<template>
  <ClientOnly>
    <div
      id="logo"
      class="items-center justify-center w-full h-full"
      :class="{ 'is-ready': isGltfLoaded }">
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const { isGltfLoaded } = useBrandModel('#logo')
</script>

<style scope>
#logo {
  @apply opacity-0;
  transform: scale(1.4);
  filter: blur(20px);
  transition:
    opacity 2s ease-in-out 0.8s,
    transform 1s ease-in-out 0.8s,
    filter 1s ease-in-out 0.8s;
  will-change: opacity, transform, filter;
}

#logo.is-ready {
  @apply opacity-100;
  transform: scale(1);
  filter: blur(0);
}
</style>
