import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import '@babylonjs/loaders';

const mainCanvas = document.querySelector("#mainRender");
// console.log(mainCanvas);

const engine = new BABYLON.Engine(mainCanvas, true, {preserveDrawingBuffer: true, stencil: true});


const createScene = ()=>{

    const scene = new BABYLON.Scene(engine);

    var model = new BABYLON.SceneLoader.AppendAsync('assets/models/Pool_table/','pool_table.obj', scene, (err, scene)=>{ 
    });

    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.attachControl(mainCanvas, true);

    camera.setPosition(new BABYLON.Vector3(0, 80, 20));


    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    // Return the created scene
    return scene;
}


// call the createScene function
var scene = createScene();
// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});