import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * DEBUG - GUI
 */
const gui = new GUI();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughNessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

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
 * Materials
 */
// // MESH MATERIAL
// const material = new THREE.MeshBasicMaterial();
// //adds the texture
// material.map = doorColorTexture;
// // adds a color
// material.color = new THREE.Color(0x00ff00);
// //changes opacity + needs to be transparent true
// material.opacity = 0.5;
// material.transparent = true;
// //add alpha texture (its like an empty mask I think)
// material.alphaMap = doorAlphaTexture;
// //add both sides to flat object
// material.side = THREE.DoubleSide;

// // MESH NORMAL MATERIAL
// const material = new THREE.MeshNormalMaterial();
// //add both sides to flat object
// material.side = THREE.DoubleSide;
// // mattens the curves of an object
// material.flatShading = true;

// // MESH MATCAP MATERIAL
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// // MESH DEPTH MATERIAL // this is dark
// const material = new THREE.MeshDepthMaterial();

// // MESH LAMBERT MATERIAL //
// const material = new THREE.MeshLambertMaterial();

// // MESH PHONG MATERIAL //
// const material = new THREE.MeshPhongMaterial();
// //makes it shiny
// material.shininess = 100;
// //add color to the spec of light
// material.specular = new THREE.Color(0xff0000);

// // MESH TOON MATERIAL
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture;

// // MESH STANDARD MATERIAL
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.5;
material.roughness = 0.5;
material.map = doorColorTexture;

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
torus.position.x = 1.5;
scene.add(sphere, plane, torus);
console.log(plane.geometry);

/**
 * DEBUG UI
 */
gui.add(material, "wireframe");
gui.add(material, "metalness").min(0).max(1).step(0.0001).name("metalness");
gui.add(material, "roughness").min(0).max(1).step(0.0001).name("roughness");

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  120,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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

  //Update Objects
  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
