import { Vector3, Matrix } from "babylonjs";
import Vec3 from "./vector3D";
const SPEED = 5;
export default class CuePool{
    constructor(cueMesh){
        this.mesh = cueMesh;
        this.mesh.setPivotPoint(new Vector3(0,50,50));
        console.log(this.mesh.getPivotPoint());
        this.moveMode = false;
    }

    set position(vec3){
        this.mesh.position = new Vector3(vec3.x, vec3.y, vec3.z);
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



    
}