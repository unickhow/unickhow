<template>
  <a
    ref="projectCard"
    class="project-card__container h-50 block py-12 px-4"
    :href="project.link"
    target="_blank"
    @mouseenter="handleMouseenter">
    <div class="project-card__bg__container absolute w-full h-full left-0 top-0 overflow-hidden">
      <div class="project-card__bg bg-cover bg-center" :style="{ backgroundImage: `url(${project.cover})` }" />
    </div>
    <div class="project-card__content px-8 h-full flex flex-col z-2 text-white items-center justify-center">
      <FlipText
        ref="flipText"
        tag="h5"
        trigger="none"
        :text="project.plainName"
        class="hidden sm:block text-3xl md:text-5xl mb-4 font-bold text-shadow tracking-widest uppercase" />
      <h5 v-html="project.name" class="block sm:hidden text-3xl md:text-5xl mb-4 font-bold text-shadow tracking-widest uppercase"></h5>
      <p class="text-base text-shadow">{{ project.desc }}</p>
    </div>
  </a>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
// TODO: replace with useParallax
defineProps<{
  project: {
    name: string
    desc: string
    link: string
    icon: string
    cover: string
    plainName: string
  }
}>()

const flipText = ref<any>(null)
const isLargeScreen = useMediaQuery('(min-width: 768px)')
const handleMouseenter = () => {
  isLargeScreen.value && flipText.value?.flip()
}
</script>

<style scoped>
  .project-card__container {
    --tile-perspective: 2000px;
    --tile-translate-z: 50px;

    transform: perspective(var(--tile-perspective));
    transform-style: preserve-3d;
  }

  .project-card__container:hover .project-card__bg::before {
    @apply opacity-30;
  }

  .project-card__content {
    @apply relative;
    transition: .3s;
    transform: perspective(var(--tile-perspective)) translateZ(var(--tile-translate-z));
  }

  h5 {
    transform: perspective(var(--tile-perspective)) translateZ(50px) translateY(15px) scale(1.2);
    opacity: .37;
    transition: .3s;
  }

  p {
    transform: perspective(var(--tile-perspective)) translateZ(var(--tile-translate-z)) translateY(15px);
    opacity: 0;
    transition: .3s;
    transition-delay: .1s;
  }

  .project-card__container:hover .project-card__content {
    transform: perspective(var(--tile-perspective)) translateZ(var(--tile-translate-z)) scale(1.05);
  }

  .project-card__container:hover h5 {
    transform: perspective(var(--tile-perspective)) translateZ(50px) translateY(0) scale(1.05);
    opacity: 1;
  }

  .project-card__container:hover p {
    transform: perspective(var(--tile-perspective)) translateZ(var(--tile-translate-z)) translateY(0) scale(1.05);
    opacity: 1;
  }

  .project-card__bg {
    @apply absolute;
    width: 110%;
    height: 110%;
    left: -5%;
    top: -5%;
  }

  .project-card__bg::before {
    content: '';
    transition: opacity .3s ease-in-out;
    @apply absolute w-full h-full top-0 left-0 bg-black opacity-40;
  }
</style>
