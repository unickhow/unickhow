<template>
  <div class="post-provider">
    <div class="container mx-auto my-10 max-w-[666px]">
      <span class="text-dark dark:text-pale italic opacity-50">{{ formatDateTime(frontmatter.date) }}</span>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { formatDateTime } from '../utils/helper'

defineProps({
  frontmatter: {
    type: Object,
    required: true,
  }
})
</script>
