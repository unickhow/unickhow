<template>
  <div class="flex flex-col h-full">
    <nav class="header p-4">
      <div class="container mx-auto max-w-[1024px] flex">
        <div class="flex gap-4">
          <router-link :to="{ name: 'Home' }" class="text-gray dark:text-pale">Home</router-link>
          <router-link :to="{ name: 'Blog' }" class="text-gray dark:text-pale">Blog</router-link>
        </div>
        <ThemeToggler class="ml-auto" />
      </div>
    </nav>

    <router-view></router-view>

    <footer class="mt-auto text-center py-2">
      <p
        class="opacity-50 hover:opacity-100 transition-opacity text-xs text-gray text-center p-1 rounded w-1/2 mx-auto"
        @click="startRecording">Tips: what if JARVIS does exist?</p>
      <a class="opacity-50 hover:opacity-100 transition-opacity text-gray dark:text-pale" href="https://github.com/unickhow" target="_blank">
        <zmdiGithubBox class="align-middle" />
      </a>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { useHead } from '@vueuse/head'
import zmdiGithubBox from '~icons/zmdi/github-box'
import ThemeToggler from './components/ThemeToggler.vue'
import { useMagicVocal } from './components/magicVocal';

useHead({
  title: '<unickhow />',
  meta: [
    {
      name: 'description',
      content: 'aka unickhow\'s portfolio.'
    }
  ]
})
const { init, startRecording } = useMagicVocal()
init()
</script>

<style></style>
