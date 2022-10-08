<template>
  <div
    ref="projectCard"
    class="project-card__container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave">
    <a
      :href="project.link"
      class="project-card h-50 py-4 px-4 transition-all block rounded-lg overflow-hidden"
      :style="cardRotation"
      target="_blank">
      <div class="project-card__shine" :style="cardShinePosition"></div>
      <div
        class="project-card__bg bg-cover bg-center -z-1"
        :style="{ backgroundImage: `url(${project.cover})`, ...cardBackGroundRotation }" />
      <div class="project-card__content flex flex-col z-2 text-white">
        <h5 class="text-md text-shadow-lg">{{ project.name }}</h5>
        <p class="text-xs font-light text-shadow-lg">{{ project.desc }}</p>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
  // reference: https://codepen.io/andymerskin/pen/XNMWvQ

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
    cardWidth: 0,
    cardHeight: 0,
    x: 0,
    y: 0
  })
  const xRatio = computed(() => state.x / state.cardWidth)
  const yRatio = computed(() => state.y / state.cardHeight)

  onMounted(() => {
    state.cardWidth = projectCard.value!.offsetWidth
    state.cardHeight = projectCard.value!.offsetHeight
  })

  function handleMouseMove(e: MouseEvent) {
    state.x = e.pageX - projectCard.value!.offsetLeft - state.cardWidth/2;
    state.y = e.pageY - projectCard.value!.offsetTop - state.cardHeight/2;
  }
  function handleMouseLeave() {
    state.x = 0;
    state.y = 0;
  }

  const cardRotation = computed(() => {
    const x = xRatio.value * 12
    const y = yRatio.value * -24
    return {
      transform: `rotateX(${y}deg) rotateY(${x}deg)`
    }
  })

  const cardBackGroundRotation = computed(() => {
    const x = xRatio.value * 8
    const y = yRatio.value * 4
    return {
      transform: `translateX(${-x}px) translateY(${-y}px)`
    }
  })

  const cardShinePosition = computed(() => {
    const x = xRatio.value * 1800
    const r = xRatio.value * -24
    return {
      transform: `translateX(${-x}%) rotate(${r}deg)`,
      opacity: 0 + Math.abs(xRatio.value)
    }
  })
</script>

<style scoped>
  .project-card__container {
    transform: perspective(1200px);
    transform-style: preserve-3d;
  }

  .project-card__content {
    @apply relative;
  }

  .project-card__content::before {
    content: '';
    @apply absolute select-none;
    width: 150%;
    height: 500%;
    left: -30%;
    top: -200%;
    transform: rotate(-10deg);
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
    z-index: -1;
  }

  .project-card__bg {
    @apply absolute;
    width: 110%;
    height: 110%;
    left: -5%;
    top: -5%;
  }

  .project-card__shine {
    @apply absolute;
    top: -30%;
    left: 50%;
    width: 30px;
    height: 150%;
    background: white;
    z-index: 3;
    transform: rotate(30deg);
    filter: blur(15px);
    opacity: 0;
  }
</style>
