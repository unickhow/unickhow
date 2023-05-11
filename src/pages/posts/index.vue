<template>
  <main>
    <div class="container mx-auto max-w-[666px] py-10 flex flex-col gap-12">
      <div
        v-for="post in posts"
        :key="post.path">
        <router-link
          :to="post.path">
          <div class="flex flex-col sm:flex-row sm:items-end">
            <div class="mr-auto">
              <h2 class="text-xl text-dark dark:text-pale">{{ post.title }}</h2>
              <p class="text-grey dark:text-pale opacity-70">{{ post.description }}</p>
            </div>
            <span class="text-dark dark:text-pale">{{ formatDate(post.date) }}</span>
          </div>
        </router-link>
        <div class="flex gap-2 mt-2">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="bg-orange px-2 rounded-xl text-white opacity-70 text-sm">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<route lang="yaml">
  name: Posts
  meta:
    requiresAuth: true
  </route>

<script setup lang="ts">
import { formatDate } from '../../utils/helper'
import { useRouter } from 'vue-router'
import { FrontMatter } from '../../types'

const router = useRouter()
const routes = router.getRoutes()

const posts = routes.filter((route) => {
  return /^\/posts\//.test(route.path)
}).map((route) => {
  const { path, meta: { frontmatter } } = route
  const { title, description, date, tags, schedule, hidden } = frontmatter as FrontMatter

  return {
    path: path,
    title: title,
    description: description,
    date: date,
    tags: tags,
    schedule: schedule,
    hidden: hidden
  }
}).filter(post => {
  return !post.hidden && (new Date(post.schedule) < new Date())
}).sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
})
</script>
