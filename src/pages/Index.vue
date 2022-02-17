<template>
  <main class="page_root">
    <div class="container mx-auto">
      <div class="row sm:pt-10 md:pt-[20vh] flex flex-col md:flex-row">
        <div class="p-4 w-full md:w-1/2">
          <div class="kv-container aspect-video relative">
            <div
              class="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-opacity duration-2000"
              :class="isGltfLoaded ? 'opacity-0 -z-100' : 'opacity-100'">
              <EosIconsThreeDotsLoading class="text-yellow text-6xl opacity-66" />
            </div>
            <div
              id="logo"
              class="flex items-center justify-center w-full h-full transition-opacity duration-2000 delay-800"
              :class="isGltfLoaded ? 'opacity-100' : 'opacity-0'"></div>
          </div>
        </div>
        <div class="px-8 py-6 w-full md:w-1/2 font-fira main-content dark:text-pale">
          <h1 class="text-xl mb-8">() => 'Hello, world.'</h1>
          <div class="main-content__body mb-20">
            <p class="mb-4">
              this is my personal website, I'm still planning what and how to present.
            </p>
            <code id="jibber_jabber" class="text-gray dark:text-gray italic"></code>
          </div>

          <div class="main-content__hashtags flex flex-wrap text-sm mb-10">
            <a
              v-for="item in hashtags"
              :key="item.name"
              :href="item.link"
              class="py-2 mr-4 opacity-80 hover:opacity-100 transition-opacity"
              :class="{ 'pointer-events-none': !item.link }"
              :style="item.style"
              :target="item.link ? '_blank' : ''">
              {{ item.name }}
            </a>
          </div>

          <div class="main-content__footer flex">
            <a class="p-1 opacity-50 hover:opacity-90 transition-opacity" href="https://github.com/unickhow" target="_blank">
              <zmdiGithubBox />
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import EosIconsThreeDotsLoading from '~icons/eos-icons/three-dots-loading'
import zmdiGithubBox from '~icons/zmdi/github-box'
// TODO: extract three model logic
import { onMounted, nextTick, onUnmounted, ref } from 'vue'

type HashTag = {
  name: string
  style: string,
  link: string
}

const hashtags: HashTag[] = [
  {
    name: '#major_front_end',
    style: 'color: var(--c__white)',
    link: 'https://github.com/unickhow'
  },
  {
    name: '#Vue_developer',
    style: 'background: linear-gradient(45deg, #42b883, #6089f2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;',
    link: 'https://vuejs.org/'
  },
  {
    name: '#learning_nestjs',
    style: 'color: #ea2845',
    link: 'https://nestjs.com/'
  },
  {
    name: '#working_on_ts',
    style: 'color: #3178c6',
    link: 'https://www.typescriptlang.org/'
  },
  {
    name: '#vite_is_awesome',
    style: 'background: linear-gradient(45deg, #4dc2ff, #bd35fe); -webkit-background-clip: text; -webkit-text-fill-color: transparent;',
    link: 'https://vitejs.dev/'
  }
]

const isGltfLoaded = ref(false)
let typingInstance: any
onMounted(async () => {
  const THREE = await import('three')
  const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls')
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader')

  await nextTick()

  const canvas = document.getElementById('logo') as HTMLCanvasElement

  const sizes = {
    width: canvas.clientWidth,
    height: canvas.clientHeight
  }

  const scene = new THREE.Scene()
  const light = new THREE.PointLight(0xffffff, 99, 73);
  light.position.set(20, -10, 20)
  const lightHolder = new THREE.Group()
  lightHolder.add(light)
  scene.add(lightHolder)

  const camera = new THREE.PerspectiveCamera(
    67,
    sizes.width / sizes.height,
    1,
    100
  )
  camera.position.x = 10
  camera.position.y = 0
  camera.position.z = 7

  const renderer = new THREE.WebGLRenderer()
  renderer.physicallyCorrectLights = true
  renderer.shadowMap.enabled = true
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.setSize(sizes.width, sizes.height)
  canvas.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.enableZoom = false

  let model: THREE.Object3D
  const loader = new GLTFLoader()
  loader.load('/gltf/unickhow_logo.glb',
    gltf => {
      gltf.scene.traverse(child => {
        if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh
            m.receiveShadow = true
            m.castShadow = true
        }
        if ((child as THREE.Light).isLight) {
          const l = child as THREE.Light
          l.castShadow = true
          l.shadow.bias = -0.003
          l.shadow.mapSize.width = 500
          l.shadow.mapSize.height = 500
        }
      })
      model = gltf.scene
      model.rotation.y = 5
      scene.add(gltf.scene)
      isGltfLoaded.value = true
    }
  )

  window.addEventListener('resize', onWindowResize, false)
  function onWindowResize() {
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    render()
  }

  // const stats = Stats()
  // document.body.appendChild(stats.dom)

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    lightHolder.quaternion.copy(camera.quaternion)
    if (model) {
      model.rotation.y += 0.002
      // model.rotation.z += 0.001
      // model.rotation.x += 0.008
    }
    render()
    // stats.update()
  }

  function render() {
    renderer.render(scene, camera)
  }

  animate()

  // ============================================================

  // TODO: turn into ts way
  const TypeIt = (await import('typeit')).default
  typingInstance = new TypeIt('#jibber_jabber', {
    speed: 100,
  })
  typingInstance
    .type('// will launch every soo')
    .pause(800)
    .delete(9, { speed: 400 })
    .type('in couple da', { speed: 150 })
    .pause(1300)
    .delete(12)
    .pause(1500)
    .delete(7, { speed: 100 })
    .type('go on when somethi')
    .move(-8)
    .delete(4)
    .type('if')
    .move(8)
    .type('ng cross my mind ...')
    .go()
})

onUnmounted(() => {
  typingInstance.destroy()
})
</script>

<style scoped></style>
