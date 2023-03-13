import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

//REMOVED CUBE
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// //Position
// // mesh.position.x = 0.7;
// // mesh.position.y = -0.6;
// // mesh.position.z = 1;
// //this below does the same
// mesh.position.set(0.7, -0.6, 1);

// //Scale
// // mesh.scale.x = 2;
// // mesh.scale.y = 0.5;
// // mesh.scale.z = 0.5;
// mesh.scale.set(2, 0.5, 0.5);

// //Rotation
// // mesh.rotation.x = 1;
// // mesh.rotation.y = 1;
// // mesh.rotation.z = 1;
// //this below changes the rotation order of xyz
// mesh.rotation.reorder("YXZ");
// mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, Math.PI / 1);

const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.set(-2, 0, 0);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 2;

//add them to group
group.add(cube1, cube2, cube3);
scene.add(group);
group.rotation.y = 1;

//Axes helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
  width: 400,
  height: 400,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//changes the direction the camera is looking - looks straight at the vector3 (the mesh) - the actual object
// camera.lookAt(mesh.position);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// //animation
function rotate() {
  requestAnimationFrame(rotate);
  //   group.rotation.x += 0.01;
  group.rotation.y += 0.01;
  //   group.rotation.z += 0.01;
  renderer.render(scene, camera);
}
rotate();
