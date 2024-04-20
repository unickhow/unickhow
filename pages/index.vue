<template>
  <div class="container mx-auto max-w-[1024px] px-4">
    <div class="max-w-[600px] mx-auto sm:py-20 main-content tc-content-text flex gap-4 items-center flex-col sm:flex-row">
      <div class="kv-container aspect-square relative w-full max-w-[200px] mx-auto mb-12">
        <BrandExhibition />
      </div>
      <div class="main-content mb-20 px-8 sm:px-4">
        <h1 class="hello-world">() => 'Hello, world.'</h1>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  const setValues = gsap.set('.hello-world, .main-content__body', {
    opacity: 0,
    translateY: 10
  })
  tl.add(setValues)
  tl.to('.hello-world', {
    opacity: 1
  }).to('.main-content__body', {
    opacity: 1
  })

  onBeforeUnmount(() => {
    tl.kill()
  })
})
</script>

<style>
html:not(.dark) .hello-world {
  background: -webkit-linear-gradient(right, var(--c__orange), var(--c__purple));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textShine 5s infinite linear;
}
html.dark .hello-world {
  animation: glitch 1s linear infinite 2s;
}

.hello-world {
  @apply text-2xl mb-8 tc-content-text font-fira dark:text-lg dark:font-press dark:text-matrix dark:animation-glitch opacity-0;
}

@keyframes textShine {
  from {
    -webkit-filter: hue-rotate(0deg);
  }
  to {
    -webkit-filter: hue-rotate(-360deg);
  }
}
</style>