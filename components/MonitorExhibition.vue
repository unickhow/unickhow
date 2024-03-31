<script setup lang="ts">
import { paletter } from '~/utils/helper'
import glitch from '/assets/glitch.gif'

const props = withDefaults(defineProps<{
  isVisible: boolean,
  color: string,
  rotateX: string,
  rotateY: string,
  rotateZ: string,
  screen: string,
  captions: [number, string]
}>(), {
  isVisible: false,
  color: '#2effc0',
  rotateX: '0deg',
  rotateY: '0deg',
  rotateZ: '0deg',
  screen: ''
})

const noSignals = [
  'https://i.pinimg.com/originals/e3/aa/8c/e3aa8ccb65a2aca19df86525fa4dbe4a.gif',
  'https://images.squarespace-cdn.com/content/v1/59649517e110eb4540b1dfe6/1579624257635-YPO7RVCDIDYF6GU1LQ53/no+signal.gif?format=2500w'
]

const displayScreen = ref('')
const hasSignal = ref(true)
watchEffect(() => {
  displayScreen.value = props.screen || noSignals[Math.floor(Math.random() * noSignals.length)]
  hasSignal.value = props.screen !== ''
})

const randomDelay = Math.floor(Math.random() * 5) + 's'

const { isDark } = useTheme()
const matrixGreen = '#00ff41'

const monitor = ref<HTMLElement | null>(null)

const mainColor = computed(() => isDark.value ? matrixGreen : props.color)
const stripeColor = computed(() => paletter([isDark.value ? matrixGreen : mainColor.value], 150, .3)?.[0])
const bgColor = computed(() => paletter([isDark.value ? matrixGreen : mainColor.value], 10, 0.2)?.[0])

const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

const isOnLeftSide = computed(() => {
  const { left } = monitor.value?.getBoundingClientRect() || {}
  return left! < window.innerWidth / 2
})

const screenStyle = computed(() => {
  return {
    backgroundImage: `url(${displayScreen.value})`,
    ...hasSignal ? { animation: 'camera-moving-x 7s alternate infinite' } : {}
  }
})

const ouOfBoxTextStyle = computed(() => {
  return {
    color: isDark.value ? '#12f35d' : mainColor.value,
    transform: isOnLeftSide.value
      ? 'translateX(3rem) translateY(2rem)'
      : 'translateX(-3rem) translateY(3.7rem',
    ...isOnLeftSide.value ? { right: 0 } : { left: 0 },
    textAlign: isOnLeftSide.value ? 'right' : 'left'
  } as any
})
</script>

<template>
  <div
    ref="monitor"
    class="monitor"
    :class="{
      'halo': isDark,
      'on': isVisible
    }">
    <div class="screen-overlay p-3" :style="{ color: mainColor }">
      <div class="flex items-start mark-recording gap-1">
        <Icon name="mdi:record" class="text-xs flex-shrink-0" />
        <span class="text-[8px] font-press">REC {{ timestamp }}</span>
      </div>
    </div>
    <div
      v-if="hasSignal && isDark"
      class="glitch filter-sepia-[50%] absolute z-2 opacity-0 w-full h-full top-0 left-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${glitch})` }"></div>
    <div
      class="screen absolute z-1 opacity-50 w-full h-full top-0 left-0 bg-center bg-no-repeat"
      :style="screenStyle"></div>

    <div
      class="out-of-box absolute z-2 bottom-0 font-press flex flex-col gap-4"
      :class="{ 'is-glitching': isDark }"
      :style="ouOfBoxTextStyle">
      <span>#{{ captions?.[0] }}</span>
      <span>{{ captions?.[1] }}</span>
    </div>
  </div>
</template>

<style scoped>
.monitor {
  --perspective: 600px;
  --opacity_glitch: .7;

  @apply border-1 fixed right-12 aspect-[9/16] user-select-none pointer-events-none;
  top: 10%;
  left: 4%;
  right: auto;
  bottom: auto;
  width: 14%;
  min-width: 170px;
  background: v-bind('bgColor');
  transition: transform 0.07s linear;
  transform:
    perspective(var(--perspective))
    rotateX(v-bind(rotateX))
    rotateY(v-bind(rotateY))
    rotateZ(v-bind(rotateZ))
    scaleY(0);
  z-index: 10;
  will-change: transform;
}

.monitor.halo {
  background: #fffffff0;
  box-shadow: 0 0 70px 30px #ffffff73, 0 0 25px 1px #fffffff0;
  animation-name: halo-breathing;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
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
  @apply absolute z-2 inset-0 border-solid border-2 opacity-30;
  box-sizing: border-box;
  border-color: v-bind('mainColor');
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
  animation-name: monitor-stripe;
  animation-duration: 13s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  position: absolute;
  z-index: 2;
  left: 0px;
  top: 0px;
}

.mark-recording, .mark-timestamp {
  animation-name: recording;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  will-change: opacity;
}

.glitch {
  animation-name: glitch-flash;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-delay: v-bind(randomDelay);
  will-change: opacity;
}

.screen {
  background-size: 110% 100%;
  backface-visibility: hidden;
}

.out-of-box.is-glitching span{
  transition: none;
  animation-name: glitch;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-delay: v-bind(randomDelay);
  will-change: transform, opacity;
}
</style>
