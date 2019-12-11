import Ball from "./ball";
import * as BABYLON from 'babylonjs';
var balls = [];
var whiteBall;

const colors = [
    new BABYLON.Color3.FromHexString("#f2f542"),
    new BABYLON.Color3.FromHexString("#4454A8"),
    new BABYLON.Color3.FromHexString("#F94E37"),
    new BABYLON.Color3.FromHexString("#171715"),
    new BABYLON.Color3.FromHexString("#FF9746"),
    new BABYLON.Color3.FromHexString("#346260"),
    new BABYLON.Color3.FromHexString("#94867A"),
    new BABYLON.Color3.FromHexString("#3C3A35"),
    new BABYLON.Color3.FromHexString("#CF8F92"),
]


export default class BallsController{
    constructor(){
        this.balls = balls;
        this.whiteBall = whiteBall; 
    }

    updateBalls(ball){
        balls.push(ball);
        this.balls = balls;
        if(ball.whiteBall){
            whiteBall = ball;
            this.whiteBall = ball;
        }
    }


    checkBallsAction(){
        for (let index = 0; index < balls.length; index++) {
            if(balls[index].movement.x > 0 || balls[index].movement.x < 0 || balls[index].movement.z > 0 || balls[index].movement.z < 0 ){
                return true;
            }
        }
        return false;
    }

    instantiate8Balls(scene){
        let colorIndex = 0;
        for(let i=0; i<3; i++){
            for(let j = i; j<4; j++){
                let e = Ball.createBall(j*3.2, i*3.2, scene, false);
                let material =  new BABYLON.StandardMaterial('color', scene);
                material.diffuseColor = colors[colorIndex];
                e.mesh.material = material;
                colorIndex++;
            }
        }
    }
    
}