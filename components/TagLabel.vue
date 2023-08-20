<template>
  <label class="tag-label text-sm" v-bind="$attrs">
    <span class="bg-orange opacity-70 dark:opacity-100 px-2 text-white">{{ $props.value }}</span>
  </label>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style scoped>
.tag-label {
  @apply inline-flex items-center;
}
.tag-label::before {
  content: '';
  @apply w-2 h-full bg-orange dark:opacity-70;
}
</style>
