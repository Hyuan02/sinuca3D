import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import './assetsImport';
import './assetsImport';
import AssetsImport from './assetsImport';
import Ball from './ball';
import Vec3 from './vector3D';
import CuePool from './cue';
import PhysicsLoop  from './physicsLoop';


const mainCanvas = document.querySelector("#mainRender");
// console.log(mainCanvas);

const engine = new BABYLON.Engine(mainCanvas, true, {preserveDrawingBuffer: true, stencil: true});


const physicsLoop = new PhysicsLoop();
let controlsMap = {};

const createScene = ()=>{
    const scene = new BABYLON.Scene(engine);
    AssetsImport.importPool(scene);
    let cue;
    AssetsImport.importCue(scene).then((value)=>{
        cue = new CuePool(value, scene);
    }).then(()=>{
        initializeActionHandler(scene, cue, camera);
    });

    
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    Ball.createBall(0,0, scene);
    camera.attachControl(mainCanvas, true);
    camera.inputs.attached.keyboard.detachControl();
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


function initializeActionHandler(scene, cue,camera){
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt)=> {								
        controlsMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt)=>{								
        controlsMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));

    scene.onBeforeRenderObservable.add(()=>{
        cue.checkControl(controlsMap);
        physicsLoop.checkCollisions();
    });
}


// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});