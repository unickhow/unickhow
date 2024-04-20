
<script setup lang="ts">
import { formatDate } from '~/utils/helper'
import type { FrontMatter, ThoughtsCalendar } from '~/types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (!import.meta.env.SSR) {
  gsap.registerPlugin(ScrollTrigger)
}

useHead({
  title: 'Thoughts',
  meta: [
    {
      name: 'description',
      content: 'All thoughts'
    },
    {
      name: 'og:description',
      content: 'All thoughts'
    },
    {
      name: 'og:image',
      content: 'https://hackmd.io/_uploads/SylCzI7Ja.png'
    },
    {
      name: 'twitter:description',
      content: 'All thoughts'
    },
    {
      name: 'twitter:image',
      content: 'https://hackmd.io/_uploads/SylCzI7Ja.png'
    }
  ]
})

const contentQuery = await queryContent('thoughts')
  .where({ hidden: { equals: false } })
  .find()

function organizingThoughts (thoughts: FrontMatter[]): ThoughtsCalendar[] {
  const result = [] as any[]

  for (const thought of thoughts) {
    const year = thought.date.split('-')[0]
    const date = new Date(thought.date)
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
      date: thought.date,
      day: dayName,
      thought
    })
  }

  return result
}

const router = useRouter()
const allTags = computed(() => {
  const result = {} as any
  for (const thought of thoughts.value) {
    for (const tag of thought.tags) {
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
  await nextTick()
  resetTweens()
}, {
  immediate: true
})

const thoughts = computed(() => contentQuery.filter((thought: any) => {
    return /^\/thoughts\//.test(thought._path)
  }).map((thought) => {
    const { title, description, date, tags, schedule, hidden, _path: path } = thought

    return {
      path,
      title,
      description,
      date,
      tags,
      schedule,
      hidden
    } as FrontMatter
  }).filter(thought => {
    return (new Date(thought.schedule) < new Date())
  }).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
)

const filteredThoughts = computed(() => {
  if (filteredTags.value.length) {
    return thoughts.value.filter((thought) => {
      return filteredTags.value.some((tag) => thought.tags.includes(tag))
    })
  } else {
    return thoughts.value
  }
})

const thoughtsInOrder = computed(() => organizingThoughts(filteredThoughts.value))

const isFilterVisible = ref(true)
const filterPanelHeight = ref('')

const tweens = ref<any[]>([])
const { isDark } = useTheme()
function setupThoughtTweens () {
  if (import.meta.env.SSR) return
  const years = gsap.utils.toArray('.thoughts__year')
  years.forEach((year: any) => {
    const yearText = year.querySelector('.thoughts__year__text')
    const yearTextTween = gsap.fromTo(yearText, {
      opacity: 0,
      x: -100
    }, {
      opacity: .1,
      x: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: year,
        start: 'top 90%',
        end: 'bottom bottom-=20',
        scrub: true
      }
    })
    tweens.value.push(yearTextTween)
    const months = gsap.utils.toArray(year.querySelectorAll('.thoughts__year__month'))
    months.forEach((month: any) => {
      const monthText = month.querySelector('.thoughts__year__month__text')
      const monthTextTween = gsap.fromTo(monthText, {
        opacity: 0,
        y: -50
      }, {
        opacity: isDark.value ? 0.5 : 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: month,
          start: 'top 90%',
          end: 'bottom bottom-=20',
          scrub: true
        }
      })
      tweens.value.push(monthTextTween)
      const thoughts = gsap.utils.toArray(month.querySelectorAll('.thoughts__year__month__thought'))
      const thoughtsTween = gsap.fromTo(thoughts, {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: month,
          start: 'top 90%',
          end: 'bottom bottom-=20',
          scrub: true
        }
      })
      tweens.value.push(thoughtsTween)
    })
  })
}
function destroyThoughtTweens () {
  return new Promise((resolve) => {
    tweens.value.forEach((tween) => {
      tween?.kill()
    })
    tweens.value = []
    resolve(true)
  })
}

function resetTweens () {
  destroyThoughtTweens().then(() => {
    setupThoughtTweens()
    ScrollTrigger.refresh()
  })
}

watch(isDark, () => {
  resetTweens()
})

onMounted(() => {
  filterPanelHeight.value = `${document.querySelector('.all-tags')?.scrollHeight}px`
  resetTweens()
})
function handleFilterToggle () {
  if (isFilterVisible.value) {
    filterPanelHeight.value = '0px'
  } else {
    filterPanelHeight.value = `${document.querySelector('.all-tags')?.scrollHeight}px`
  }
  isFilterVisible.value = !isFilterVisible.value
}

onUnmounted(() => {
  destroyThoughtTweens()
})
</script>

<template>
  <div class="container mx-auto max-w-[666px] py-10 px-4 flex flex-col gap-6 sm:gap-12">
    <div>
      <div class="flex items-center mb-4">
        <button class="py-2 flex items-center justify-center text-primary font-bold w-full" @click="handleFilterToggle">
          <span>Filter {{ filteredTags.length ? `(${filteredTags.length})` : null }}</span>
          <ClientOnly>
            <Icon :name="isFilterVisible ? 'mdi:arrow-collapse-vertical' : 'mdi:arrow-expand-vertical'" class="text-xl ml-2"></Icon>
          </ClientOnly>
        </button>

        <button
          v-if="filteredTags.length"
          class="p-1 w-8 h-8 text-gray dark:text-pale hover:text-primary flex-shrink-0"
          @click="clearTags">
          <ClientOnly>
            <Icon name="mdi:tag-remove" class="w-4 h-4 transition-all"></Icon>
          </ClientOnly>
        </button>
      </div>
      <div class="all-tags flex flex-wrap items-center gap-2 max-h-0 overflow-hidden" :class="{ 'is-expanded': isFilterVisible }">
        <div
          v-for="tag in Object.keys(allTags)"
          :key="`all-tags__${tag}`"
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
      v-for="group in thoughtsInOrder"
      :key="group.year"
      class="thoughts__year relative">
      <p class="thoughts__year__text text-9xl opacity-5 font-bold absolute sm:-left-10 -top-3 select-none dark:text-pale pointer-events-none">{{ group.year }}</p>

      <div
        v-for="subGroup in group.months"
        class="thoughts__year__month mb-10">
        <p class="thoughts__year__month__text text-right text-2xl dark:text-pale dark:opacity-50">{{ subGroup.month }}</p>
        <div class="flex flex-col gap-8">
          <div
            v-for="item in subGroup.dates"
            :key="`${group.year}__${item.date}__${item.thought.title}`"
            class="thoughts__year__month__thought">
            <router-link :to="item.thought.path" class="border-l-3 border-transparent block py-2 md:hover:pl-2 transition-all">
              <div class="flex flex-col sm:flex-row sm:items-end gap-4">
                <div class="mr-auto">
                  <h2 class="text-lg text-dark dark:text-pale">{{ item.thought.title }}</h2>
                  <p class="text-grey dark:text-pale opacity-70 text-sm">{{ item.thought.description }}</p>
                </div>
                <span class="text-dark dark:text-pale text-sm">{{ formatDate(item.thought.date) }}</span>
              </div>
            </router-link>
            <div class="flex flex-wrap gap-3 mt-2">
              <TagLabel
                v-for="tag in item.thought.tags"
                :key="item.thought.title + tag"
                :value="tag"
                @click="addTagFilter(tag)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.all-tags {
  transition: max-height 0.3s ease-in-out;
}
.all-tags.is-expanded {
  max-height: v-bind(filterPanelHeight) !important;
}
</style>
