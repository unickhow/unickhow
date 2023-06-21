<script setup lang="ts">
import { formatDateTime } from '~/utils/helper'
</script>

<template>
  <main class="blog-md-container">
    <div class="post-provider px-4">
      <article class="container mx-auto my-10 max-w-[666px]">
        <ContentDoc #default="{ doc }">
          <span class="text-dark dark:text-pale italic opacity-50">{{ formatDateTime(doc.date) }}</span>
          <div class="flex flex-wrap gap-2 mt-2">
            <TagLabel
              v-for="tag in doc.tags"
              :key="doc.title + tag"
              :value="tag" />
          </div>

          <h1>{{ doc.title }}</h1>
          <p>{{ doc.description }}</p>

          <TableOfContents />

          <ContentRenderer :value="doc" />
        </ContentDoc>
      </article>
    </div>
  </main>
</template>

<style>
@import '~/styles/_markdown.css';
</style>