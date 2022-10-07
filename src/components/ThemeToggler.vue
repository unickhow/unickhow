<template>
  <label for="theme" class="cursor-pointer">
    <div class="theme__container relative" :class="{ 'dark': isDark }">
      <div class="theme__icon" />
      <MdiAppleIcloud class="theme__cloud absolute -bottom-3 text-2xl theme__cloud-color"/>
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
    <input
      id="theme"
      v-model="isDark"
      class="hidden"
      type="checkbox"
      name="theme">
  </label>
</template>

<script setup lang="ts">
import MdiAppleIcloud from '~icons/mdi/apple-icloud'
import { useStorage } from '@vueuse/core'
import { useMagicVocal } from '../components/magicVocal';
import { CONSTANTS } from '../utils/enums'

const theme = useStorage('unickTheme', 'light')
const isDark = ref(theme.value === 'dark')

const { result } = useMagicVocal()

watch(result, (val) => {
  if (val === CONSTANTS.KEYWORD_THEME_DARK) {
    isDark.value = true
  } else if (val === CONSTANTS.KEYWORD_THEME_LIGHT) {
    isDark.value = false
  }
})

watch(isDark, (value) => {
  theme.value = value ? 'dark' : 'light'
})

// ! TODO: WritableComputedRef<unknown> is not assignable to unknown
// const isDark = computed({
//   get () {
//     return theme.value === 'dark'
//   },
//   set (val) {
//     theme.value = val ? 'dark' : 'light'
//   }
// })

watch(isDark, (val) => {
  const root = document.getElementsByTagName('html')[0]
  if (val) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}, { immediate: true })

</script>

<style scoped>
.theme__container .theme__icon {
  width: 30px;
  height: 30px;
  background: var(--c__theme-icon);
  transition: all 0.3s ease;
  @apply rounded-full;
}

.theme__container.dark .theme__icon {
  background: transparent;
  transform: translate(-12px, -5px);
  box-shadow: 12px 5px 0 0 var(--c__theme-icon);
  opacity: .7;
}

.theme__container .theme__cloud {
  transform: translateX(-10px);
  transition: all .3s ease;
}

.theme__container.dark .theme__cloud {
  transform: translateX(10px);
}
</style>
