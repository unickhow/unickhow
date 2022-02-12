<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'

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
html.dark {
  background: var(--c__black);
}
</style>
