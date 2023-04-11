import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from 'lil-gui'
import GUI from "lil-gui";
// import typefaceFont from 'fonts/gentilis_regular.typeface.json';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// // Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const matcapTexture2 = textureLoader.load("/textures/matcaps/5.png");

/**
 * Fonts
 */
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry(`Tailor\nMade\nSites`, {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  // // alternative to center()
  //   textGeometry.computeBoundingBox();
  //   textGeometry.translate(
  //     -textGeometry.boundingBox.max.x * 0.5,
  //      textGeometry.boundingBox.max.y,
  //     - textGeometry.boundingBox.max.z * 0.5
  //   );
  textGeometry.center();
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  //   textMaterial.matcap = matcapTexture;
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
  // gui.add(textMaterial, "wireframe");

  // // 100 DONUTS 0 0 0 0 0 0 0 o o oo
  console.time("donuts");
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
    const donutMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTexture2,
    });
  console.timeEnd("donuts");
  for (let i = 0; i <= 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);
  
    //RANDOM POSITIONS
    donut.position.x = (Math.random() - 0.5) * 7;
    donut.position.y = (Math.random() - 0.5) * 7;
    donut.position.z = (Math.random() - 0.5) * 7;
  
    //RANDOM ROTATIONS
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
  
    //RANDOM SCALES (SIZES)
    const scale = Math.random();
    // donut.scale.x = scale
    // donut.scale.y = scale
    // donut.scale.z = scale
    donut.scale.set(scale, scale, scale);
  
    //ADD TO SCENE
    scene.add(donut);
  }
});

/**
 * Object
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);

// scene.add(cube);

/**
 * DEBUG UI
 */

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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
