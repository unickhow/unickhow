<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { paletter } from '~/utils/helper'

const props = withDefaults(defineProps<{
  isVisible: boolean,
  color: string,
  rotateX: string,
  rotateY: string,
  rotateZ: string,
  screen: string
}>(), {
  isVisible: false,
  color: '#2effc0',
  rotateX: '0deg',
  rotateY: '0deg',
  rotateZ: '0deg',
  screen: ''
})

const theme = useStorage('unickTheme', 'light')
const isDark = computed(() => theme.value === 'dark')

const monitor = ref<HTMLElement | null>(null)

const mainColor = computed(() => props.color)
const stripeColor = computed(() => paletter([mainColor.value], 150, .3)?.[0])
const bgColor = computed(() => paletter([mainColor.value], 10, 0.2)?.[0])

const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
</script>

<template>
  <div
    ref="monitor"
    class="monitor"
    :class="{
      'halo': isDark,
      'on': isVisible
    }">
    <div class="screen-overlay p-2" :style="{
          color: mainColor
        }">
      <div class="flex items-center text-sm mark-recording">
        <Icon name="mdi:record" />
        <span>REC</span>
      </div>
      <div class="absolute right-3 top-2 text-xs mark-timestamp">
        <span>{{ timestamp }}</span>
      </div>
    </div>
    <div class="screen absolute z-1 opacity-50 w-full h-full top-0 left-0 bg-cover bg-center bg-no-repeat" :style="{ backgroundImage: `url(${props.screen})` }"></div>
  </div>
</template>


<style scoped>

.monitor {
  --perspective: 600px;

  @apply overflow-hidden border-1 fixed right-12 aspect-[9/16];
  top: 10%;
  left: 4%;
  right: auto;
  bottom: auto;
  width: 200px;
  background: v-bind('bgColor');
  transition: transform 0.07s linear;
  transform:
    perspective(var(--perspective))
    rotateX(v-bind(rotateX))
    rotateY(v-bind(rotateY))
    rotateZ(v-bind(rotateZ))
    scaleY(0);
  z-index: 10;
}

.monitor.halo {
  background: white;
  box-shadow: 0 0 120px 30px v-bind('mainColor'), 0 0 25px 1px v-bind('mainColor');
}

.monitor.on {
  transform:
    perspective(var(--perspective))
    rotateX(v-bind(rotateX))
    rotateY(v-bind(rotateY))
    rotateZ(v-bind(rotateZ))
    scaleY(1);
}

.monitor::before {
  content: '';
  @apply absolute z-2 inset-0 border-solid border-1 border-primary opacity-40;
  box-sizing: border-box;
  width: calc(100% - 12px);
  height: calc(100% - 12px);
  top: 6px;
  left: 6px;
}

.screen-overlay {
  background: linear-gradient(
    v-bind(stripeColor),
    v-bind(stripeColor) 1px,
    transparent 4px,
    transparent 4px
  );
  background-size: 100% 7px;
  height: 100%;
  width: 100%;
  animation: monitor-stripe 13s infinite linear;
  position: absolute;
  z-index: 2;
  left: 0px;
  top: 0px;
}

.mark-recording, .mark-timestamp {
  animation: recording 1s infinite;
}

@keyframes monitor-stripe {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 0% -100%;
  }
}

@keyframes recording {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 50%;
  }
  80% {
    opacity: 50%;
  }
  100% {
    opacity: 0;
  }
}
</style>
