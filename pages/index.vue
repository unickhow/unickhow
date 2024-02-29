<template>
  <div class="container mx-auto max-w-[1024px] px-4">
    <div class="row flex flex-col max-w-[500px] mx-auto">
      <div class="py-6 main-content tc-content-text">
        <div class="kv-container aspect-square relative max-w-[200px] mx-auto mb-12">
          <BrandExhibition />
        </div>
        <div class="main-content mb-20">
          <h1 class="hello-world text-xl mb-8 tc-content-text font-fira dark:text-xs dark:font-press dark:text-matrix dark:animation-glitch opacity-0">() => 'Hello, world.'</h1>
          <div class="main-content__body opacity-0">
            <p class="leading-loose">
              This is where I,
              <a class="font-bold !text-primary" href="https://github.com/unickhow" target="_blank">unickhow</a>,
              share things that catch my interest.<br>
              There's no need for rocket science here! 😆, so please don't take it seriously, hope you enjoy it.<br>
              <br>
              If you have any suggestion, feel free to reach out to me anytime.
            </p>
          </div>

          <div class="hashtags flex flex-wrap text-sm mt-12 rounded">
            <a
              v-for="item in hashtags"
              :key="item.name"
              :href="item.link"
              class="hashtag py-2 mr-4 hover:opacity-100 transition-opacity opacity-0"
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
            <ClientOnly>
              <ProjectCard
                :project="project"
                class="project-card opacity-0" />
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { sideProjects } from '../static/sideProject'
import gsap from 'gsap'

useHead({
  title: '<unickhow />',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'unickhow\'s personal website'
    }
  ]
})

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

onMounted(async () => {
  await nextTick()
  const tl = gsap.timeline({
    defaults: {
      ease: 'power2.inOut',
      delay: .05,
      opacity: 0,
      translateY: 0
    }
  })
  const setValues = gsap.set('.hello-world, .main-content__body, .hashtag, .project-card', {
    opacity: 0,
    translateY: 10
  })
  tl.add(setValues)
  tl.to('.hello-world', {
    opacity: 1
  }).to('.main-content__body', {
    opacity: 1
  }).to('.hashtag', {
    opacity: .8,
    stagger: .3
  }).to('.project-card', {
    opacity: 1,
    stagger: .3
  })

  onBeforeUnmount(() => {
    tl.kill()
  })
})
</script>

<style>
html.dark .hello-world {
  animation: glitch 1s linear infinite 2s;
}
</style>