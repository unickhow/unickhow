<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  code: string
  language: string
  filename?: string
  highlights?: number[]
  meta: string
}>()

const source = ref(props.code)
const { copy, copied } = useClipboard({ source, legacy: true })
</script>

<template>
  <div class="relative">
    <button
      class="absolute right-0 top-0 text-lg text-white w-8 h-8 p-1 flex items-center justify-center"
      @click="copy()">
      <Icon v-show="!copied" name="mdi:content-copy" class="opacity-0 hover:opacity-100 transition-opacity" />
      <Icon v-show="copied" name="mdi:progress-check" class="text-primary" />
    </button>
    <slot />
  </div>
</template>

<style>
pre code {
  font-family: 'Fira Code', monospace;
  counter-reset: step;
  counter-increment: step 0;
  @apply py-2 px-1 text-xs leading-relaxed overflow-x-auto block bg-dark dark:bg-black;
}

pre code .line {
  display: block;
  min-height: 1rem;
}

pre code .line::before {
  content: counter(step);
  counter-increment: step;
  width: 1rem;
  margin-right: 1.5rem;
  display: inline-block;
  text-align: right;
  @apply text-gray dark:text-white;
}

pre code .line.highlight {
  background: #7f7f7f80;
}
</style>