
<script setup lang="ts">
import { formatDate } from '~/utils/helper'
import type { FrontMatter, PostsCalendar } from '~/types'

useHead({
  title: 'Posts',
  meta: [
    {
      name: 'description',
      content: 'All posts'
    },
    {
      name: 'og:description',
      content: 'All posts'
    },
    {
      name: 'og:image',
      content: 'https://hackmd.io/_uploads/ByO3VfeP3.png'
    },
    {
      name: 'twitter:description',
      content: 'All posts'
    },
    {
      name: 'twitter:image',
      content: 'https://hackmd.io/_uploads/ByO3VfeP3.png'
    }
  ]
})

const contentQuery = await queryContent('posts')
  .where({ hidden: { equals: false } })
  .find()

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

const router = useRouter()
const allTags = computed(() => {
  const result = {} as any
  for (const post of posts.value) {
    for (const tag of post.tags) {
      if (!result[tag]) {
        result[tag] = 0
      }
      result[tag]++
    }
  }
  return result
})
const filteredTags = ref<string[]>([])
function addTagFilter (tag: string) {
  if (filteredTags.value.includes(tag)) {
    filteredTags.value = filteredTags.value.filter((item) => item !== tag)
  } else {
    filteredTags.value.push(tag)
  }
  router.push({
    query: {
      ...filteredTags.value.length ? { tags: filteredTags.value.join(',') } : {}
    }
  })
}

function clearTags () {
  filteredTags.value = []
  router.push({
    query: {}
  })
}

watch(() => router.currentRoute.value.query.tags, async (tags) => {
  if (typeof tags === 'string') {
    filteredTags.value = tags.split(',')
  } else {
    filteredTags.value = []
  }
}, {
  immediate: true
})

const posts = computed(() => contentQuery.filter((post: any) => {
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
)

const filteredPosts = computed(() => {
  if (filteredTags.value.length) {
    return posts.value.filter((post) => {
      return filteredTags.value.some((tag) => post.tags.includes(tag))
    })
  } else {
    return posts.value
  }
})

const postsInOrder = computed(() => organizingPosts(filteredPosts.value))

const isFilterVisible = ref(true)
const filterPanelHeight = ref('')
onMounted(() => {
  filterPanelHeight.value = `${document.querySelector('.all-tags')?.scrollHeight}px`
})
function handleFilterToggle () {
  if (isFilterVisible.value) {
    filterPanelHeight.value = '0px'
  } else {
    filterPanelHeight.value = `${document.querySelector('.all-tags')?.scrollHeight}px`
  }
  isFilterVisible.value = !isFilterVisible.value
}
</script>

<template>
  <main>
    <div class="container mx-auto max-w-[666px] py-10 px-4 flex flex-col gap-6 sm:gap-12">
      <div>
        <div class="flex items-center mb-4">
          <button class="py-2 flex items-center justify-center text-primary font-bold w-full" @click="handleFilterToggle">
            <span>Filter {{ filteredTags.length ? `(${filteredTags.length})` : null }}</span>
            <Icon :name="isFilterVisible ? 'mdi:arrow-collapse-vertical' : 'mdi:arrow-expand-vertical'" class="text-xl ml-2"></Icon>
          </button>

          <button
            v-if="filteredTags.length"
            class="p-1 w-8 h-8 text-gray dark:text-pale hover:text-primary flex-shrink-0"
            @click="clearTags">
            <Icon
              name="mdi:tag-remove"
              class="w-4 h-4 transition-all"></Icon>
          </button>
        </div>
        <div class="all-tags flex flex-wrap items-center gap-2 max-h-0 overflow-hidden" :class="{ 'is-expanded': isFilterVisible }">
          <div
            v-for="tag in Object.keys(allTags)"
            :key="tag"
            :value="tag"
            class="shadow px-2 py-1 flex gap-2 items-center cursor-pointer dark:bg-dark dark:text-pale transition-all rounded opacity-40"
            :class="{
              '!bg-orange !text-white !opacity-100': filteredTags.includes(tag),
              '!hover:text-primary !hover:opacity-100': !filteredTags.includes(tag)
            }"
            @click="addTagFilter(tag)">
            <span>{{ tag }}</span>
            <small>({{ allTags[tag] }})</small>
          </div>
        </div>
      </div>

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
              <div class="flex flex-wrap gap-3 mt-2">
                <TagLabel
                  v-for="tag in item.post.tags"
                  :key="item.post.title + tag"
                  :value="tag"
                  @click="addTagFilter(tag)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.all-tags {
  transition: max-height 0.3s ease-in-out;
}
.all-tags.is-expanded {
  max-height: v-bind(filterPanelHeight) !important;
}
</style>
