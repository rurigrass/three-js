import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * TEXTURES
 */
// //COMPLICATED VERSION:
// const image = new Image();
// const texture = new THREE.Texture(image);
// //can be a bit slow to show image so below is necessary
// image.onload = () => {
//   texture.needsUpdate = true;
// };
// image.src = "/textures/door/color.jpg";

//SIMPLE VERSION
//Every load will go through this check for errors
const loadingManager = new THREE.LoadingManager();
// loadingManager.onStart = () => {
//   console.log("starting");
// };
// loadingManager.onLoad = () => {
//   console.log("load");
// };
// loadingManager.onProgress = () => {
//   console.log("progress");
// };
// loadingManager.onError = () => {
//   console.log("error");
// };
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/door/color.jpg");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const checkerboard = textureLoader.load("/textures/checkerboard-8x8.png");
const minecraft = textureLoader.load("/textures/minecraft.png");

// // this is the preset number of repeats of the texture on the surface
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// // this makes the texture mirrored
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// // This offsets the alignment of the texture
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// // this is the preset rotation
// colorTexture.rotation = Math.PI * 1;

// //This moves the rotation pivot to the center.
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// // not sure what mipmapping does exactly but u dont need it if you are using minfilter or nearestfilter
minecraft.generateMipmaps = false;
// // this is filtering - i think it stops blurriness or makes bluriness
// minecraft.minFilter = THREE.LinearFilter;
minecraft.minFilter = THREE.NearestFilter;
// // this magfilter makes it sharp like minecraft
minecraft.magFilter = THREE.NearestFilter;

/**
 * DEBUG - GUI
 */
const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: minecraft });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
  125,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

/**
 * GUI controls
 */
// gui.add(camera.position, "y").min(-3).max(3).step(0.1);
gui.add(mesh.rotation, "y").min(-3).max(3).step(0.1).name("spin");
gui
  .add(colorTexture.repeat, "x")
  .min(-10)
  .max(10)
  .step(0.1)
  .name("repeat UV x");
gui
  .add(colorTexture.repeat, "y")
  .min(-10)
  .max(10)
  .step(0.1)
  .name("repeat UV y");
gui
  .add(colorTexture, "rotation")
  .min(Math.PI * 0.25)
  .max(Math.PI * 2)
  .step(0.1)
  .name("texture rotation");
gui
  .add(camera, "fov", 50, 150, 1)
  .onChange(() => camera.updateProjectionMatrix());

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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
