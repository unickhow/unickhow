<template>
  <a
    ref="projectCard"
    class="project-card-container flex justify-between items-start p-6"
    :href="project.link"
    target="_blank"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <div>
      <FlipText
        ref="flipText"
        tag="h5"
        trigger="none"
        :text="project.plainName"
        class="hidden sm:block text-3xl mb-4 font-bold text-shadow tracking-widest uppercase" />
      <h5 v-html="project.name" class="block sm:hidden text-3xl mb-4 font-bold text-shadow tracking-widest uppercase"></h5>
      <p class="text-base text-shadow">{{ project.desc }}</p>
    </div>
    <div class="bg-cover bg-center w-10 h-10 flex-shrink-0" :style="{ backgroundImage: `url(${project.icon})` }" />
  </a>

  <template v-if="isLargeScreen && hasLoaded">
    <MonitorExhibition
      v-for="(screen, index) in project.screens"
      :key="`screen-${index}-${project.plainName}}`"
      :isVisible="visibilities[index]"
      :class="MONITOR_POSITIONS[index].classes"
      :rotateX="MONITOR_POSITIONS[index].rotateX"
      :rotateY="MONITOR_POSITIONS[index].rotateY"
      :rotateZ="MONITOR_POSITIONS[index].rotateZ"
      :captions="[index + 1, captionText[index]]"
      :color="project.color"
      :screen="screen" />
  </template>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import type { SideProject } from '~/types'
// import { MONITOR_POSITIONS } from '~/utils/helper'
import FlipText from '~/components/FlipText'

const props = defineProps<{
  project: SideProject
}>()

const flipText = ref<InstanceType<typeof FlipText>>()
const isLargeScreen = useMediaQuery('(min-width: 768px)')
const visibilities = ref(props.project.screens?.map(() => false) ?? [])
const handleMouseEnter = () => {
  isLargeScreen.value && flipText.value?.flip()
  visibilities.value = visibilities.value.map(() => true)
}
const handleMouseLeave = () => {
  visibilities.value = visibilities.value.map(() => false)
}

const MONITOR_POSITIONS = [
  {
    classes: 'monitor-1 aspect-square! top-[30%]! w-[17%]!',
    rotateX: '-10deg',
    rotateY: '25deg',
    rotateZ: '10deg'
  },
  {
    classes: 'monitor-2 aspect-[5/9]! bottom-[30%]! right-[5%]! top-auto! left-auto! transition-delay-[0.2s]!',
    rotateX: '-20deg',
    rotateY: '-37deg',
    rotateZ: '-15deg'
  },
  {
    classes: 'monitor-3 aspect-[4/3]! bottom-[10%]! left-[5%]! top-auto! transition-delay-[0.4s]!',
    rotateX: '30deg',
    rotateY: '20deg',
    rotateZ: '-25deg'
  }
]

const captionText = computed(() => {
  return [
    props.project.plainName,
    props.project.plainName.split('').reverse().join(''),
    // random text with hash
    `${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`
  ]
})

const hasLoaded = ref(false)
// leave a door for touch devices
onMounted(() => {
  hasLoaded.value = true
  const fn = () => {
    visibilities.value = visibilities.value.map(() => false)
  }
  // close all monitors on body click
  document.body.addEventListener('click', fn)

  // remove event listener on unmount
  onUnmounted(() => {
    document.body.removeEventListener('click', fn)
  })
})
</script>

<style scoped>
.project-card-container {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  @apply relative;
}

.project-card-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 2px v-bind('props.project.color');
  z-index: 1;
  transform: scaleX(1.1) scaleY(1.2);
  opacity: 0;
  pointer-events: none;
}

.project-card-container:hover::before {
  opacity: 80%;
  transform: scaleX(1) scaleY(1);
  transition: all 0.1s ease-in-out;
  will-change: transform, opacity;
}
</style>
