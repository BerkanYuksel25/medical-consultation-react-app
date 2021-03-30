let scene, camera, renderer;            //all stuff needed to generate models needed
let controls;                           
let objLoader;
let keyLight, fillLight, backLight;
let cameraLight, ambientLight;

function init() {
  scene = new THREE.Scene();                        //created a new scene

  camera = new THREE.PerspectiveCamera(             //created a new camera with certain dimensions
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });      //renders the graphic image. makes it more smooth
  renderer.setSize(window.innerWidth, window.innerHeight);      

  document.body.appendChild(renderer.domElement);                     //appends to the document? what document?
  controls = new THREE.OrbitControls(camera, renderer.domElement);    //controls used for the cameras
  controls.enableDamping = true;
  controls.campingFactor = 0.25;
  controls.enableZoom = true;                                         //zoom in to the model

  // remember lighting later
  cameraLight = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.5);  //this is just lighting
  camera.add(cameraLight);
  
  
  scene.add(camera);
  ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);
  scene.add(ambientLight);

  //   keyLight = new THREE.DirectionalLight(new THREE.Color("hsl(30, 100%, 75%)"), 1.0);
  //   keyLight.position.set(-100,0,100);

  //   fillLight = new THREE.DirectionalLight(new THREE.)

  //loading the 3D model object will need node command here on in.
  objLoader = new THREE.OBJLoader();
  objLoader.setPath("/models/");
  objLoader.load("skeleton.obj", function (object) {            //attempting to load the skeleton model in the models folder
    // Setting object back 60 from camera
    object.position.y -= 10;                                    //not sure whats going on here. setting the model down?
    scene.add(object);                                          //adding object to the scene
  });
}

function animate() {                                            //animate object
  controls.update();                                              
  requestAnimationFrame(animate); 
  renderer.render(scene, camera);                                //renders animation on the scene
}

init();
animate();
