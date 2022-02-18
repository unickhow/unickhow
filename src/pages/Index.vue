<template>
  <main class="page_root">
    <div class="container mx-auto">
      <div class="row sm:pt-10 md:pt-[20vh] flex flex-col md:flex-row">
        <div class="p-4 w-full md:w-1/2">
          <div class="kv-container aspect-video relative">
            <div
              class="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-opacity duration-2000"
              :class="isGltfLoaded ? 'opacity-0 -z-100' : 'opacity-100'">
              <EosIconsThreeDotsLoading class="text-yellow text-6xl opacity-66" />
            </div>
            <div
              id="logo"
              class="flex items-center justify-center w-full h-full transition-opacity duration-2000 delay-800"
              :class="isGltfLoaded ? 'opacity-100' : 'opacity-0'"></div>
          </div>
        </div>
        <div class="px-8 py-6 w-full md:w-1/2 font-fira main-content dark:text-pale">
          <h1 class="text-xl mb-8">() => 'Hello, world.'</h1>
          <div class="main-content__body mb-20">
            <p class="mb-4">
              this is my personal website, I'm still planning what and how to present.
            </p>
            <code id="jibber_jabber" class="block text-gray dark:text-gray italic"></code>

            <Transition name="share-fade">
              <a
                v-show="hasTypingDone"
                class="gh-link-share text-3xl inline-flex mt-10 bg-white text-black items-center text-center px-10 rounded"
                href="https://github.com/unickhow"
                target="_blank">
                <OcticonLogoGithub16 />
              </a>
            </Transition>
          </div>

          <div class="main-content__hashtags flex flex-wrap text-sm mb-10">
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

          <div class="main-content__footer flex">
            <a class="p-1 opacity-50 hover:opacity-90 transition-opacity" href="https://github.com/unickhow" target="_blank">
              <zmdiGithubBox />
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import EosIconsThreeDotsLoading from '~icons/eos-icons/three-dots-loading'
import zmdiGithubBox from '~icons/zmdi/github-box'
import OcticonLogoGithub16 from '~icons/octicon/logo-github-16'
import { useBrandModel } from '../plugins/threejs/brand'
import { useTypeIt } from '../plugins/typeit'

type HashTag = {
  name: string
  style: string,
  link: string
}

const hashtags: HashTag[] = [
  {
    name: '#major_front_end',
    style: 'color: var(--c__white)',
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
const { hasTypingDone } = useTypeIt('#jibber_jabber')
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
