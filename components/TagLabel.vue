<template>
  <label class="tag-label text-xs cursor-pointer rounded overflow-hidden">
    <span class="bg-orange opacity-70 dark:opacity-100 px-2 sm:py-[2px] text-white">{{ $props.label ?? $props.value }}</span>
  </label>
</template>

<script>
export default {
  props: ['value', 'label']
}
</script>

<style scoped>
.tag-label {
  @apply inline-flex hover:-translate-y-1 transition;
}
.tag-label::before {
  content: '';
  @apply sm:w-2 h-auto bg-orange dark:opacity-70 flex-shrink-0;
}
</style>
