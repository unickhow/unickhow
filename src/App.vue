<template>
  <router-link :to="{ name: 'Home' }">Home</router-link>
  <router-link :to="{ name: 'About' }">About</router-link>
  <router-view></router-view>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '@/components/HelloWorld.vue'
</script>


<style>
</style>
