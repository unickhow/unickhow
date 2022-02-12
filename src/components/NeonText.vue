<template>
  <div class="neon-text">
    {{ propText }}
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})

const propText = toRef(props, 'text')
</script>

<style scoped>
.neon-text {
  @apply text-8xl tracking-widest text-center;
  transform:
    perspective(987px)
    rotateX(17deg)
    rotateY(43deg)
    rotateZ(-15deg);
  font-family: 'Monoton', cursive;
  text-shadow:
    0 0 7px var(--color-white),
    0 0 50px var(--color-white),
    0 0 20px var(--color-green),
    0 0 30px var(--color-green),
    0 0 110px var(--color-white),
    0 0 50px var(--color-green),
    0 0 80px var(--color-green),
    0 0 120px var(--color-green),
    0 0 300px var(--color-green-lighter);
  animation: glowing 5s ease-in-out infinite alternate;
}

@keyframes glowing {
  from {
    text-shadow:
      0 0 7px var(--color-white),
      0 0 50px var(--color-white),
      0 0 20px var(--color-green),
      0 0 30px var(--color-green),
      0 0 110px var(--color-white),
      0 0 50px var(--color-green),
      0 0 80px var(--color-green),
      0 0 120px var(--color-green),
      0 0 300px var(--color-green-lighter);
  }
  to {
    text-shadow:
      0 0 20px var(--color-white),
      0 0 80px var(--color-white),
      0 0 210px var(--color-green),
      0 0 40px var(--color-green),
      0 0 1300px var(--color-white),
      0 0 90px var(--color-green-lighter),
      0 0 100px var(--color-green-lighter),
      0 0 180px var(--color-green-lighter),
      0 0 200px var(--color-green-lighter);
  }
}
</style>
