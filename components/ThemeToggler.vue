<template>
  <div class="relative">
    <ClientOnly>
      <button class="absolute top-0 right-0 w-10 h-10 z-2 opacity-0 cursor-pointer" @click="next()"></button>
      <div class="theme__container relative z-1" :class="{ 'auto': mode === 'auto' }">
        <div class="theme__icon" />
        <Icon name="mdi:apple-icloud" class="theme__cloud absolute -bottom-3 text-2xl theme__cloud-color"/>
        <div class="theme__stars">
          <small v-for="n in 3" :key="n"
            class="theme__stars__star transform top-0 left-0 w-2px h-2px rounded inline-block bg-white absolute transition-all"
            :class="{
              '-translate-y-4px dark:translate-y-1px -translate-x-12px dark:-translate-x-2px opacity-75 delay-150': n === 1,
              'translate-y-2px dark:translate-y-7px -translate-x-6px dark:translate-x-4px delay-50': n === 2,
              'translate-y-12px dark:translate-y-17px -translate-x-17px dark:-translate-x-7px opacity-40': n === 3
            }" />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useColorMode, useCycleList } from '@vueuse/core'

const config = useRuntimeConfig()
const mode = useColorMode({
  emitAuto: true,
  disableTransition: false,
  storageKey: config.public.NUXT_THEME_STORE
})


const { state, next } = useCycleList([
  'dark', 'light', 'auto'
], {
  initialValue: mode
})

watchEffect(() => {
  mode.value = state.value as any
})
</script>

<style scoped>
.theme__container .theme__icon {
  width: 30px;
  height: 30px;
  background: var(--c__theme-icon);
  transition: all 0.3s ease;
  @apply rounded-full;
}

html.dark .theme__container .theme__icon {
  background: transparent;
  transform: translate(-12px, -5px);
  box-shadow: 12px 5px 0 0 var(--c__theme-icon);
  opacity: .7;
}

.theme__container .theme__cloud {
  transform: translateX(-10px);
  transition: all .3s ease;
}

html.dark .theme__container .theme__cloud {
  transform: translateX(10px);
}

.theme__container.auto .theme__icon {
  background: var(--c__theme-icon) !important;
  transform: translate(-5px, 5px) !important;
  box-shadow: -7px -7px 0px 0px var(--c__grey) inset;
  animation-name: day-auto-shift;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;
}
.theme__container.auto .theme__cloud {
  @apply hidden;
}

.theme__container.auto .theme__stars {
  @apply hidden;
}

@keyframes day-auto-shift {
  from {
    box-shadow: -7px -7px 0px 0px var(--c__grey) inset;
  }
  to {
    box-shadow: 7px 7px 0px 0px var(--c__grey) inset;
  }
}
</style>
