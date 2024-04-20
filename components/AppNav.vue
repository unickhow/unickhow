<template>
  <nav class="header fixed w-full left-0 top-0 z-50 px-4">
    <div ref="navContainer" class="nav-container mx-auto max-w-[1024px] flex p-4">
      <div v-if="!isSmallScreen" class="flex gap-4 items-center">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          :class="{
            '!text-primary': isActivePath(link),
          }"
          class="tc-content-text hover:text-primary transition-color flex items-center gap-1 p-2">
          <ClientOnly>
            <Icon :name="link.icon" />
          </ClientOnly>
          <span class="hidden sm:block text-sm">{{ link.name }}</span>
        </NuxtLink>
      </div>
      <ThemeToggler class="ml-auto" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import ThemeToggler from './ThemeToggler.vue'
import { useBreakpoints } from '@vueuse/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (!import.meta.env.SSR) {
  gsap.registerPlugin(ScrollTrigger)
}

const breakpoints = useBreakpoints({
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

const isSmallScreen = breakpoints.smaller('tablet')

const router = useRouter()
const isInPostRoute = computed(() => router.currentRoute.value.name === 'slug')
const navLinks = computed(() => [
  {
    name: 'Index',
    path: '/',
    icon: 'ri:seedling-fill',
    children: []
  },
  {
    name: 'Thoughts',
    path: '/thoughts',
    icon: 'mdi:head-lightbulb',
    children: ['slug']
  },
  {
    name: 'Attempts',
    path: '/attempts',
    icon: 'mdi:nintendo-game-boy',
    children: []
  }
])
function isActivePath (link: typeof navLinks.value[0]) {
  return router.currentRoute.value.path === link.path || link.children?.includes(router.currentRoute.value.name as string)
}

const navContainer = ref<HTMLElement | null>(null)
const trigger = ref<ScrollTrigger | null>(null)
function setupNavTweens () {
  navContainer.value = document.querySelector('.nav-container')
  trigger.value = ScrollTrigger.create({
    trigger: 'main',
    start: '30 top',
    end: 'bottom bottom',
    toggleActions: 'play none none reverse',
    onEnter: () => {
      navContainer.value?.classList.add('is-scrolling')
    },
    onLeaveBack: () => {
      navContainer.value?.classList.remove('is-scrolling')
    },
    onUpdate: self => {
      if (!isInPostRoute.value) {
        return navContainer.value?.classList.remove('is-less-foggy')
      }
      if (isSmallScreen.value) {
        self.direction === -1
          ? navContainer.value?.classList.remove('is-less-foggy')
          : navContainer.value?.classList.add('is-less-foggy')
      }
    }
  })
}
async function destroyNavTweens () {
  trigger.value?.kill()
  return Promise.resolve(true)
}

onMounted(() => {
  setupNavTweens()
})
onUnmounted(() => {
  destroyNavTweens()
})

watch(router.currentRoute, async () => {
  await nextTick()
  ScrollTrigger.refresh()
})
</script>

<style scoped>
.nav-container {
  backdrop-filter: blur(5px);
  border: 1px solid transparent;
  width: 100%;
  margin: 0 auto;
  transition:
    all .3s ease-in-out;
}
.nav-container.is-scrolling {
  max-width: 996px;
  width: calc(100% - .5rem);
  backdrop-filter: blur(15px);
  transform: translateY(1rem);
  border: 1px solid rgba(209, 213, 219, 0.3);
  @apply rounded-lg shadow-lg;
}
.nav-container.is-less-foggy {
  backdrop-filter: blur(0px);
  border: 1px solid transparent;
  @apply shadow-none;
}
</style>