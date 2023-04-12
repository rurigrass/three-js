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
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
gui
  .add(ambientLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("ambient intensity");
scene.add(ambientLight);

// DIRECTIONAL LIGHT
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.position.set(2, 2, -1);
gui
  .add(directionalLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("directional intensity");
gui
  .add(directionalLight.position, "x")
  .min(-5)
  .max(5)
  .step(0.001)
  .name("directional x");
gui
  .add(directionalLight.position, "y")
  .min(-5)
  .max(5)
  .step(0.001)
  .name("directional y");
gui
  .add(directionalLight.position, "z")
  .min(-5)
  .max(5)
  .step(0.001)
  .name("directional z");
scene.add(directionalLight);

directionalLight.castShadow = false;
//below improves the quality of the shadow
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
directionalLight.shadow.radius = 10;

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.2
);
// scene.add(directionalLightHelper)

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
// scene.add(directionalLightCameraHelper)

// SPOT LIGHT
const spotLight = new THREE.SpotLight(0xffffff, 0.2, 10, Math.PI * 0.3);
spotLight.position.set(-2, 2, 2);
gui
  .add(spotLight, "intensity")
  .min(0)
  .max(2)
  .step(0.001)
  .name("spotLight intensity");
scene.add(spotLight);
scene.add(spotLight.target);

spotLight.castShadow = false;
//below adjustments to shadow quality
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
//how far the light or shadow travels
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 6;
//field of view
spotLight.shadow.camera.fov = 30;

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper)

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
// scene.add(spotLightCameraHelper)

// POINT LIGHT
const pointLight = new THREE.PointLight(0xffffff, 0.5, 10);
pointLight.position.set(-1, 1, 0);
scene.add(pointLight);

pointLight.castShadow = false;
//adjust shadow quality
pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024
//how far the shadow can go
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5
//blur of the shadow
pointLight.shadow.radius = 10

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
pointLightCameraHelper.visible = false
scene.add(pointLightCameraHelper);

gui.add(pointLight, "intensity").min(0).max(2).step(0.1).name("pointlight intensity")

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
plane.receiveShadow = true;

scene.add(sphere, plane);

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
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 6;
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

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
