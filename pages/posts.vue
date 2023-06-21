
<script setup lang="ts">
import { formatDate } from '~/utils/helper'
import type { FrontMatter, PostsCalendar } from '~/types'
const contentQuery = await queryContent('posts').where({ hidden: { equals: false } }).find()

function organizingPosts (posts: FrontMatter[]): PostsCalendar[] {
  const result = [] as any[]

  for (const post of posts) {
    const year = post.date.split('-')[0]
    const date = new Date(post.date)
    const monthName = date.toLocaleString('en-US', { month: 'short' })
    const dayName = date.toLocaleString('en-US', { weekday: 'long' })

    let yearItem = result.find((item) => item.year === year)
    if (!yearItem) {
      yearItem = { year, months: [] }
      result.push(yearItem)
    }

    let monthItem = yearItem.months.find((item: any) => item.month === monthName)
    if (!monthItem) {
      monthItem = { month: monthName, dates: [] }
      yearItem.months.push(monthItem)
    }

    monthItem.dates.push({
      date: post.date,
      day: dayName,
      post
    })
  }

  return result
}

const posts: FrontMatter[] = contentQuery.filter((post: any) => {
  return /^\/posts\//.test(post._path)
}).map((post) => {
  const { title, description, date, tags, schedule, hidden, _path: path } = post

  return {
    path,
    title,
    description,
    date,
    tags,
    schedule,
    hidden
  } as FrontMatter
}).filter(post => {
  return (new Date(post.schedule) < new Date())
}).sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
})

const postsInOrder = organizingPosts(posts)
</script>

<template>
  <main>
    <div class="container mx-auto max-w-[666px] py-10 px-4 mt-10 flex flex-col gap-12">
      <div
        v-for="group in postsInOrder"
        :key="group.year"
        class="posts__year relative">
        <p class="text-9xl opacity-5 font-bold absolute sm:-left-10 -top-3 select-none dark:text-pale pointer-events-none">{{ group.year }}</p>

        <div
          v-for="subGroup in group.months"
          class="posts__year__month mb-10">
          <p class="text-right text-2xl dark:text-pale dark:opacity-50">{{ subGroup.month }}</p>
          <div class="flex flex-col gap-8">
            <div
              v-for="item in subGroup.dates"
              :key="item.date"
              class="posts__year__month__post">
              <router-link :to="item.post.path" class="border-l-3 border-transparent block py-2 md:hover:pl-2 transition-all">
                <div class="flex flex-col sm:flex-row sm:items-end gap-4">
                  <div class="mr-auto">
                    <h2 class="text-lg text-dark dark:text-pale">{{ item.post.title }}</h2>
                    <p class="text-grey dark:text-pale opacity-70">{{ item.post.description }}</p>
                  </div>
                  <span class="text-dark dark:text-pale text-sm">{{ formatDate(item.post.date) }}</span>
                </div>
              </router-link>
              <div class="flex gap-2 mt-2">
                <TagLabel v-for="tag in item.post.tags" :key="item.post.title + tag" :value="tag" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
