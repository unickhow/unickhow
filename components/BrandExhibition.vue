<template>
  <div
    id="logo"
    class="items-center justify-center w-full h-full transition-opacity duration-2000 delay-800"
    :class="isGltfLoaded ? 'opacity-100' : 'opacity-0'">
  </div>
</template>

<script setup lang="ts">
const { isGltfLoaded } = useBrandModel('#logo')
</script>
