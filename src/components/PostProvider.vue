<template>
  <div class="post-provider pt-16 px-4">
    <div class="container mx-auto my-10 max-w-[666px]">
      <span class="text-dark dark:text-pale italic opacity-50">{{ formatDateTime(frontmatter.date) }}</span>
      <div class="flex flex-wrap gap-2 mt-2">
        <TagLabel
          v-for="tag in frontmatter.tags"
          :key="frontmatter.title + tag"
          :value="tag" />
      </div>
      <article>
        <slot></slot>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { formatDateTime } from '../utils/helper'
import { FrontMatter } from '../types'
import { useRouter } from 'vue-router'
import Lightense from 'lightense-images'
import TagLabel from './TagLabel.vue'

const props = defineProps({
  frontmatter: {
    type: Object as () => FrontMatter,
    required: true
  }
})

// check is post is available by computed on schedule and hidden
const isAvailable = computed(() => {
  return !props.frontmatter.hidden && (new Date(props.frontmatter.schedule) < new Date())
})

const router = useRouter()
if (!isAvailable.value) {
  router.replace({ path: '/' })
}

onMounted(() => {
  const images = document.querySelectorAll('img')
  Lightense(images, {
    time: 300,
    padding: 40,
    offset: 40,
    keyboard: true,
    cubicBezier: 'cubic-bezier(.2, 0, .1, 1)',
    background: 'rgba(255, 255, 255, .1)',
    zIndex: 2147483647
  });
})
</script>
