//Number 



// settup all the variables 
let scene, camera, renderer;
let controls;
let loader; 
// let objLoader;
let keyLight, fillLight, backLight;
let cameraLight, ambientLight;
// let mtLoader, material; 
let sprite 

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

//     sprite = makeTextSprite("lung", {fontsize: 24,});
//     scene.add(sprite);

//     function makeTextSprite( message, parameters )
// {
// 	if ( parameters === undefined ) parameters = {};
	
// 	var fontface = parameters.hasOwnProperty("fontface") ? 
// 		parameters["fontface"] : "Arial";
	
// 	var fontsize = parameters.hasOwnProperty("fontsize") ? 
// 		parameters["fontsize"] : 18;
	
// 	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
// 		parameters["borderThickness"] : 4;
	
// 	var borderColor = parameters.hasOwnProperty("borderColor") ?
// 		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
// 	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
// 		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

// 	var spriteAlignment = THREE.SpriteAlignment;
		
// 	var canvas = document.createElement('canvas');
// 	var context = canvas.getContext('2d');
// 	context.font = "Bold " + fontsize + "px " + fontface;
    
// 	// get size data (height depends only on font size)
// 	var metrics = context.measureText( message );
// 	var textWidth = metrics.width;
	
// 	// // background color
// 	// context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
// 	// 							  + backgroundColor.b + "," + backgroundColor.a + ")";
// 	// // border color
// 	// context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
// 	// 							  + borderColor.b + "," + borderColor.a + ")";

// 	// context.lineWidth = borderThickness;
// 	// //roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
// 	// // 1.4 is extra height factor for text below baseline: g,j,p,q.
	
// 	// text color
// 	context.fillStyle = "rgba(0, 0, 0, 1.0)";

// 	context.fillText( message, borderThickness, fontsize + borderThickness);
	
// 	// canvas contents will be used for a texture
// 	var texture = new THREE.Texture(canvas) 
// 	texture.needsUpdate = true;

// 	var spriteMaterial = new THREE.SpriteMaterial( 
// 		{ map: texture, useScreenCoordinates: false, alignment: spriteAlignment } );
// 	var sprite = new THREE.Sprite( spriteMaterial );
// 	sprite.scale.set(100,50,1.0);
// 	return sprite;	
// }

}


function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();