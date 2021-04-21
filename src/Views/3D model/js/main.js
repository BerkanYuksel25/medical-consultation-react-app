// settup all the variables 
let scene, camera, renderer;
let controls;
let loader; 
// let objLoader;
let keyLight, fillLight, backLight;
let cameraLight, ambientLight;
// let mtLoader, material; 

function init() {
    // settup scene 
    scene = new THREE.Scene();
    // setting up the camera 
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    // setting up the renderer 
    renderer = new THREE.WebGLRenderer({antialias: true});
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
    camera.position.set(0, 0, 100);
    controls.update();

    // make sure to add the camera to the scene 
    scene.add(camera);
    // some more lights
    ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);
    scene.add(ambientLight);

    keyLight = new THREE.DirectionalLight(new THREE.Color("hsl(30, 100%, 75%)"), 1.0);
    keyLight.position.set(0, 0, 100);

    loader = new THREE.GLTFLoader(); 
    loader.load("./models/lungs/scene.gltf", function(gltf){
      lungs = gltf.scene.children[0]; 
      lungs.scale.set(0.5, 0.5, 0.5);
      scene.add(gltf.scene); 
      renderer.render(scene.camera);   
    })
    // // load the material 
    // material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    // mtlLoader = new THREE.MTLLoader();
    // //mtlLoader.setTexturePath("./models/"); 
    // mtlLoader.setPath("./models/");
    // mtlLoader.load("/skeleton.mtl", function(materials){
    // materials.preload(); 

    // //loading the 3D model object will need node command here on in.
    // objLoader = new THREE.OBJLoader();
    // objLoader.setMaterials(materials); 
    // objLoader.load("./models/skeleton.obj", function (object) {
    //     scene.add(object);
    //     });
    // });     
}

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();
