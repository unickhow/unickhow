<template>
  <div v-show="isActive" class="ls-modal">
    <code>
      > ls
      <br />
      <br />
      <div class="flex flex-col">
        <span
          v-for="project in sideProjects"
          :key="project.name"
          class="px-4 py-2"
          target="_blank">[{{ project.shortcut }}] - {{ project.name }}</span>
      </div>
    </code>
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys, whenever } from '@vueuse/core'
import { sideProjects } from '../components/sideProjects'
import { useCodeType } from '../utils/codeType'
import { useMagicVocal } from '../components/magicVocal';

const isActive = ref(false)

const shortcuts = sideProjects.map(project => project.shortcut).filter(Boolean)
shortcuts.forEach(shortcut => {
  const keyDown = useMagicKeys()[shortcut]
  whenever(keyDown, () => {
    if (isActive.value) window.open(sideProjects.find(project => project.shortcut === shortcut)?.link, '_blank')
  })
})

const { isCodeMatched } = useCodeType()

watch(
  isCodeMatched,
  (val) => {
    isActive.value = val
  }
)

const { result } = useMagicVocal()
watch(result, (val) => {
  if (!isActive.value && val.includes('project')) {
    isActive.value = true
  } else if (!!isActive.value && val.includes('close')) {
    isActive.value = false
  }
})
</script>

<style>
.ls-modal {
  @apply relative p-2rem absolute border border-white rounded-lg left-[50%] top-[50%] overflow-hidden;
  width: 100%;
  max-width: 400px;
  transform: translate(-50%, -50%);
  color: white;
}

.ls-modal::before {
  @apply absolute;
  width: 110%;
  height: 110%;
  left: -5%;
  top: -5%;
  content: '';
  background: rgba(10, 30, 30, .8);
  z-index: -1;
  backdrop-filter: blur(5px);
}
</style>
