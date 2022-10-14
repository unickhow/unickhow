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
          target="_blank">[{{ project.shortcut }}] - {{ project.name.replace('<wbr>', '') }}</span>
      </div>
    </code>
  </div>
</template>

<script setup lang="ts">
import { useMagicKeys, whenever } from '@vueuse/core'
import { sideProjects } from '../components/sideProjects'
import { useCodeType } from '../utils/codeType'
import { useMagicVocal } from '../components/magicVocal';
import { CONSTANTS } from '../utils/enums'

const isActive = ref(false)

const shortcuts = sideProjects.map(project => project.shortcut).filter(Boolean)
shortcuts.forEach(shortcut => {
  const keyDown = useMagicKeys()[shortcut]
  whenever(keyDown, () => {
    if (isActive.value) window.open(sideProjects.find(project => project.shortcut === shortcut)?.link, '_blank')
  })
})

const { isCodeMatched, setIsCodeMatched } = useCodeType()

watch(
  isCodeMatched,
  (val) => {
    isActive.value = val
  }
)

const { result } = useMagicVocal()
watch(result, (val) => {
  if (!isActive.value && val.includes(CONSTANTS.KEYWORD_THEME_PROJECTS_OPEN)) {
    isActive.value = true
    setIsCodeMatched(true)
  } else if (!!isActive.value && val.includes(CONSTANTS.KEYWORD_THEME_PROJECTS_CLOSE)) {
    isActive.value = false
    setIsCodeMatched(false)
  }
})
</script>

<style>
.ls-modal {
  @apply relative p-2rem fixed border border-white rounded-lg left-[1rem] bottom-[1rem] overflow-hidden;
  width: calc(100% - 2rem);
  max-width: 400px;
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
