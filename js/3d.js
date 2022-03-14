;(function () {
  let isMobile = window.innerWidth < 640
  const SEPARATION = 100,
    AMOUNTX = 50,
    AMOUNTY = 50

  let container, stats
  let camera, scene, renderer

  let particles,
    count = 0

  let mouseX = 0,
    mouseY = 0

  let windowHalfX = window.innerWidth / 2
  let windowHalfY = window.innerHeight / 2

  init()
  animate()

  function init() {
    container = document.createElement('div')
    document.getElementById('threejs').appendChild(container)

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    )

    scene = new THREE.Scene()

    const numParticles = AMOUNTX * AMOUNTY

    const positions = new Float32Array(numParticles * 3)
    const scales = new Float32Array(numParticles)

    let i = 0,
      j = 0

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2 // x
        positions[i + 1] = 0 // y
        positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2 // z

        scales[j] = 1

        i += 3
        j++
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    const near = 1250
    const far = 2500
    const color = 0xffffff
    scene.fog = new THREE.Fog(color, near, far)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: { type: 'c', value: new THREE.Color('#f56e2b') },
        fogColor: { type: 'c', value: scene.fog.color },
        fogNear: { type: 'f', value: scene.fog.near },
        fogFar: { type: 'f', value: scene.fog.far },
      },
      vertexShader: document.getElementById('vertexshader').textContent,
      fragmentShader: document.getElementById('fragmentshader').textContent,
      fog: true,
    })

    particles = new THREE.Points(geometry, material)
    scene.add(particles)

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    const controls = new THREE.OrbitControls(camera, renderer.domElement)

    camera.position.set(800, 640, 1200)
    controls.update()

    container.style.touchAction = 'none'

    document
      .getElementById('firstSection')
      .addEventListener('pointermove', onPointerMove)

    //

    window.addEventListener('resize', onWindowResize)
  }

  function onWindowResize() {
    windowHalfX = window.innerWidth / 2
    windowHalfY = window.innerHeight / 2

    isMobile = window.innerWidth < 640

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  function onPointerMove(event) {
    if (event.isPrimary === false) return

    mouseX = event.clientX - windowHalfX
    mouseY = event.clientY - windowHalfY
  }

  function animate() {
    requestAnimationFrame(animate)

    if (isMobile) {
      return
    }

    render()
  }

  function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.005

    const positions = particles.geometry.attributes.position.array
    const scales = particles.geometry.attributes.scale.array

    let i = 0,
      j = 0

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i + 1] =
          Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50

        scales[j] =
          (Math.sin((ix + count) * 0.3) + 1) * 20 +
          (Math.sin((iy + count) * 0.5) + 1) * 20

        i += 3
        j++
      }
    }

    particles.geometry.attributes.position.needsUpdate = true
    particles.geometry.attributes.scale.needsUpdate = true

    renderer.render(scene, camera)

    count += 0.04
  }
})()
