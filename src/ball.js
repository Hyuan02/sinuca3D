import * as BABYLON from 'babylonjs';
import { AABBCollider, UtilFunctions, SphereCollider } from './collider';
import PhysicsLoop from './physicsLoop';
import Vec3 from './vector3D';
import BallsController from './ballsController';
import Vec2 from './vector2D';

const SIZE_BALL = 3;



/**
 * Represents the instance of a ball.
 *
 * @export
 * @class Ball
 */
export default class Ball{
    constructor(mesh, position, collider){
        this.position = position;
        this.collider = collider;
        this.mesh = mesh;
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
    static createBall(x,z, scene){
        let ballsController = new BallsController();
        let mesh = new BABYLON.MeshBuilder.CreateSphere('ball' + ballsController.balls.length, {diameter:SIZE_BALL}, scene);
        mesh.position.x = x;
        mesh.position.y = 20;
        mesh.position.z = z;
        let points = UtilFunctions.valuesToVectors(mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind));
        let collider = SphereCollider.containingCircle(points);
        let ball = new Ball(mesh, new Vec2(mesh.position.x, mesh.position.z), collider);
        ballsController.balls.push(ball);
        let pLoop = new PhysicsLoop();
        pLoop.updateColliders(collider);
    }
}