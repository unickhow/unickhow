<template>
  <a
    v-bind="$attrs"
    class="project-card-container block p-6 rounded-lg"
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
        class="hidden sm:block text-2xl mb-4 font-bold text-shadow tracking-widest uppercase" />
      <h5 v-html="project.name" class="block sm:hidden text-3xl mb-4 font-bold text-shadow tracking-widest uppercase"></h5>
      <p class="text-base text-shadow opacity-20">{{ project.desc }}</p>
    </div>
    <div class="project-card-container__logo" :style="{ backgroundImage: `url(${project.icon})` }" />
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
import FlipText from '~/components/FlipText'

const props = defineProps<{
  project: SideProject
}>()

const { isDark } = useTheme()

const flipText = ref<InstanceType<typeof FlipText>>()
const isLargeScreen = useMediaQuery('(min-width: 768px)')
const visibilities = ref(props.project.screens?.map(() => false) ?? [false, false, false])
const handleMouseEnter = () => {
  isLargeScreen.value && isDark.value && flipText.value?.flip()
  visibilities.value = visibilities.value.map(() => true)
}
const handleMouseLeave = () => {
  visibilities.value = visibilities.value.map(() => false)
}

const MONITOR_POSITIONS = [
  {
    classes: 'monitor-1 aspect-square! top-[20%]! w-[17%]!',
    rotateX: '-10deg',
    rotateY: '25deg',
    rotateZ: '10deg'
  },
  {
    classes: 'monitor-2 aspect-[5/9]! bottom-[40%]! right-[5%]! top-auto! left-auto! transition-delay-[0.2s]!',
    rotateX: '-20deg',
    rotateY: '-37deg',
    rotateZ: '-15deg'
  },
  {
    classes: 'monitor-3 aspect-[4/3]! bottom-[20%]! left-[5%]! top-auto! transition-delay-[0.4s]!',
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
onMounted(() => {
  hasLoaded.value = true
})
</script>

<style scoped>
.project-card-container {
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  @apply relative overflow-hidden;
}

.project-card-container::after {
  content: '';
  @apply absolute -bottom-20 -right-20 w-1/2 h-30 rounded-full opacity-[37%];
  transition: opacity 0.3s ease-in-out, transform 1s ease-in-out;
  background: v-bind('props.project.color');
  filter: blur(70px);
  z-index: -1;
  will-change: opacity transform;
}

.project-card-container:hover::after {
  transform: scaleX(2) scaleY(1.5);
  opacity: 60%;
}

.project-card-container__logo {
  @apply absolute bg-cover bg-center w-10 h-10 right-6 top-6;
  transform: scale(3);
  z-index: 1;
  opacity: 10%;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  will-change: transform opacity;
}

.project-card-container:hover .project-card-container__logo {
  transform: scale(2);
  opacity: 37%;
}

.project-card-container p {
  transition: opacity 0.3s ease-in-out;
}

.project-card-container:hover p {
  opacity: 100%;
}
</style>
