<script setup lang="ts">
import { formatDateTime } from '~/utils/helper'
import Lightense from 'lightense-images'

const route = useRoute()
const currentContent = await queryContent('posts', route.params.slug[1]).findOne()

// TODO: override from content frontmatter
useHead({
  title: currentContent.title + ' | unickhow',
  meta: [
    { hid: 'description', name: 'description', content: currentContent.description },
    { hid: 'og:title', property: 'og:title', content: currentContent.title },
    { hid: 'og:description', property: 'og:description', content: currentContent.description },
    { hid: 'og:image', property: 'og:image', content: currentContent.image ?? 'https://hackmd.io/_uploads/SylCzI7Ja.png' },
    { hid: 'og:url', property: 'og:url', content: `https://unick.how/${currentContent._path}` },
    { hid: 'twitter:title', name: 'twitter:title', content: currentContent.title },
    { hid: 'twitter:description', name: 'twitter:description', content: currentContent.description },
    { hid: 'twitter:image', name: 'twitter:image', content: currentContent.image ?? 'https://hackmd.io/_uploads/SylCzI7Ja.png' },
    { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
    { hid: 'twitter:site', name: 'twitter:site', content: 'https://unick.how/' }
  ]
})

const [prev, next] = await queryContent()
  .only(['_path', 'title'])
  .sort({ date: 1 })
  .where({ hidden: false })
  .findSurround(`/posts/${route.params.slug[1]}`)

onMounted(async () => {
  await nextTick()
  const images = document.querySelectorAll('.blog-md-container img')
  Lightense(images, {
    time: 300,
    padding: 40,
    offset: 40,
    keyboard: true,
    cubicBezier: 'cubic-bezier(.2, 0, .1, 1)',
    background: 'rgba(255, 255, 255, .1)',
    zIndex: 2147483647
  })
})
onBeforeUnmount(() => {
  // remove lightense-backdrop
  const backdrop = document.querySelector('.lightense-backdrop')
  if (backdrop) backdrop.remove()
})

const router = useRouter()
function handleTagClick (tag: string) {
  router.push({
    path: '/posts',
    query: { tags: tag }
  })
}
</script>

<template>
  <div class="blog-md-container post-provider px-4">
    <article class="container mx-auto my-10 max-w-[666px] relative">
      <ContentDoc #default="{ doc }">
        <span class="text-dark dark:text-pale italic opacity-50">{{ formatDateTime(doc.date) }}</span>
        <div class="flex flex-wrap gap-3 mt-2">
          <TagLabel
            v-for="tag in doc.tags"
            :key="doc.title + tag"
            :value="tag"
            @click="handleTagClick(tag)" />
        </div>

        <h1>{{ doc.title }}</h1>
        <p>{{ doc.description }}</p>

        <TableOfContents :doc="doc" />

        <ContentRenderer :value="doc" />
      </ContentDoc>

      <hr>

      <div class="surround-navigator flex justify-between items-start gap-4 my-12">
        <div class="w-1/3">
          <NuxtLink
            v-if="prev"
            :to="prev._path"
            class="surround-navigator__prev text-dark dark:text-pale flex flex-col items-start">
            <span class="text-sm text-primary font-bold">← Prev</span>
            <p class="!my-0">{{ prev.title }}</p>
          </NuxtLink>
        </div>
        <NuxtLink
          to="/posts"
          class="w-1/3 surround-navigator__back text-dark dark:text-pale text-center">
          <span class="text-sm font-bold">cd ..</span>
        </NuxtLink>
        <div class="w-1/3">
          <NuxtLink
            v-if="next"
            :to="next._path"
            class="surround-navigator__next text-dark dark:text-pale flex flex-col items-end">
            <span class="text-sm text-primary font-bold">Next →</span>
            <p class="!my-0">{{ next.title }}</p>
          </NuxtLink>
        </div>
      </div>
    </article>
  </div>
</template>

<style>
@import '~/styles/_markdown.css';
.surround-navigator__prev span, .surround-navigator__next span {
  @apply transition;
}
.surround-navigator__prev:hover span {
  @apply -translate-x-2;
}
.surround-navigator__next:hover span {
  @apply translate-x-2;
}
</style>