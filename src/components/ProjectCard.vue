<template>
  <a
    ref="projectCard"
    class="project-card__container block py-4 px-4"
    :href="project.link"
    target="_blank">
    <div class="project-card__bg__container absolute w-full h-full left-0 top-0 overflow-hidden">
      <div class="project-card__bg bg-cover bg-center" :style="{ backgroundImage: `url(${project.cover})`, ...cardBackGroundRotation }" />
    </div>
    <div class="project-card__content px-8 h-full flex flex-col z-2 text-white items-center justify-center">
      <h5 v-html="project.name" class="text-3xl md:text-5xl mb-4 font-bold text-shadow tracking-widest uppercase"></h5>
      <p class="text-base text-shadow">{{ project.desc }}</p>
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
      'max-glare': 0.37,
      scale: 1.03
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
