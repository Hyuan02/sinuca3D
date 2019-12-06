import { Vector3, Matrix, VertexBuffer, MeshBuilder } from "babylonjs";
import PhysicsLoop from './physicsLoop';
import {AABBCollider} from './collider';
import Vec3 from "./vector3D";
const SPEED = 5;
export default class CuePool{
    constructor(cueMesh, scene){
        this.mesh = cueMesh;
        ([this.maxPointX, this.maxPointY, this.maxPointZ, 
        this.minPointX, this.minPointY, this.minPointZ] = AABBCollider.forceBrutePoints(this.mesh.getVerticesData(VertexBuffer.PositionKind)));
        this.mesh.setPivotPoint(new Vector3(this.maxPointX, this.maxPointY, this.maxPointZ));
        this.moveMode = false;
        this.pLoop = new PhysicsLoop();
        //debug purpose
        let pointsBox = [
            new Vector3(this.minPointX, 0, this.maxPointZ),
            new Vector3(this.maxPointX, 0, this.maxPointZ),
            new Vector3(this.maxPointX, 0, this.minPointZ),
            new Vector3(this.minPointX, 0, this.minPointZ),
        ]
        
        this.colliderID = this.pLoop.updateColliders(new AABBCollider(
            new Vec3(this.minPointX, this.minPointY, this.minPointZ),
            new Vec3(this.maxPointX, this.maxPointY, this.maxPointZ),
            this.position,
            MeshBuilder.CreateLines("lines", {points: pointsBox}, scene)    
        ));

        

        this.position = new Vec3(0,20,0);
        
    }

    set position(vec3){
        this.mesh.position = new Vector3(vec3.x, vec3.y, vec3.z);
        this.pLoop.updatePositionCollider(this.colliderID, vec3);
    }

    set rotation(vec3){
        this.mesh.rotation = new Vector3(vec3.x, vec3.y, vec3.z);
    }

    get position(){
        return new Vec3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z);
    }

    get rotation(){
        return new Vec3(this.mesh.rotation.x, this.mesh.rotation.y, this.mesh.rotation.z);
    }


    moveMode(){
        this.moveMode = true;
    }

    checkControl(inputMap){
        if(this.moveMode){
            if(inputMap["w"] || inputMap["ArrowUp"]){
                this.position = this.position.sum(new Vec3(0,0,1));

            } 
            if(inputMap["a"] || inputMap["ArrowLeft"]){
                this.position = this.position.sum(new Vec3(-1,0,0));
            } 
            if(inputMap["s"] || inputMap["ArrowDown"]){
                this.position = this.position.sum(new Vec3(0,0,-1));
            } 
            if(inputMap["d"] || inputMap["ArrowRight"]){
                this.position = this.position.sum(new Vec3(1,0,0));
            }
            
            if(inputMap["q"]){
                this.rotation = this.rotation.sum(new Vec3(0,1,0).mulEs(0.01));
            }
            if(inputMap["e"]){
                this.rotation = this.rotation.sum(new Vec3(0,-1,0).mulEs(0.01));
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