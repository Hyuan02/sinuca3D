import { Vector3, Matrix, VertexBuffer, MeshBuilder } from "babylonjs";
import PhysicsLoop from './physicsLoop';
import {AABBCollider, UtilFunctions, OBBCollider} from './collider';
import Vec3 from "./vector3D";
import Vec2 from "./vector2D";
const SPEED = 5;
export default class CuePool{
    constructor(cueMesh, scene){
        this.mesh = cueMesh;
        ([this.maxPointX, this.maxPointY, this.maxPointZ, 
        this.minPointX, this.minPointY, this.minPointZ] = AABBCollider.forceBrutePoints(this.mesh.getVerticesData(VertexBuffer.PositionKind)));
        this.mesh.setPivotPoint(new Vector3(this.maxPointX, this.maxPointY, this.maxPointZ));
        this.moveMode = false;
        this.pLoop = new PhysicsLoop();
        this.collider = OBBCollider.minContainingArea(UtilFunctions.valuesToVectors(this.mesh.getVerticesData(VertexBuffer.PositionKind)));
        this.mesh.position = new Vector3(0,20,0);
        // this.position = new Vec2(0, -155);
        // this.mesh.setPivotPoint(new Vector3(this.collider.center.x, 0.45, this.collider.center.z));
        this.pLoop.updateColliders(this.collider);
    }

    set position(vec2){
        this.mesh.position = new Vector3(vec2.x, this.mesh.position.y, vec2.z);
        this.collider.position = this.collider.center.sum(vec2);
    }

    set rotation(vec2){
        console.log("vec2: ", vec2);
        this.mesh.rotation = new Vector3(vec2.x, vec2.z, this.mesh.rotation.z);
        this.collider.axis[0] = this.collider.originalAxis[0].applyPositiveRotation(vec2.z);
        this.collider.axis[1] = this.collider.originalAxis[1].applyPositiveRotation(vec2.z);
        // this.collider.position = this.collider.center.sum(this.position).applyPositiveRotation(vec2.z);
    }

    get position(){
        return new Vec2(this.mesh.position.x, this.mesh.position.z);
    }

    get rotation(){

        //ROTACAO DADA EM RADIANOS
        return new Vec2(this.mesh.rotation.x, this.mesh.rotation.y);
    }


    moveMode(){
        this.moveMode = true;
    }

    checkControl(inputMap){
        if(this.moveMode){
            if(inputMap["w"] || inputMap["ArrowUp"]){
                this.position = this.position.sum(new Vec2(0,1));

            } 
            if(inputMap["a"] || inputMap["ArrowLeft"]){
                this.position = this.position.sum(new Vec2(-1,0));
            } 
            if(inputMap["s"] || inputMap["ArrowDown"]){
                this.position = this.position.sum(new Vec2(0,-1));
            } 
            if(inputMap["d"] || inputMap["ArrowRight"]){
                this.position = this.position.sum(new Vec2(1,0));
            }
            
            if(inputMap["q"]){
                this.rotation = this.rotation.sum(new Vec2(0,1).mulEs(0.01));
            }
            if(inputMap["e"]){
                this.rotation = this.rotation.sum(new Vec2(0,-1).mulEs(0.01));
            }
        }
        else{
            if(inputMap["r"]){
                this.moveMode = !this.moveMode;
            }
        }
    }


    checkCameraPosition(camera){
        this.position = new Vec3(camera.position.x, this.position.y, camera.position.z);
    }

    

    
}