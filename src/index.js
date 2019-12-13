import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import './assetsImport';
import './assetsImport';
import AssetsImport from './assetsImport';
import Ball from './ball';
import CuePool from './cue';
import PhysicsLoop from './physicsLoop';
import Pool from './pool';
import BallsController from './ballsController';
import GameInterface from './interface';

// Pega o canvas correspondente a renderização
const mainCanvas = document.querySelector("#mainRender");


//Inicia a engine para renderização
const engine = new BABYLON.Engine(mainCanvas, true, { preserveDrawingBuffer: true, stencil: true });

//Inicia a classe responsaável por controlar toda a fisica
const physicsLoop = new PhysicsLoop();

// Inicia o mapa de controles do jogo
let controlsMap = {};

//variaveis que controlam objetos do jogo
let cue, camera, pool, scene, gInterface;

// cena do jogo
let SCENE;

// Funcao para carregar os assets e criar a cena do jogo, carregando a mesa, a bola inicial branca, o taco e a camera
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


// apos chamar a funcao e ela ser resolvida, e instanciado as 9 bolas que existem no jogo
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
    // roda o laço de renderização
    engine.runRenderLoop(function () {
        SCENE.render();
    });

    
});




//função para a inicialização de controles do jogo 
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

//funcao para adicionar observadores: Metodos que checam uma condição
function addObservable(method) {
    SCENE.onBeforeRenderObservable.add(method);
}

// função para responsividade simples
window.addEventListener('resize', function () {
    engine.resize();
});