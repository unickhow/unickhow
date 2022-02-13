<template>
  <main class="page_root">
    <div class="container mx-auto">
      <div class="row pt-10 md:pt-50 flex flex-col md:flex-row">
        <div class="p-4 w-full md:w-1/2 mb-12 md:mb-0">
          <NeonText class="sticky top-16 left-0" text="<N />"></NeonText>
        </div>
        <div class="p-8 w-full md:w-1/2 font-fira main-content dark:text-pale">
          <h1 class="text-xl mb-8">() => 'Hello, world.'</h1>
          <div class="main-content__body mb-20">
            <p class="mb-4">
              this is my personal website, I'm still planning what and how to present everything in my mind.
            </p>
            <code class="text-gray dark:text-gray italic">
              // will go on if something cross my mind ...<small class="text-cursor"></small>
            </code>
          </div>

          <div class="main-content__footer flex flex-wrap text-sm">
            <a
              v-for="item in hashtags"
              :key="item.name"
              :href="item.link"
              class="cursor-pointer py-2 mr-4"
              :class="{ 'pointer-events-none': !item.link }"
              :style="item.style"
              :target="item.link ? '_blank' : ''">
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import NeonText from '@/components/NeonText.vue'

type HashTag = {
  name: string
  style: string,
  link: string
}

const hashtags: HashTag[] = [
  {
    name: '#major_front_end',
    style: 'color: var(--c__white)',
    link: ''
  },
  {
    name: '#Vue_developer',
    style: 'background: linear-gradient(45deg, #42b883, #6089f2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;',
    link: 'https://vuejs.org/'
  },
  {
    name: '#learning_nestjs',
    style: 'color: #ea2845',
    link: 'https://nestjs.com/'
  },
  {
    name: '#working_on_ts',
    style: 'color: #3178c6',
    link: 'https://www.typescriptlang.org/'
  },
  {
    name: '#vite_is_awesome',
    style: 'background: linear-gradient(45deg, #4dc2ff, #bd35fe); -webkit-background-clip: text; -webkit-text-fill-color: transparent;',
    link: 'https://vitejs.dev/'
  }
]

</script>

<style scoped>
.page_root {
  @apply h-screen;
}

.text-cursor {
  @apply bg-gray inline-block;
  opacity: 1;
  width: 3px;
  height: 16px;
  animation: blinking 2s infinite step-end;
}

@keyframes blinking {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
