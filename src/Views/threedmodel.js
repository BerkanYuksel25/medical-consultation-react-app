import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

class ThreedModelPage extends Component {
  componentDidMount() {
    //set up the scene
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);
    //declare camera and renderer
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild( renderer.domElement );
    
    
    //set up controls
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.campingFactor = 0.25;
    controls.enableZoom = true;
    
    //set up lighting
    var cameraLight = new THREE.PointLight(new THREE.Color(1, 1, 1), 0.5);
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
    var ambientLight = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 0.2);
    scene.add(ambientLight);

    //loading model DUN DUN DUN
    const gltfLoader = new GLTFLoader();
    
    let lungs;
    //local model not loading
    gltfLoader.load('scene.gltf', function(gltf){
      lungs = gltf.scene.children[0]; 
      lungs.scale.set(0.5, 0.5, 0.5);
      lungs.position.set(0.,0,0);
      scene.add(gltf.scene); 
      renderer.render(scene,camera); 
      //animate();   
    });
    //for text
    // var sprite = makeTextSprite("lung", {fontsize: 24,});
    // scene.add(sprite);
    //cube
    
    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // var cube = new THREE.Mesh( geometry, material ); // insert material/model here
    // scene.add( cube );
    // camera.position.z = 5;
    // //animate model
    var animate = function () {
      controls.update();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    
    animate();
    
  }
  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ThreedModelPage />, rootElement);

export default (ThreedModelPage);