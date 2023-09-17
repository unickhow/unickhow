<script setup lang="ts">
import { withBase } from 'ufo'
import { useRuntimeConfig, computed } from '#imports'

const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    return withBase(props.src, useRuntimeConfig().app.baseURL)
  }
  return props.src
})
</script>

<template>
  <figure>
    <img :src="refinedSrc" :alt="alt" :width="width" :height="height">
    <figcaption v-if="alt" class="text-gray text-sm mt-4 break-all">{{ alt }}</figcaption>
  </figure>
</template>

<style scoped>
figure {
  @apply my-8 text-center;
}

img {
  @apply shadow-xl max-w-[73%] rounded-md overflow-hidden;
}
</style>
