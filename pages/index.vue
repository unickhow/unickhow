<template>
  <main>
    <div class="container mx-auto max-w-[1024px] px-4">
      <div class="row flex flex-col max-w-[500px] mx-auto">
        <div class="py-6 main-content tc-content-text">
          <div class="kv-container aspect-square relative max-w-[200px] mx-auto mb-12">
            <BrandExhibition />
          </div>
          <div class="main-content mb-20">
            <h1 class="hello-world text-xl mb-8 tc-content-text font-fira dark:text-xs dark:font-press dark:text-matrix dark:animation-glitch">() => 'Hello, world.'</h1>
            <div class="main-content__body">
              <p class="leading-loose">
                This is where I,
                <a class="font-bold !text-primary" href="https://github.com/unickhow" target="_blank">unickhow</a>,
                present and share something interesting to me.<br>
                There's no rocket science here 😆, so please don't take it seriously, hope you enjoy it.<br>
                <br>
                If you have any suggestion, feel free to contact me.
              </p>
            </div>

            <div class="hashtags flex flex-wrap text-sm mt-12 rounded">
              <a
                v-for="item in hashtags"
                :key="item.name"
                :href="item.link"
                class="py-2 mr-4 opacity-80 hover:opacity-100 transition-opacity"
                :class="{ 'pointer-events-none': !item.link }"
                :style="item.style"
                :target="item.link ? '_blank' : ''">
                {{ item.name }}
              </a>
            </div>
          </div>

          <div class="side-projects flex flex-col gap-8 mb-4">
            <div
              v-for="project in sideProjects"
              :key="project.name"
              class="w-full">
              <ProjectCard :project="project" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { sideProjects } from '../static/sideProject'

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

<style>
html.dark .hello-world {
  animation: glitch 1s linear infinite;
}
</style>