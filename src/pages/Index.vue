<template>
  <main class="page_root">
    <div class="container mx-auto">
      <div class="row pt-10 md:pt-50 flex flex-col md:flex-row">
        <div class="p-4 w-full md:w-1/2 mb-12 md:mb-0">
          <NeonText text="<N />"></NeonText>
        </div>
        <div class="p-4 w-full md:w-1/2 font-fira main-content">
          <h1 class="text-xl mb-8">() => 'Hello, world.'</h1>
          <div class="main-content__body">
            <p>
              this is my personal website, I'm still planning what and how to present everything in my mind.
            </p>
            <p class="mt-4 text-gray-500/50 italic">
              // will go on if something cross my mind ...<small class="text-cursor"></small>
            </p>
          </div>

          <div class="main-content__footer flex flex-wrap mt-20">
            <a
              v-for="item in hashtags"
              :key="item.name"
              :href="item.link"
              class="cursor-pointer px-2 py-1"
              :style="item.style"
              target="_blank">
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
    style: 'background: linear-gradient(45deg, #E33E33, #FFC831); -webkit-background-clip: text; -webkit-text-fill-color: transparent;',
    link: 'https://vuejs.org/'
  },
  {
    name: '#Vue_developer',
    style: 'color: #42b883',
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
    style: 'color: #646cff',
    link: 'https://vitejs.dev/'
  }
]

</script>

<style scoped>
.page_root {
  @apply h-screen bg-black text-white;
}

.text-cursor {
  @apply bg-gray-500/50 inline-block;
  opacity: 1;
  width: 3px;
  height: 14px;
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
