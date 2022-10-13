<template>
  <a
    ref="projectCard"
    class="project-card__container h-50 rounded-lg block py-4 px-4"
    :href="project.link"
    target="_blank">
    <div class="project-card__bg__container absolute w-full h-full left-0 top-0 rounded-lg overflow-hidden -z-1">
      <div class="project-card__bg bg-cover bg-center" :style="{ backgroundImage: `url(${project.cover})`, ...cardBackGroundRotation }" />
    </div>
    <div class="project-card__content px-8 flex flex-col z-2 text-white">
      <h5 class="text-xl font-bold text-shadow">{{ project.name }}</h5>
      <p class="text-sm text-shadow">{{ project.desc }}</p>
    </div>
  </a>
</template>

<script setup lang="ts">
  // reference: https://codepen.io/andymerskin/pen/XNMWvQ
  // replace with tilt.js
  import VanillaTilt from 'vanilla-tilt';

  defineProps<{
    project: {
      name: string
      desc: string
      link: string
      icon: string
      cover: string
    }
  }>()

  const projectCard = ref<HTMLElement>()
  const state = reactive({
    x: 0,
    y: 0
  })

  onMounted(() => {
    VanillaTilt.init(projectCard.value!, {
      max: 10,
      speed: 400,
      glare: true,
      'max-glare': 0.37
    })

    projectCard.value!.addEventListener('tiltChange', function(evt: any) {
      state.x = evt.detail.percentageX
      state.y = evt.detail.percentageY
    })
  })

  const cardBackGroundRotation = computed(() => {
    const { x, y } = state
    return {
      transform: `translateX(${-x / 50}%) translateY(${-y / 50}%)`
    }
  })
</script>

<style scoped>
  .project-card__container {
    transform: perspective(1000px);
    transform-style: preserve-3d;
  }

  .project-card__container:hover .project-card__bg::before {
    @apply opacity-30;
  }

  .project-card__content {
    @apply relative;
    transition: .3s;
    transform: perspective(4000px) translateZ(40px);
  }

  .project-card__container:hover .project-card__content {
    transform: perspective(4000px) translateZ(40px) scale(1.1);
  }

  h5, p {
    transform: perspective(4000px) translateZ(40px);
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
