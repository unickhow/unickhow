<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

if (!import.meta.env.SSR) {
  gsap.registerPlugin(ScrollTrigger)
}

const showSurprise = ref(false)
const scrollTrigger = ref()
onMounted(() => {
  if (hasBeenPhew.value) return
  scrollTrigger.value = ScrollTrigger.create({
    trigger: '.phew-img',
    start: 'bottom bottom',
    onEnter: () => {
      showSurprise.value = true
      document.body.style.overflow = 'hidden'
    }
  })
})

onBeforeUnmount(() => {
  scrollTrigger.value.kill()
})

const hasBeenPhew = ref(false)
function handleModalClose () {
  hasBeenPhew.value = true
  showSurprise.value = false
  document.body.style.overflow = 'auto'
  scrollTrigger.value.kill()
}
</script>

<template>
  <div>
    <div v-if="showSurprise" class="usability my-12 flex flex-col gap-8 items-center justify-center !text-black">
      <div class="demo-modal border-solid border-1 bg-white rounded max-w-[300px] p-2">
        <div class="demo-modal__head">
          <h5></h5>
        </div>
        <div class="demo-modal__body p-3">
          <div class="flex items-start gap-2">
            <Icon name="mingcute:warning-fill" class="text-[#ff0000] flex-shrink-0 h-[2rem]" />
            <span>Are you sure you want to cancel this modal?</span>
          </div>
        </div>
        <div class="demo-modal__foot flex justify-end">
          <button @click="handleModalClose">Return</button>
          <button class="border-1 border-solid-[#ff0000] bg-[#ff0000] !text-white" @click="handleModalClose">Cancel</button>
        </div>
      </div>
    </div>
    <figure
      class="phew-img text-center opacity-0 transition-opacity duration-2500 h-[50vh]"
      :class="{ '!opacity-100 h-auto': hasBeenPhew }">
      <img src="https://hackmd.io/_uploads/SyIyHnZya.png" class="max-w-[73%]" alt="so close ...">
    </figure>
  </div>
</template>

<style scoped>
.usability {
  @apply fixed w-full h-full top-0 left-0 flex justify-center items-center bg-[#00000099] z-[9999];
}
.usability .demo-modal {
  @apply shadow-xl;
}
.usability .demo-delete-buttons button {
  @apply text-xl;
}

.usability .demo-modal__foot button {
  @apply py-2 px-4 rounded text-black;
}
</style>
