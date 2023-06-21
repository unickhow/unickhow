<template>
  <nav class="header py-4 fixed w-full top-0 left-0 z-50">
    <div class="container mx-auto max-w-[1024px] flex px-4">
      <div v-if="!shouldShowDial" class="flex gap-4 items-center">
        <NuxtLink to="/" class="tc-content-text flex items-center gap-2">
          <Icon name="ri:seedling-fill" />
          <span class="hidden sm:block">Index</span>
        </NuxtLink>
        <NuxtLink to="/posts" class="text-gray dark:text-pale flex items-center gap-1">
          <Icon name="tabler:books" />
          <span class="hidden sm:block">Posts</span>
        </NuxtLink>
      </div>
      <ThemeToggler class="ml-auto" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import ThemeToggler from './ThemeToggler.vue'
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

const shouldShowDial = breakpoints.smaller('tablet')
</script>

<style scoped>
.header {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
</style>