<template>
  <div class="button-levels my-12 flex flex-col gap-8 items-center">
    <div class="flex items-center justify-center gap-4">
      <button class="is-primary">Primary</button>
      <button class="is-secondary">Secondary</button>
      <button class="is-text">Text</button>
    </div>

    <div class="button-levels-demo__confused flex items-center gap-4">
      <button class="is-primary">Cancel</button>
      <button class="is-primary">Confirm</button>
      <Icon name="iconamoon:sign-times" class="text-[#FF0000] font-bold text-xl" />
    </div>

    <div class="button-levels-demo__clear flex items-center gap-4">
      <button class="is-text">Cancel</button>
      <button class="is-primary">Confirm</button>
      <Icon name="ic:baseline-check" class="text-green font-bold text-xl" />
    </div>
  </div>
</template>

<style scoped>
.button-levels button {
  @apply px-4 py-1 rounded text-base hover:shadow hover:opacity-90 transition-all;
}

.button-levels .is-primary {
  @apply bg-primary text-white;
}

.button-levels .is-secondary {
  @apply bg-[#ff780022] text-orange;
}

.is-text {
  @apply bg-transparent text-primary hover:bg-[#f7f7f722];
}
</style>
