<script setup lang="ts">
useServerSeoMeta({
  robots: 'noindex, nofollow'
})
definePageMeta({
  layout: 'blank'
})
</script>

<template>
  <div class="container mx-auto max-w-[768px]">
    <div class="card">
      <div class="card__cover overflow-hidden rounded-xl border-solid border-1 border-[#d1d1d1]">
        <img src="https://blog.zh-hant.playstation.com/tachyon/sites/8/2024/09/c0653bc80702cf5694960caec9ed2edb8db5d4d8.jpg" alt="ps5 pro" class="block w-full h-auto object-fill">
      </div>
      <div class="card__content max-w-[calc(100%-2rem)] mx-auto -mt-4 border-solid border-1 border-[#d1d1d1] shadow-md rounded-xl pt-6 p-4">
        <h5 class="text-lg mb-2">{{ $route.query.title }}</h5>
        <p v-if="$route.query.description" class="text-gray leading-normal line-clamp-2">{{ $route.query.description }}</p>
        <p v-else class="text-gray-400 italic">No description</p>

        <strong class="block mt-4 text-xl">NT$ 24,000</strong>

        <div class="flex justify-between items-center mt-6">
          <button class="btn btn-text">Add to cart</button>
          <button class="btn btn-primary">Buy now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s;
  &.btn-text {
    color: #078abc;
    &:hover {
      background-color: #f0f0f0;
    }
  }
  &.btn-primary {
    background-color: #078abc;
    color: #fff;
    &:hover {
      background-color: #056c8d;
    }
  }
}
</style>
