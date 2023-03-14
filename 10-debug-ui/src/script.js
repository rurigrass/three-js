import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

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
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const params = {
  color: 0xffff00,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
};
const material = new THREE.MeshBasicMaterial({ color: params.color });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Debug position + rotation
gui.add(mesh.position, "x").min(-3.1).max(3.2).step(0.01).name("left/right");
gui.add(mesh.position, "y").min(-3.1).max(3.2).step(0.01).name("down/up");
gui.add(mesh.position, "z").min(-6.2).max(2.33).step(0.01).name("far/near");
gui.add(mesh.rotation, "x", -3.2, 3.2, 0.1);
gui.add(mesh.rotation, "y", -3.2, 3.2, 0.1);
gui.add(mesh.rotation, "z", -3.2, 3.2, 0.1);
//Debug visibility
gui.add(mesh, "visible");
//Debug wireframe
gui.add(material, "wireframe");
//Debug colors
gui.addColor(params, "color").onChange(() => material.color.set(params.color));
//Debug funtion
gui.add(params, "spin");

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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
