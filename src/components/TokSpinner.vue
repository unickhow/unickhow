<template>
  <div class="fixed -z-1 tok">
    <img src="/ouroboros.png" class="w-full h-auto" alt="">
  </div>
</template>

<style scoped>
.tok {
  @apply w-120 -bottom-60 -left-60 sm:w-180 sm:-bottom-90 sm:-left-90;
  animation: spinning 240s linear infinite, breathing 15s ease-in-out infinite;
}
</style>
