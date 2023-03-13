import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 400,
  height: 400,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// //Time method.
// let time = Date.now();
// // Clock method
// const clock = new THREE.Clock();
// GSAP Method
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
gsap.to(mesh.rotation, { duration: 1, delay: 1, z: -2 });
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });
gsap.to(mesh.rotation, { duration: 1, delay: 2, z: 0 });

//animation
const tick = () => {
  //   // Time method - this makes the cube spin at the same speed regardless of the framerate
  //   const currentTime = Date.now();
  //   const deltaTime = currentTime - time;
  //   time = currentTime;

  // Clock method
  //   const elapsedTime = clock.getElapsedTime(); //this will count seconds passed starting from 0

  // Update objects
  //   mesh.position.x += 0.005;
  //   mesh.rotation.z -= 0.01 ;
  //   mesh.rotation.x += 0.01;
  // // Clock animations :
  //   mesh.rotation.z = elapsedTime * Math.PI * 2; //now its rotation is by the second. with Math.pi its one full rotation per second;
  //   mesh.position.y = Math.sin(elapsedTime); // this causes object oscillation up down up down etc
  //   mesh.position.x = Math.cos(elapsedTime); // this causes object oscillation right left right left etc
  //   camera.position.y = Math.sin(elapsedTime); // this causes camera oscillation up down up down etc
  //   camera.position.x = Math.cos(elapsedTime); // this causes camera oscillation right left right left etc
  //   camera.lookAt(mesh.position) //makes the camera always look at the cube
  // // gasap animations:

  // Render
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

tick();
