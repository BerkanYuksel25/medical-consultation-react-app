// import {
//   Color,
//   LinearEncoding,
//   MeshBasicMaterial,
//   Mesh,
//   PerspectiveCamera,
//   sRGBEncoding,
//   Sprite,
//   HemisphereLight,
//   SpriteMaterial,
//   TextureLoader,
//   BoxBufferGeometry,
//   Scene,
//   Vector3,
//   WebGLRenderer,
// } from "https://unpkg.com/three@0.127.0/build/three.module.js";

//Number
// const canvas = document.getElementById("number");
// const ctx = canvas.getContext("2d");
// const x = 32;
// const y = 32;
// const radius = 30;
// const startAngle = 0;
// const endAngle = Math.PI * 2;

// ctx.fillStyle = "rgb(0, 0, 0)";
// ctx.beginPath();
// ctx.arc(x, y, radius, startAngle, endAngle);
// ctx.fill();

// ctx.strokeStyle = "rgb(255, 255, 255)";
// ctx.lineWidth = 3;
// ctx.beginPath();
// ctx.arc(x, y, radius, startAngle, endAngle);
// ctx.stroke();

// ctx.fillStyle = "rgb(255, 255, 255)";
// ctx.font = "32px sans-serif";
// ctx.textAlign = "center";
// ctx.textBaseline = "middle";
// ctx.fillText("1", x, y);

// Three.js variables
let scene, camera, renderer;
let controls;
let loader;
// let objLoader;
let keyLight, fillLight, backLight;
let cameraLight, ambientLight;
//let Vector3;
// let mtLoader, material;
// let sprite, spriteBehindObject;
// const annotation = document.querySelector(".annotation");

function init() {
  // settup scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);
  // setting up the camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // setting up the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  // orbit controls for a smoother rotation
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.campingFactor = 0.25;
  controls.enableZoom = true;

  // remember lighting
  cameraLight = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.5);
  camera.add(cameraLight);
  camera.position.set(200, 200, 1000);
  // camera.rotation.y = 45/180*Math.PI;
  // camera.position.x = 800;
  // camera.position.y = 100;
  // camera.position.z = 1000;
  controls.update();

  // make sure to add the camera to the scene
  scene.add(camera);
  // some more lights
  ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);
  scene.add(ambientLight);

  const light = new THREE.HemisphereLight(0xffffee, 0x444444);
  scene.add(light);
  // directionalLight = new THREE.DirectionalLight(0xffffff,50);
  // directionalLight.position.set(0,1,0);
  // directionalLight.castShadow = true;
  // scene.add(directionalLight);

  // keyLight = new THREE.DirectionalLight(new THREE.Color("hsl(50, 100%, 75%)"), 1.0);
  // keyLight.position.set(0, 0, 100);

  loader = new THREE.GLTFLoader();
  loader.load("./models/lungs/scene.gltf", function(gltf) {
    model = gltf.scene.children[0];
    model.scale.multiplyScalar(0.5);
    model.position.y = -1.5;
    //model.position.z = 200;
    //model.position.x = -100;
    //scene.add(gltf.scene);
    //renderer.render(scene, camera);
    //animate();
    scene.add(model);

    createMarker(model, new THREE.Vector3(10, 17, 8));
    createMarker(model, new THREE.Vector3(4, 15, 1.7));
    createMarker(model, new THREE.Vector3(-6, 0, 4));
  });

  // Sprite

  // const numberTexture = new THREE.CanvasTexture(
  //     document.querySelector("#number"));

  // const spriteMaterial = new THREE.SpriteMaterial({
  //     map: numberTexture,
  //     alphaTest: 0.5,
  //     transparent: true,
  //     depthTest: false,
  //     depthWrite: false });

  //     sprite = new THREE.Sprite(spriteMaterial);
  //     sprite.position.set(250, 250, 250);
  //     sprite.scale.set(60, 60, 1);

  //     scene.add(sprite);
}

// functions
function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function createMarker(model, position) {
  const loader = new THREE.TextureLoader();
  loader.crossOrigin = "";
  const map = loader.load("./img/1.png");
  // map.encoding = sRGBEncoding;

  const spriteMaterialFront = new THREE.SpriteMaterial({ map });

  const spriteFront = new THREE.Sprite(spriteMaterialFront);
  spriteFront.position.copy(position);

  const spriteMaterialRear = new THREE.SpriteMaterial({
    map,
    opacity: 0.3,
    transparent: true,
    depthTest: false,
  });

  const spriteRear = new THREE.Sprite(spriteMaterialRear);
  spriteRear.position.copy(position);

  model.add(spriteFront, spriteRear);
}

init();
animate();

function onWindowResize() {
  camera.aspect = container.client / container.clientHeight;
  camera.updateProjectMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
