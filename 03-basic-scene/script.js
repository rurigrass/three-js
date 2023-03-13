console.log(THREE);

//Scene
const scene = new THREE.Scene();

//Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
//Add the the mesh to the scene
scene.add(mesh);

//Sizes -  these are used for the size of the canvas + second argument in camera
const sizes = {
  width: 500,
  height: 400,
};

//Camera
//first arguments is the 'field of view', second arguments is aspect ratio (it's the w/h)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
