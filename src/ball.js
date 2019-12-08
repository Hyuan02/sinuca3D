import * as BABYLON from 'babylonjs';
import { AABBCollider, UtilFunctions, SphereCollider } from './collider';
import PhysicsLoop from './physicsLoop';
import Vec3 from './vector3D';
import BallsController from './ballsController';
import Vec2 from './vector2D';
import { Vector3 } from 'babylonjs';

const SIZE_BALL = 3;



/**
 * Represents the instance of a ball.
 *
 * @export
 * @class Ball
 */
export default class Ball{
    constructor(mesh, position, collider){
        this.mesh = mesh;
        this.collider = collider;
        this.position = position;
        this.movement = new Vec2(0,0);
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
        collider.parent = ball;
        ballsController.balls.push(ball);
        let pLoop = new PhysicsLoop();
        pLoop.updateColliders(collider);
    }


    get position(){
        return new Vec2(this.mesh.position.x, this.mesh.position.z);
    }

    set position(vec2){
        // console.log("setting pos");
        // console.log(this.mesh);
        this.mesh.position = new Vector3(vec2.x, this.mesh.position.y, vec2.z);
        this.collider.position = vec2;
    }
    
    applyMovement(){
        this.position = this.position.sum(this.movement);
        this.applyFriction();
        this.applyRotation();
    }

    applyFriction(){
        // console.log(this.movement);
        if(this.movement.x > 0 || this.movement.z > 0){
            this.movement = this.movement.sub(new Vec2(0,0.03));
        }
        else{
           this.movement = new Vec2(0,0); 
        }
    }

    applyRotation(){
        if(this.movement.x > 0 || this.movement.z > 0){
            let rot =  this.movement.div(SIZE_BALL);
            this.mesh.rotation = new Vector3(this.mesh.rotation.x + rot.x, this.mesh.rotation.y + rot.z, this.mesh.rotation.z + 0.08);
            console.log(this.mesh.rotation);
        }
    }



    
}