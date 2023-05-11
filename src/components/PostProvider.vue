<template>
  <div class="post-provider pt-16">
    <div class="container mx-auto my-10 max-w-[666px]">
      <span class="text-dark dark:text-pale italic opacity-50">{{ formatDateTime(frontmatter.date) }}</span>
      <article>
        <slot></slot>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { formatDateTime } from '../utils/helper'
import { FrontMatter } from '../types'
import { useRouter } from 'vue-router'

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
</script>
