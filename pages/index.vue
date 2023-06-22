<template>
  <main>
    <div class="container mx-auto max-w-[1024px] px-4">
      <div class="row sm:pt-10 md:pt-12 flex flex-col md:flex-row">
        <div class="sm:p-4 w-full md:w-1/3">
          <div class="hidden md:block kv-container aspect-square relative">
            <BrandExhibition />
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
        <div class="py-6 w-full md:w-2/3 font-fira antialiased main-content tc-content-text">
          <div class="main-content mb-20">
            <h1 class="text-xl mb-8 tc-content-text">() => 'Hello, world.'</h1>
            <div class="main-content__body">
              <p class="mb-4 leading-loose">
                This is where I,
                <a class="font-bold !text-primary" href="https://github.com/unickhow" target="_blank">unickhow</a>,
                present and share something interesting to me.<br>
                There's no rocket science here 😆, so please don't take it seriously, hope you enjoy it.<br>
                <br>
                If you have any suggestion, feel free to contact me.
              </p>
            </div>
          </div>

          <div class="side-projects flex flex-col gap-8 mb-4">
            <div
              v-for="project in sideProjects"
              :key="project.name"
              class="w-full">
              <ProjectCard
                :project="project"
                class="h-full" />
            </div>
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
  </main>
</template>

<script setup lang="ts">
import { sideProjects } from '../static/sideProject'
import BrandExhibition from '../components/BrandExhibition.vue'

type HashTag = {
  name: string
  style: string,
  link: string
}

const hashtags: HashTag[] = [
  {
    name: '#major_front_end',
    style: 'color: var(--c__grey)',
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
</script>

<style scoped>
</style>