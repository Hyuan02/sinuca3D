import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import './pool';
import './pool';
import AssetsImport from './pool';
import Ball from './ball';
import Vec3 from './vector3D';
const mainCanvas = document.querySelector("#mainRender");
// console.log(mainCanvas);

const engine = new BABYLON.Engine(mainCanvas, true, {preserveDrawingBuffer: true, stencil: true});


const createScene = ()=>{
    const scene = new BABYLON.Scene(engine);

    const BALL_SYSTEM = new Ball();
    console.log(BALL_SYSTEM.balls);
    AssetsImport.importPool(scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    BALL_SYSTEM.createBall(0,0, scene);
    camera.attachControl(mainCanvas, true);
    camera.setPosition(new BABYLON.Vector3(0, 80, 20));
    new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    return scene;
}


// call the createScene function
var scene = createScene();
// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});

let v1 = new Vec3(20, 10 ,15);
console.log(v1.mul(new Vec3(10,11,12)));

console.log(v1);


// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});