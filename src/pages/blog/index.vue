<template>
  <main>
    <div class="container mx-auto max-w-[768px]">
      <h1>Blog</h1>
      <component :is="post" />
    </div>
  </main>
</template>

<script setup lang="ts">
// import Slope from './posts/slope.md'
import { useRoute } from 'vue-router'
const route = useRoute()
// dynamic import by url params
const posts = import.meta.glob('./posts/*.md', { eager: true })
const post = posts['./posts/slope.md'].default
console.log('🚀 ~ file: index.vue:17 ~ post:', post)
</script>
