<template>
  <div class="flex flex-col h-full">
    <nav class="header flex justify-end p-4">
      <ThemeToggler />
    </nav>

    <router-view></router-view>

    <footer class="mt-auto flex items-center justify-center py-2">
      <a class="opacity-50 hover:opacity-90 transition-opacity text-gray dark:text-pale" href="https://github.com/unickhow" target="_blank">
        <zmdiGithubBox class="align-middle" />
      </a>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { useHead } from '@vueuse/head'
import zmdiGithubBox from '~icons/zmdi/github-box'
import ThemeToggler from './components/ThemeToggler.vue'

useHead({
  title: '<unickhow />',
  meta: [
    {
      name: 'description',
      content: 'aka unickhow\'s portfolio.'
    }
  ]
})
</script>

<style>
html {
  transition: background .3s ease-in-out;
}

html.dark {
  background: var(--c__dark);
}
</style>

<style scoped>
/* .theme-icon {
  width: 30px;
  height: 30px;
  background: var(--c__theme-icon);
  transition: all 0.3s ease;
  @apply rounded-full;
}

.theme-icon.dark {
  background: transparent;
  transform: translate(-12px, -5px);
  box-shadow: 12px 5px 0 0 var(--c__theme-icon);
  opacity: .7;
} */
</style>
