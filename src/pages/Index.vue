<template>
  <main class="page_root">
    <section class="kv">
      <div class="container">
        <div class="flex">
          <div class="p-4 w-1/3 hidden md:block">
            <div class="hidden md:block kv-container aspect-square relative">
              <BrandExhibition />
            </div>
          </div>
          <div class="px-8 py-6 w-full md:w-2/3 font-fira antialiased main-content dark:text-pale">
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
            <div class="hashtags flex flex-wrap text-sm mb-10 p-2 rounded">
              <a
                v-for="item in hashtags"
                :key="item.name"
                :href="item.link"
                class="p-2 m-2 opacity-40 hover:opacity-100 transition-opacity"
                :class="{ 'pointer-events-none': !item.link }"
                :style="item.style"
                :target="item.link ? '_blank' : ''">
                {{ item.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="projects font-mono">
      <div class="container relative">
        <div class="flex">
          <div class="md:w-1/3">
            <h2 class="theme__text-color -tracking-[1rem] select-none absolute -top-[10%] left-0 lg:-left-[10%]">Projects</h2>
          </div>
          <div class="w-full p-8 md:w-3/5 md:mt-16">
            <div
              v-for="project in sideProjects"
              :key="project.name"
              class="w-full mb-8 md:mb-16 md:even:-ml-40 last:mb-0">
              <ProjectCard
                :project="project"
                class="h-60" />
            </div>
            <div class="text-right">
              <q class="theme__note-color opacity-40">TO BE CONTINUED</q>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FileList />
  </main>
</template>

<script setup lang="ts">
import FileList from '../components/FileList.vue'
import { sideProjects } from '../components/sideProjects'
import ProjectCard from '../components/ProjectCard.vue'
import BrandExhibition from '../components/BrandExhibition.vue'

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
</script>

<style lang="scss" scoped>
.projects {
  h2 {
    @apply opacity-10 leading-tight;
    font-size: max(14vw, 8rem);
  }
}
</style>
