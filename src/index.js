import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import './assetsImport';
import './assetsImport';
import AssetsImport from './assetsImport';
import Ball from './ball';
import Vec3 from './vector3D';
import CuePool from './cue';
import PhysicsLoop from './physicsLoop';
import Pool from './pool';
import BallsController from './ballsController';
import GameInterface from './interface';


const mainCanvas = document.querySelector("#mainRender");
// console.log(mainCanvas);

const engine = new BABYLON.Engine(mainCanvas, true, { preserveDrawingBuffer: true, stencil: true });


const physicsLoop = new PhysicsLoop();
let controlsMap = {};
let cue, camera, pool, scene, gInterface;
let SCENE;
const createScene = () => {
    return new Promise((resolve, reject) => {
        const scene = new BABYLON.Scene(engine);
        AssetsImport.importPool(scene).then((value) => {
            pool = new Pool(value);
            pool.generateWallColliders(scene);
        });
        AssetsImport.importCue(scene).then((value) => {
            cue = new CuePool(value, scene);
        }).then(() => {
            let whiteBall = Ball.createBall(0, 0, scene, true);
            let material = new BABYLON.StandardMaterial("whiteBall", scene);
            material.diffuseColor = BABYLON.Color3.White();
            whiteBall.mesh.material = material;
            initializeActionHandler(scene, cue, camera, whiteBall);
            camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
            camera.attachControl(mainCanvas, true);
            camera.inputs.attached.keyboard.detachControl();
            camera.setPosition(new BABYLON.Vector3(20, 100, 0));
            new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
            gInterface = new GameInterface();
            resolve(scene);
        });
    });
}


// call the createScene function
createScene().then((scene) => {
    SCENE = scene;
    let ballsController = new BallsController();
    ballsController.instantiate8Balls(scene);
    addObservable(() => {
        if (ballsController.checkBallsAction()) {
            cue.disableCue(SCENE);
        }
        else {
            cue.enableCue(SCENE);
        }
    });
    // run the render loop
    engine.runRenderLoop(function () {
        SCENE.render();
    });

    
});





function initializeActionHandler(scene, cue, camera, ball) {
    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, (evt) => {
        controlsMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, (evt) => {
        controlsMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));

    scene.onBeforeRenderObservable.add(() => {
        cue.checkControl(controlsMap);
        cue.updatePosition(ball);
        physicsLoop.checkCollisions();
        physicsLoop.checkMovements();
    });
}


function addObservable(method) {
    SCENE.onBeforeRenderObservable.add(method);
}

// the canvas/window resize event handler
window.addEventListener('resize', function () {
    engine.resize();
});