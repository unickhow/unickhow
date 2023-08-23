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
const { copy: copySource, copied: sourceCopied } = useClipboard({ source, legacy: true })
const { copy: copyFilename, copied: filenameCopied } = useClipboard({ source: props.filename, legacy: true })

const langExt = computed(() => {
  switch (props.language) {
    case 'vue':
      return 'mdi:vuejs'
    case 'ts':
      return 'mdi:language-typescript'
    case 'js':
      return 'mdi:language-javascript'
    case 'html':
      return 'mdi:language-html5'
    case 'css':
      return 'mdi:language-css3'
    case 'json':
      return 'mdi:json'
    case 'md':
      return 'mdi:language-markdown'
    default:
      return 'mdi:file'
  }
})
</script>

<template>
  <div class="code-wrapper my-6 rounded-md overflow-hidden">
    <div class="code-wrapper__filename relative px-3 py-1 bg-[#e9e9e9] flex items-center justify-between gap-2">
      <div class="window-controls flex items-center gap-2 mr-2">
        <div class="win-btn-close w-3 h-3 rounded-full bg-[#ff605c]"></div>
        <div class="win-btn-min w-3 h-3 rounded-full bg-[#ffbd44]"></div>
        <div class="win-btn-max w-3 h-3 rounded-full bg-[#00ca4e]"></div>
      </div>
      <div class="mr-6 flex items-center gap-1 max-w-[calc(100%-140px)] text-dark">
        <Icon :name="langExt" class="flex-shrink-0" />
        <span class="leading-normal text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis">
          {{ props.filename || `${language ? ('demo.' + language) : 'demo'}` }}
        </span>
      </div>

      <button
        class="copy-btn copy-btn--filename copy-btn text-lg text-grey w-8 h-8 p-1 flex items-center justify-center"
        @click="copyFilename()">
        <Icon v-show="!filenameCopied" name="mdi:content-copy" class="copy-btn__copy opacity-0 transition-opacity" />
        <Icon v-show="filenameCopied" name="mdi:progress-check" class="copy-btn__copied text-primary" />
      </button>
    </div>

    <div class="code-wrapper__snippet relative">
      <button
        class="copy-btn copy-btn--snippet absolute right-0 top-0 text-lg text-white w-8 h-8 p-1 flex items-center justify-center"
        @click="copySource()">
        <Icon v-show="!sourceCopied" name="mdi:content-copy" class="copy-btn__copy opacity-0 transition-opacity" />
        <Icon v-show="sourceCopied" name="mdi:progress-check" class="copy-btn__copied text-primary" />
      </button>
      <slot />
    </div>
  </div>
</template>

<style>
pre {
  @apply m-0;
}

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

.code-wrapper__filename:hover .copy-btn--filename .copy-btn__copy {
  opacity: 1;
}

.code-wrapper__snippet:hover .copy-btn--snippet .copy-btn__copy {
  opacity: 1;
}
</style>