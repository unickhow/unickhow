<script setup lang="ts">
import { sideProjects } from '../static/sideProject'

useHead({
  title: 'Attempts',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'unickhow\'s personal website'
    }
  ]
})
</script>

<template>
  <div class="container mx-auto max-w-[1024px] px-4">
    <div class="side-projects flex flex-col gap-8 max-w-[400px] mx-auto py-10">
      <div
        v-for="project in sideProjects"
        :key="project.name"
        class="w-full">
        <ClientOnly>
          <ProjectCard
            :project="project"
            class="project-card" />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
