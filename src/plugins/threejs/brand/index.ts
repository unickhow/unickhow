import { onMounted, ref, nextTick, watch } from "vue"

export const useBrandModel = (el: string) => {
  const isGltfLoaded = ref(false)
  let scene: any
  let THREE: any
  onMounted(async () => {
    THREE = await import('three')
    const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls')
    const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader')

    await nextTick()

    const canvas = document.querySelector(el) as HTMLCanvasElement

    const sizes = {
      width: canvas.clientWidth,
      height: canvas.clientHeight
    }

    scene = new THREE.Scene()
    const light = new THREE.PointLight(0xffffff, 99, 73)
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

    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.physicallyCorrectLights = true
    renderer.shadowMap.enabled = true
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setSize(sizes.width, sizes.height)
    canvas.appendChild(renderer.domElement)
    renderer.setClearColor(0x000000, 0)

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
  })

  return { isGltfLoaded }
}
