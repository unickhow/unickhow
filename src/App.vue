<template>
  <div class="header flex justify-end p-4">
    <label for="theme" class="cursor-pointer">
      <div class="theme-icon" :class="{ 'dark': isDark }"></div>
      <input v-model="isDark" class="hidden" type="checkbox" name="theme" id="theme">
    </label>
  </div>
  <router-view></router-view>

  <footer class="flex items-center justify-center py-1">
    <a class="opacity-50 hover:opacity-90 transition-opacity text-gray dark:text-pale" href="https://github.com/unickhow" target="_blank">
      <zmdiGithubBox />
    </a>
  </footer>
</template>
<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { useStorage } from '@vueuse/core'
import { ref, provide, watch } from 'vue'
// import IcSharpLightbulb from '~icons/ic/sharp-lightbulb'
import zmdiGithubBox from '~icons/zmdi/github-box'

const theme = useStorage('unickTheme', 'light')
const isDark = ref(theme.value === 'dark')

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

provide('isDark', isDark)

watch(isDark, (val) => {
  const root = document.getElementsByTagName('html')[0]
  if (val) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}, { immediate: true })

useHead({
  title: '<unickhow />',
  meta: [
    {
      name: 'description',
      content: 'aka unickhow\'s portfolio.'
    }
  ]
})
</script>

<style>
html {
  transition: background .3s ease-in-out;
}

html.dark {
  background: var(--c__dark);
}
</style>

<style scoped>
.theme-icon {
  width: 30px;
  height: 30px;
  background: var(--c__theme-icon);
  transition: all 0.3s ease;
  @apply rounded-full;
}

.theme-icon.dark {
  background: transparent;
  transform: translate(-12px, -5px);
  box-shadow: 12px 5px 0 0 var(--c__theme-icon);
  opacity: .5;
}
</style>
