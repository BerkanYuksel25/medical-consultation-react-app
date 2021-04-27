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
    scene.background = new THREE.Color(0xdddddd); 
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

    // directionalLight = new THREE.DirectionalLight(0xffffff,50);
    // directionalLight.position.set(0,1,0);
    // directionalLight.castShadow = true;
    // scene.add(directionalLight);

    // keyLight = new THREE.DirectionalLight(new THREE.Color("hsl(50, 100%, 75%)"), 1.0);
    // keyLight.position.set(0, 0, 100);

    loader = new THREE.GLTFLoader(); 
    loader.load("./models/lungs/scene.gltf", function(gltf){
      lungs = gltf.scene.children[0]; 
      lungs.scale.set(0.5, 0.5, 0.5);
      lungs.position.set(0.,0,0);
      scene.add(gltf.scene); 
      renderer.render(scene,camera); 
      //animate();   
    });
}


function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();