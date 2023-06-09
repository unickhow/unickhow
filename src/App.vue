<template>
  <AppNav />

  <router-view></router-view>

  <footer class="mt-auto text-center py-2">
    <p
      class="opacity-50 hover:opacity-100 transition-opacity text-xs text-gray text-center p-1 rounded w-1/2 mx-auto"
      @click="startRecording">Tips: what if JARVIS does exist?</p>
    <a class="opacity-50 hover:opacity-100 transition-opacity text-gray dark:text-pale" href="https://github.com/unickhow" target="_blank">
      <zmdiGithubBox class="align-middle" />
    </a>
  </footer>

  <SpeedDial />
</template>
<script setup lang="ts">
// import { useHead } from '@vueuse/head'
import zmdiGithubBox from '~icons/zmdi/github-box'
import { useMagicVocal } from './components/magicVocal'
import AppNav from './components/AppNav.vue'
import SpeedDial from './components/SpeedDial.vue'

// useHead({
//   meta: [
//     {
//       name: 'description',
//       content: 'aka unickhow\'s portfolio.'
//     }
//   ]
// })
const { init, startRecording } = useMagicVocal()
init()
</script>

<style scoped>
</style>
