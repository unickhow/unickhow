<template>
  <div
    v-if="shouldShowDial"
    id="speed-dial"
    class="fixed z-50 bottom-5 right-5 rounded-full w-10 h-10 flex items-center justify-center text-white bg-orange cursor-pointer transition-all z-50"
    :class="[
      scrollDirection === 'down' ? 'opacity-37 right-2' : 'opacity-100',
      {'text-orange bg-white !opacity-100 !right-5 shadow-lg': isDialing}
    ]"
    @click="isDialing = !isDialing">
    <!-- <MdiArrowUpBold /> -->
    <RiAppsFill class="text-xl transform transition" :class="{ 'rotate-45': isDialing }" />
    <div class="dial-menu">
      <router-link :to="{ name: 'Home' }" :class="{'!right-14 !opacity-100 !pointer-events-auto': isDialing}">
        <riSeedlingFill />
      </router-link>
      <router-link :to="{ name: 'Posts' }" :class="{'!right-26 !opacity-100 !pointer-events-auto': isDialing}">
        <tablerBooks />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import MdiArrowUpBold from '~icons/mdi/arrow-up-bold'
import RiAppsFill from '~icons/ri/apps-fill'
import riSeedlingFill from '~icons/ri/seedling-fill'
import tablerBooks from '~icons/tabler/books'
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
  console.debug('🚀scrollPercent:', scrollPercent)

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
  @apply rounded-full w-8 h-8 absolute text-white bg-orange flex items-center justify-center text-sm transition-all opacity-0 right-0 pointer-events-none shadow-lg;
  bottom: .2rem
}
</style>
