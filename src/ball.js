import * as BABYLON from 'babylonjs';

const SIZE_BALL = 3;
var balls = [];



/**
 * Represents the instance of a ball.
 *
 * @export
 * @class Ball
 */
export default class Ball{
    constructor(){
        balls = [];
        this.balls = balls;
    }


    /**
     * Used to instantiate a ball and store on the vector of balls.
     *
     * @param {*} x number
     * @param {*} z number
     * @param {*} scene BABYLON.scene
     * @returns Ball
     * @memberof Ball
     */
    createBall(x,z, scene){
        let ball = new BABYLON.MeshBuilder.CreateSphere('ball' + balls.length, {diameter:SIZE_BALL}, scene);
        ball.position.x = x;
        ball.position.y = 20;
        ball.position.z = z;
        this.balls.push(ball);
        // console.log(ball);
        return ball;
    }
}