<script setup lang="ts">
const props = defineProps<{
  doc: any
}>()

const router = useRouter()
const tocLinks = computed(() => props.doc.body.toc.links ?? [])

const onClick = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    // router.replace({ hash: `#${id}` })
    const offset = 70
    const y = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="max-h-82 overflow-auto">
    <nav class="mt-4 flex toc-nav">
      <ul class="ml-0 pl-4 flex flex-col gap-1">
        <li
          v-for="{ id, text, children } in tocLinks"
          :id="`toc-${id}`"
          :key="id"
          class="ml-0 cursor-pointer list-none text-sm last:mb-0 py-1"
          @click="onClick(id)"
        >
          <span class="hover:text-primary">{{ text }}</span>
          <ul v-if="children" class="mt-2 ml-0 pl-4 flex flex-col gap-1">
            <li
              v-for="{ id: childId, text: childText } in children"
              :id="`toc-${childId}`"
              :key="childId"
              class="ml-0 cursor-pointer list-none text-xs py-1"
              @click.stop="onClick(childId)">
              <span class="hover:text-primary">{{ childText }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.toc-nav {
  border-bottom: 1px dashed var(--c__gray-lighter);
  border-top: 1px dashed var(--c__gray-lighter);
}
</style>
