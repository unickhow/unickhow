<script setup lang="ts">
const links = [
  {
    name: 'GitHub',
    url: 'https://github.com/unickhow',
    icon: 'mdi:github-box'
  },
  {
    name: 'CodePen',
    url: 'https://codepen.io/uNickHow',
    icon: 'mdi:codepen'
  }
]
</script>

<template>
  <footer class="mt-auto py-4 flex items-center justify-center gap-2">
    <a
      v-for="link in links"
      :key="link.name"
      class="opacity-50 hover:opacity-100 transition-opacity text-gray dark:text-pale"
      :href="link.url"
      target="_blank">
      <Icon :name="link.icon" class="align-middle text-2xl" />
    </a>
  </footer>
</template>
