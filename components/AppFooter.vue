<script setup lang="ts">
const links = [
  {
    name: 'GitHub',
    url: 'https://github.com/unickhow',
    icon: 'mdi:github-box'
  },
  {
    name: 'CodePen',
    url: 'https://codepen.io/uNickHow',
    icon: 'mdi:codepen'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/unickhow/',
    icon: 'mdi:linkedin'
  }
]
</script>

<template>
  <footer class="mt-auto py-4 flex items-center justify-center gap-3 relative">
    <a
      v-for="link in links"
      :key="link.name"
      class="opacity-50 hover:opacity-100 transition-opacity text-gray dark:text-pale p-2"
      :href="link.url"
      target="_blank">
      <Icon :name="link.icon" class="align-middle text-2xl" />
    </a>
  </footer>
</template>

<style scope>
.icon-rhino {
  transform-origin: left bottom;
}
.icon-rhino:hover {
  animation: horny 1s forwards;
}
@keyframes horny {
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(5deg);
  }
  55% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(-8deg);
  }
  100% {
    transform: rotate(-8deg);
  }
}
</style>
