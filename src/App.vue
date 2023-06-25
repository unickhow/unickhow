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
  <FileList />
  <TokSpinner />
</template>
<script setup lang="ts">
import zmdiGithubBox from '~icons/zmdi/github-box'
import { useMagicVocal } from './components/magicVocal'
import AppNav from './components/AppNav.vue'
import SpeedDial from './components/SpeedDial.vue'
import FileList from './components/FileList.vue'
import TokSpinner from './components/TokSpinner.vue'
import { useHead } from '@vueuse/head'

useHead({
  titleTemplate: '%s | <unickhow />',
  title: '<unickhow />',
  meta: [
    {
      name: 'description',
      content: 'frontend explorer, driven by interest'
    },
    {
      property: 'og:title',
      content: 'unickhow'
    },
    {
      property: 'og:description',
      content: 'frontend explorer, driven by interest'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:image',
      content: 'https://hackmd.io/_uploads/ByO3VfeP3.png'
    },
    {
      property: 'og:url',
      content: 'https://unick.how/'
    },
    {
      property: 'og:site_name',
      content: 'unickhow'
    },
    {
      property: 'og:image:width',
      content: '480'
    },
    {
      property: 'og:image:height',
      content: '272'
    },
    {
      name: 'twitter:site',
      content: 'https://unick.how/'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:image',
      content: 'https://hackmd.io/_uploads/ByO3VfeP3.png'
    }
  ]
})

const { init, startRecording } = useMagicVocal()
init()
</script>

<style scoped>
</style>
