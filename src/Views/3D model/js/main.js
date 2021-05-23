// // Three.js variables
// let scene, camera, renderer;
// let controls;
// let loader;
// let container;
// // let objLoader;
// let keyLight, fillLight, backLight;
// let cameraLight, ambientLight;

// function init() {
//   // settup scene

//   scene = new THREE.Scene();

//   scene.background = new THREE.Color(0xdddddd);
//   // setting up the camera
//   camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
//   );
//   // setting up the renderer
//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);

//   document.body.appendChild(renderer.domElement);
//   // orbit controls for a smoother rotation
//   controls = new THREE.OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = true;
//   controls.campingFactor = 0.25;
//   controls.enableZoom = true;

//   // remember lighting
//   cameraLight = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.5);
//   camera.add(cameraLight);
//   camera.position.set(200, 200, 1000);
//   controls.update();

//   // make sure to add the camera to the scene
//   scene.add(camera);
//   // some more lights
//   ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);
//   scene.add(ambientLight);

//   const light = new THREE.HemisphereLight(0xffffee, 0x444444);
//   scene.add(light);

//   loader = new THREE.GLTFLoader();
//   loader.load("./models/lungs/scene.gltf", function(gltf) {
//     model = gltf.scene.children[0];
//     model.scale.multiplyScalar(0.5);
//     model.position.set(0, 0, 0);

//     scene.add(model);

//     createMarker(model, new THREE.Vector3(10, 17, 8));
//     // createMarker(model, new THREE.Vector3(4, 15, 1.7));
//     // createMarker(model, new THREE.Vector3(-6, 0, 4));
//   });
// }

// // functions
// function animate() {
//   //controls.update();
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

// function createMarker(model, position) {
//   const loader = new THREE.TextureLoader();
//   loader.crossOrigin = "";
//   const map = loader.load("./img/1.png");
//   // map.encoding = sRGBEncoding;

//   const spriteMaterialFront = new THREE.SpriteMaterial({ map });

//   const spriteFront = new THREE.Sprite(spriteMaterialFront);
//   spriteFront.position.copy(position);

//   const spriteMaterialRear = new THREE.SpriteMaterial({
//     map,
//     opacity: 0.3,
//     transparent: true,
//     depthTest: false,
//   });

//   const spriteRear = new THREE.Sprite(spriteMaterialRear);
//   spriteRear.position.copy(position);

//   model.add(spriteFront, spriteRear);
// }

// init();
// animate();
