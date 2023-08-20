<template>
  <div
    v-if="shouldShowDial"
    id="speed-dial"
    class="fixed z-50 bottom-5 right-5 rounded-full w-12 h-12 flex items-center justify-center text-white bg-orange cursor-pointer transition-all z-50"
    :class="[
      scrollDirection === 'down' ? 'opacity-37 right-2' : 'opacity-100',
      {'text-orange bg-white !opacity-100 !right-5 shadow-lg': isDialing}
    ]"
    @click="isDialing = !isDialing">
    <Icon name="ri:apps-fill" class="text-2xl transform transition" :class="{ 'rotate-45 text-orange': isDialing }" />
    <div class="dial-menu">
      <router-link :to="{ name: 'index' }" :class="{'!right-17 !opacity-100 !pointer-events-auto': isDialing}">
        <Icon name="ri:seedling-fill" />
      </router-link>
      <router-link :to="{ name: 'posts' }" :class="{'!right-31 !opacity-100 !pointer-events-auto': isDialing}">
        <Icon name="tabler:books" />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
})

const shouldShowDial = breakpoints.smaller('tablet')
const isDialing = ref(false)

const lastYPosition = ref(0)
const scrollDirection = ref('down')
function handleScrollProgress () {
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  )
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollPercent = (scrollTop / (documentHeight - window.innerHeight)) * 100
  // TODO: back to top button
  // console.debug('🚀scrollPercent:', scrollPercent)

  scrollDirection.value = scrollTop > lastYPosition.value
    ? 'down'
    : 'up'

  lastYPosition.value = scrollTop
}

if (!import.meta.env.SSR) {
  onMounted(() => {
    window.addEventListener('scroll', handleScrollProgress)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScrollProgress)
  })
}

</script>

<style scoped>
.dial-menu a {
  @apply rounded-full w-9 h-9 absolute text-white bg-orange flex items-center justify-center text-sm transition-all opacity-0 right-0 pointer-events-none shadow-lg;
  bottom: 0rem
}
</style>
