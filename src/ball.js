import * as BABYLON from 'babylonjs';
import { AABBCollider } from './collider';
import PhysicsLoop from './physicsLoop';
import Vec3 from './vector3D';

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
        let p1 = new PhysicsLoop();
        console.log(ball);
        let vector = AABBCollider.forceBrutePoints(ball.getVerticesData(BABYLON.VertexBuffer.PositionKind));
        p1.updateColliders(new AABBCollider(new Vec3(vector[3],vector[4], vector[5]),
        new Vec3(vector[0], vector[1], vector[2]), 
        new Vec3(ball.position.x, ball.position.y, ball.position.z)));
        
        this.balls.push(ball);
        // console.log(ball);
        return ball;
    }
}