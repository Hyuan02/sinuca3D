import * as BABYLON from 'babylonjs';

const SIZE_BALL = 3;
var balls = [];


export default class Ball{
    constructor(){
        balls = [];
        this.balls = balls;
    }

    createBall(x,z, scene){
        let ball = new BABYLON.MeshBuilder.CreateSphere('ball' + balls.length, {diameter:SIZE_BALL}, scene);
        ball.position.x = x;
        ball.position.y = 20;
        ball.position.z = z;
        this.balls.push(ball);
        return ball;
    }
}