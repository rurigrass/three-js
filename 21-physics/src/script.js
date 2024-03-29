import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as CANNON from "cannon-es";

THREE.ColorManagement.enabled = false;

/**
 * Debug
 */
const gui = new GUI();
const debugObject = {};

debugObject.createSphere = () => {
  createSphere(Math.random() * 0.5, {
    x: (Math.random() - 0.5) * 5,
    y: 3,
    z: (Math.random() - 0.5) * 5,
  });
};

gui.add(debugObject, "createSphere");

debugObject.createBox = () => {
  createBox(Math.random(), Math.random(), Math.random(), {
    x: (Math.random() - 0.5) * 5,
    y: 3,
    z: (Math.random() - 0.5) * 5,
  });
};

gui.add(debugObject, "createBox");

debugObject.reset = () => {
  console.log("reset");
  //loop through our objects and remove them.
  for (const object of objectsToUpdate) {
    //remove body - physics world
    object.body.removeEventListener("collide", playHitSound);
    world.removeBody(object.body);
    //remove mesh
    scene.remove(object.mesh);
  }
  //empty objectsToUpdate
  objectsToUpdate.splice(0, objectsToUpdate.length);
};
gui.add(debugObject, "reset");

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * SOUNDS
 */

const hitSound = new Audio("/sounds/hit.mp3");
const playHitSound = (collision) => {
  //this measures the strength of the impact - sound only plays if impact is strong
  const impactStrength = collision.contact.getImpactVelocityAlongNormal();
  //resets sound to start when new one plays
  if (impactStrength > 2.5) {
    hitSound.volume = (Math.random() + 0.5) / 1.5;
    hitSound.currentTime = 0;
    hitSound.play();
  } else if (impactStrength > 1.5 && impactStrength < 2.5) {
    hitSound.volume = 0.25;
    hitSound.currentTime = 0;
    hitSound.play();
  }
};

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.png",
  "/textures/environmentMaps/0/nx.png",
  "/textures/environmentMaps/0/py.png",
  "/textures/environmentMaps/0/ny.png",
  "/textures/environmentMaps/0/pz.png",
  "/textures/environmentMaps/0/nz.png",
]);

/**
 * PHYSICS
 */

//WORLD
const world = new CANNON.World();
//broadphase - this is better for performance - not sure why
world.broadphase = new CANNON.SAPBroadphase(world);
// improves performance - ones that dont move sleep
world.allowSleep = true;
//gravity is on y axis, -9.82 is the earth gravity constant
world.gravity.set(0, -9.82, 0);

//MATERIALS - in the physics senseb
// const concreteMaterial = new CANNON.Material("concrete");
// const plasticMaterial = new CANNON.Material("plastic");
// const concretePlasticContactMaterial = new CANNON.ContactMaterial(
//   concreteMaterial,
//   plasticMaterial,
//   {
//     //default in these is 0.3
//     //more friction more slide - less friction less slide/slippy
//     friction: 0.1,
//     //restitution = bounciness
//     restitution: 0.7,
//   }
//   );

const defaultMaterial = new CANNON.Material("default");
const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    //default in these is 0.3
    //more friction more slide - less friction less slide/slippy
    friction: 0.1,
    //restitution = bounciness
    restitution: 0.7,
  }
);

// world.addContactMaterial(concretePlasticContactMaterial);
// world.addContactMaterial(defaultContactMaterial);
world.defaultContactMaterial = defaultContactMaterial;

//this is the physics sphere
// //SPHERE
// const sphereShape = new CANNON.Sphere(0.5);
// const sphereBody = new CANNON.Body({
//   mass: 1,
//   position: new CANNON.Vec3(0, 3, 0),
//   shape: sphereShape,
//   // material: plasticMaterial,
// });
// sphereBody.applyLocalForce(
//   new CANNON.Vec3(150, 0, 0),
//   new CANNON.Vec3(0, 0, 0)
// );
// world.addBody(sphereBody);

//FLOOR
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body({
  mass: 0,
  shape: floorShape,
  // material: concreteMaterial,
});
world.addBody(floorBody);
//you need to rotate the floor as by default its vertical
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);

//FORCES
// const pushObject = CANNON.
// sphereBody.applyLocalForce(
//   new CANNON.Vec3(0.5, 0.3, 0.3),
//   new CANNON.Vec3(0.5, 0.3, 0.3)
// );

// /**
//  * Test sphere
//  */
// //visual sphere
// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(0.5, 32, 32),
//   new THREE.MeshStandardMaterial({
//     metalness: 0.3,
//     roughness: 0.4,
//     envMap: environmentMapTexture,
//     envMapIntensity: 0.5,
//   })
// );
// sphere.castShadow = true;
// sphere.position.y = 0.5;
// scene.add(sphere);

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#777777",
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

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
camera.position.set(-3, 3, 3);
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
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * UTILS / FUNCTIONS TO CREATE SPHERES
 */

const objectsToUpdate = [];

// SPHERE SPHERE SPHERE
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
  // envMapIntensity: 0.5,
});

const createSphere = (radius, position) => {
  //three.js mesh
  const mesh = new THREE.Mesh(
    // new THREE.SphereGeometry(radius, 20, 20),
    sphereGeometry,
    // new THREE.MeshStandardMaterial({
    //   metalness: 0.3,
    //   roughness: 0.4,
    //   envMap: environmentMapTexture,
    //   // envMapIntensity: 0.5,
    // })
    sphereMaterial
  );
  mesh.scale.set(radius, radius, radius);
  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);

  //Cannon.js body
  const shape = new CANNON.Sphere(radius);
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape,
    //not necessary
    // material: defaultMaterial,
  });
  body.position.copy(position);
  body.addEventListener("collide", playHitSound);
  world.addBody(body);

  //Save in Objects to update
  objectsToUpdate.push({
    mesh,
    body,
  });
};

// BOX BOX BOX
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
});
const createBox = (width, height, depth, position) => {
  //THREE.js mesh
  const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
  mesh.scale.set(width, height, depth);
  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);
  //CANNON body
  const shape = new CANNON.Box(
    new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5)
  );
  const body = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 3, 0),
    shape,
  });
  body.position.copy(position);
  body.addEventListener("collide", playHitSound);
  world.addBody(body);

  //Save in Objects to update
  objectsToUpdate.push({
    mesh,
    body,
  });
};

//RUN DA FUNCTIONS
createBox(1, 1, 1, { x: 1, y: 3, z: 1 });
createSphere(0.5, { x: -1, y: 3, z: -1 });
// createSphere(0.5, { x: 1, y: 3, z: 1 });
// createSphere(0.5, { x: -1, y: 3, z: 1 });
// createSphere(0.5, { x: 1, y: 3, z: -1 });

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  //UPDATE PHYSICS WORLD
  //apply a slight wind
  // sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position);
  //1: timestep, 2nd: how much time in seconds spent since last tick, 3rd: number of frames
  world.step(1 / 60, deltaTime, 3);
  //make sure sphere and gravitational sphere are in the same place
  // sphere.position.copy(sphereBody.position);
  //doing this but for multiple objects
  for (const object of objectsToUpdate) {
    object.mesh.position.copy(object.body.position);
    object.mesh.quaternion.copy(object.body.quaternion);
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
