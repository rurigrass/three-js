import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture1 = textureLoader.load("/textures/particles/1.png");
const particleTexture2 = textureLoader.load("/textures/particles/2.png");
const particleTexture3 = textureLoader.load("/textures/particles/3.png");
const particleTexture4 = textureLoader.load("/textures/particles/4.png");
const particleTexture5 = textureLoader.load("/textures/particles/5.png");
const particleTexture6 = textureLoader.load("/textures/particles/6.png");
const particleTexture7 = textureLoader.load("/textures/particles/7.png");
const particleTexture8 = textureLoader.load("/textures/particles/8.png");
const particleTexture9 = textureLoader.load("/textures/particles/9.png");
const particleTexture10 = textureLoader.load("/textures/particles/10.png");
const particleTexture11 = textureLoader.load("/textures/particles/11.png");
const particleTexture12 = textureLoader.load("/textures/particles/12.png");
const particleTexture13 = textureLoader.load("/textures/particles/13.png");

/**
 * Particles
 */
//Geometry
const particlesGeometry = new THREE.BufferGeometry();
const count = 20000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

//Material
const particlesMaterial = new THREE.PointsMaterial({
  //   color: 0xff88cc,
  vertexColors: true,
  size: 0.1,
  sizeAttenuation: true,
  transparent: true,
  //makes things see through but makes everything seethrough
  //   alphaTest: 0.001,
  //   depthTest: false,
  // this is better for making things seethrough as it doesnt affect all objects
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  alphaMap: particleTexture2,
});
//Particle Poiunts
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// //SUN
// const sunGeometry = new THREE.SphereGeometry(0.5, 32, 16);
// const sunMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
// const sun = new THREE.Mesh(sunGeometry, sunMaterial);
// scene.add(sun);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

    // Update all particles
    particles.rotation.y = elapsedTime * -0.2;
    particles.rotation.z = elapsedTime * 0.2;
    particles.rotation.x = elapsedTime * 0.2;

  // Update individual particles
//   particlesGeometry.attributes.position.needsUpdate = true;
//   for (let i = 0; i < count; i++) {
//     const i3 = i * 3;
//     const x = particlesGeometry.attributes.position.array[i3 + 0];
//     // const particlesY = particlesGeometry.attributes.position.array[i3 + 1];
//     // particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
//   }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
