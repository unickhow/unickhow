<template>
  <main>
    <div class="container mx-auto max-w-[1024px] px-4">
      <div class="row flex flex-col max-w-[500px] mx-auto">
        <div class="py-6 main-content tc-content-text">
          <div class="kv-container aspect-square relative max-w-[200px] mx-auto mb-12">
            <BrandExhibition />
          </div>
          <div class="main-content mb-20">
            <h1 class="text-xl mb-8 tc-content-text font-fira">() => 'Hello, world.'</h1>
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
              <ProjectCard
                :project="project"
                class="h-full"
                @mouseenter="onProjectCardEnter(project)"
                @mouseleave="onProjectCardLeave(project)" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <MonitorExhibition
      :isVisible="isVisible"
      class="monitor-1 aspect-square! top-[30%]! w-[17%]!"
      rotateX="-10deg"
      rotateY="25deg"
      rotateZ="10deg"
      :color="hoveredProject?.color"
      :screen="hoveredProject?.glitches?.[0]" />

    <MonitorExhibition
      :isVisible="isVisible2"
      class="monitor-2 aspect-[5/9]! bottom-[30%]! right-[5%]! top-auto! left-auto! transition-delay-[0.2s]!"
      rotateX="-20deg"
      rotateY="-37deg"
      rotateZ="-15deg"
      :color="hoveredProject?.color"
      :screen="hoveredProject?.glitches?.[1]" />
  </main>
</template>

<script setup lang="ts">
import { sideProjects } from '../static/sideProject'
import type { SideProject } from '~/types'

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

const hoveredProject = ref<any>(null)
const isVisible = ref(false)
const isVisible2 = ref(false)
function onProjectCardEnter (project: SideProject) {
  isVisible.value = true
  isVisible2.value = true
  hoveredProject.value = project
}
function onProjectCardLeave (project: SideProject) {
  isVisible.value = false
  isVisible2.value = false
}
</script>

<style scoped>
</style>