<template>
  <main class="page_root">
    <div class="container mx-auto max-w-[1024px]">
      <div class="row sm:pt-10 md:pt-12 flex flex-col md:flex-row">
        <div class="p-4 w-full md:w-1/3">
          <div class="hidden md:block kv-container aspect-video relative">
            <div
              id="logo"
              class="items-center justify-center w-full h-full transition-opacity duration-2000 delay-800"
              :class="isGltfLoaded ? 'opacity-100' : 'opacity-0'">
            </div>

            <div class="hashtags font-fira flex flex-col items-center text-sm mt-10 p-2 rounded">
              <a
                v-for="item in hashtags"
                :key="item.name"
                :href="item.link"
                class="py-2 mr-4 opacity-40 hover:opacity-100 transition-opacity"
                :class="{ 'pointer-events-none': !item.link }"
                :style="item.style"
                :target="item.link ? '_blank' : ''">
                {{ item.name }}
              </a>
            </div>
          </div>
        </div>
        <div class="px-8 py-6 w-full md:w-2/3 font-fira main-content dark:text-pale">
          <div class="main-content mb-20">
            <h1 class="text-xl mb-8 theme__text-color">() => 'Hello, world.'</h1>
            <div class="main-content__body">
              <p class="mb-4 font-light leading-loose">
                This is where I,
                <a class="font-bold text-orange" href="https://github.com/unickhow" target="_blank">unickhow</a>,
                present and share something interesting to me.<br>
                There's no rocket science here 😆, so please don't take it seriously, hope you enjoy it.<br>
                <br>
                If you have any suggestion, feel free to contact me.
              </p>
            </div>
          </div>

          <div class="side-projects flex flex-wrap mb-20 max-w-450px">
            <a
              v-for="project in sideProjects"
              :key="project.name"
              :href="project.link"
              class="w-full py-2 px-4 transition-shadow shadow hover:shadow-md flex mr-4 mb-4 rounded dark:rounded-none dark:border-l-2 dark:border-l-gray"
              target="_blank">
              <figure class="w-8 h-8 flex mr-4 flex-shrink-0">
                <img :src="project.icon" class="object-cover" alt="">
              </figure>
              <div class="flex flex-col">
                <h5 class="text-sm">{{ project.name }}</h5>
                <p class="text-xs text-gray font-light">{{ project.desc }}</p>
              </div>
            </a>
          </div>

          <div class="hashtags flex md:hidden flex-wrap text-sm mb-10 p-2 rounded">
            <a
              v-for="item in hashtags"
              :key="item.name"
              :href="item.link"
              class="py-2 mr-4 opacity-40 hover:opacity-100 transition-opacity"
              :class="{ 'pointer-events-none': !item.link }"
              :style="item.style"
              :target="item.link ? '_blank' : ''">
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <FileList />
  </main>
</template>

<script setup lang="ts">
import { useBrandModel } from '../plugins/threejs/brand'
import FileList from '../components/FileList.vue'
import { sideProjects } from '../components/sideProjects'

type HashTag = {
  name: string
  style: string,
  link: string
}

const hashtags: HashTag[] = [
  {
    name: '#major_front_end',
    style: 'color: var(--text-color)',
    link: 'https://github.com/unickhow'
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

const { isGltfLoaded } = useBrandModel('#logo')
</script>

<style scoped>
.gh-link-share {
  animation: glowing 1.5s ease-in-out 1s infinite alternate;
}

.gh-link-share:hover {
  animation: none;
}

@keyframes glowing {
  0% {
    @apply opacity-90;
  }
  27% {
    @apply opacity-90;
  }
  100% {
    @apply opacity-60;
  }
}
</style>
