<template>
  <a
    ref="projectCard"
    class="project-card-container h-50 flex justify-between items-start p-6"
    :href="project.link"
    target="_blank"
    @mouseenter="handleMouseenter">
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
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
const props = defineProps<{
  project: {
    name: string
    desc: string
    link: string
    icon: string
    cover: string
    plainName: string
    color: string
  }
}>()

const flipText = ref<any>(null)
const isLargeScreen = useMediaQuery('(min-width: 768px)')
const handleMouseenter = () => {
  isLargeScreen.value && flipText.value?.flip()
}
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
}
</style>
