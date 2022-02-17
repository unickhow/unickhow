<template>
  <main class="page_root">
    <div class="container mx-auto">
      <div class="row pt-10 md:pt-[20vh] flex flex-col md:flex-row">
        <div class="p-4 w-full md:w-1/2 mb-12 md:mb-0">
          <div id="logo" class="flex items-center justify-center"></div>
        </div>
        <div class="p-8 w-full md:w-1/2 font-fira main-content dark:text-pale">
          <h1 class="text-xl mb-8">() => 'Hello, world.'</h1>
          <div class="main-content__body mb-20">
            <p class="mb-4">
              this is my personal website, I'm still planning what and how to present.
            </p>
            <code class="text-gray dark:text-gray italic">
              // will go on if something cross my mind ...<small class="text-cursor"></small>
            </code>
          </div>

          <div class="main-content__footer flex flex-wrap text-sm">
            <a
              v-for="item in hashtags"
              :key="item.name"
              :href="item.link"
              class="cursor-pointer py-2 mr-4"
              :class="{ 'pointer-events-none': !item.link }"
              :style="item.style"
              :target="item.link ? '_blank' : ''">
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
// TODO: extract three model logic
import { onMounted, nextTick } from 'vue'

type HashTag = {
  name: string
  style: string,
  link: string
}

const hashtags: HashTag[] = [
  {
    name: '#major_front_end',
    style: 'color: var(--c__white)',
    link: ''
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

onMounted(async () => {
  const THREE = await import('three')
  const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls')
  const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader')

  await nextTick()

  const canvas = document.getElementById('logo') as HTMLCanvasElement

  const sizes = {
    width: canvas.clientWidth,
    height: canvas.clientWidth / 1.5
  }

  const scene = new THREE.Scene()
  const light = new THREE.PointLight(0xffffff, 73, 73);
  light.position.set(20, -10, 20)
  const lightHolder = new THREE.Group()
  lightHolder.add(light)
  scene.add(lightHolder)

  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000
  )
  camera.position.x = 10
  camera.position.y = 5
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
      model.rotation.z = .15
      scene.add(gltf.scene)
    }
  )

  window.addEventListener('resize', onWindowResize, false)
  function onWindowResize() {
    camera.aspect = canvas.clientWidth / (canvas.clientWidth / 1.5)
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.clientWidth, (canvas.clientWidth / 1.5))
    render()
  }

  // const stats = Stats()
  // document.body.appendChild(stats.dom)

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    lightHolder.quaternion.copy(camera.quaternion)
    if (model) {
      model.rotation.y += 0.004
    }
    render()
    // stats.update()
  }

  function render() {
    renderer.render(scene, camera)
  }

  animate()
})
</script>

<style scoped>
.page_root {
  @apply h-screen;
}

.text-cursor {
  @apply bg-gray inline-block;
  opacity: 1;
  width: 3px;
  height: 16px;
  animation: blinking 2s infinite step-end;
}

@keyframes blinking {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
