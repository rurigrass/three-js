import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * * Cursor
 */
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  //event.clientX far left of screen is 0 - / by width to get decimal / -0.5 to make 0 the middle
  cursor.x = event.clientX / sizes.width - 0.5;
  //event.clientY far top of screen is 0 - / by height to get decimal / -0.5 to make 0 the middle
  //this function has been reversed so now the far bottom of screen is 0
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: 600,
  height: 400,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// Camera
const aspectRatio = sizes.width / sizes.height;
//perspective camera, first is the field of view which is in degrees, here it is 75 degrees, second is aspect which is the size of the screen
// third is near which is  and fourth is far which is
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
// ortographic camera, has left, right, top, bottom, near, far parameters.
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
// console.log(camera.position.length());
// camera.lookAt(mesh.position);
scene.add(camera);

/**
 * Controls
 */
//this replaces the update camera based on mouse position in the tick function.
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   mesh.rotation.y = elapsedTime;
  //   mesh.position.x = Math.sin(elapsedTime);
  //   mesh.rotation.x = cursor.x;
  //   mesh.rotation.y = cursor.y;

  // //Update the camera
  //this one below will move the position of the camera depending on where the mouse is
  //   camera.position.x = cursor.x * 10;
  //   camera.position.y = cursor.y * 10;
  //this one below iwll change the position of the camera so much that it will actually rotate around the object once (this is PI*2)
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y * 5;
  //   camera.lookAt(mesh.position);

  //   Update Controls
  controls.update(); //you need this for the damping to work

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
