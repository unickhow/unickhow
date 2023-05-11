<template>
  <nav class="header py-4 fixed w-full top-0 left-0 z-50">
    <div class="container mx-auto max-w-[1024px] flex">
      <div class="flex gap-4 items-center">
        <router-link :to="{ name: 'Home' }" class="text-gray dark:text-pale flex items-center gap-2">
          <riSeedlingFill />
          <span class="hidden sm:block">Index</span>
        </router-link>
        <router-link :to="{ name: 'Posts' }" class="text-gray dark:text-pale flex items-center gap-1">
          <tablerBooks />
          <span class="hidden sm:block">Posts</span>
        </router-link>
      </div>
      <ThemeToggler class="ml-auto" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import riSeedlingFill from '~icons/ri/seedling-fill'
import tablerBooks from '~icons/tabler/books'
import ThemeToggler from './ThemeToggler.vue'
</script>

<style scoped>
.header {
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
</style>
