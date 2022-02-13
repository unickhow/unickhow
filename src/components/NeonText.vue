<template>
  <Transition name="neon-fade">
    <div
      v-show="isReady"
      class="kv"
      :class="{ 'neon-text': isReady }">
      {{ propText }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { toRef, nextTick, onMounted, ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
const propText = toRef(props, 'text')

const isReady = ref(false)
onMounted(async () => {
  await nextTick()
  isReady.value = true
})
</script>

<style scoped>
.kv {
  @apply dark:text-white text-8xl tracking-widest text-center;
}
.kv.neon-text {
  --c__neon-base: hsl(106, 100%, 65%);
  --c__neon-halo: hsl(125, 100%, 50%);

  --ts__origin:
    0 0 7px var(--c__white),
    0 0 10px var(--c__white),
    0 0 30px var(--c__white),
    0 0 210px var(--c__neon-base),
    0 0 40px var(--c__neon-base),
    0 0 90px var(--c__neon-base),
    0 0 100px var(--c__neon-base),
    0 0 180px var(--c__neon-halo),
    0 0 200px var(--c__neon-halo);
  --ts__offset:
    0 -2px 10px var(--c__white),
    -30px 30px 110px var(--c__white),
    0 -20px 120px var(--c__white),
    0 0 20px var(--c__neon-base),
    -10px 0 50px var(--c__neon-base),
    0 10px 80px var(--c__neon-base),
    0 0 120px var(--c__neon-halo),
    0 0 210px var(--c__neon-halo),
    0 30px 500px var(--c__neon-halo);

  transform:
    perspective(321px)
    rotateX(17deg)
    rotateY(43deg)
    rotateZ(-15deg);
  font-family: 'Monoton', cursive;
  text-shadow: var(--ts__origin);
  will-change: transform, opacity;
  white-space: nowrap;
  animation:
    glowing 3s ease-in-out infinite alternate,
    rotating 18s linear infinite alternate;
}

@keyframes glowing {
  from {
    text-shadow: var(--ts__origin);
  }
  to {
    text-shadow: var(--ts__offset);
  }
}

@keyframes rotating {
  from {
    transform: perspective(321px) rotateX(17deg) rotateY(43deg) rotateZ(-15deg);
  }
  to {
    transform: perspective(432px) rotateX(37deg) rotateY(33deg) rotateZ(-7deg);
  }
  
}
</style>
