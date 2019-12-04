import { Vector3, Matrix, VertexBuffer } from "babylonjs";
import Vec3 from "./vector3D";
const SPEED = 5;
export default class CuePool{
    constructor(cueMesh){
        this.mesh = cueMesh;
        ([this.maxPointX, this.maxPointY, this.maxPointZ, 
        this.minPointX, this.minPointY, this.minPointZ] = this.forceBrutePoints(this.mesh.getVerticesData(VertexBuffer.PositionKind)));
        this.mesh.setPivotPoint(new Vector3(this.maxPointX, this.maxPointY, this.maxPointZ));
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


    checkCameraPosition(camera){
        this.position = new Vec3(camera.position.x, this.position.y, camera.position.z);
    }

    forceBrutePoints(data){
        let maxPointX=data[0], maxPointY=data[1], maxPointZ=data[2];
        let minPointX=data[0], minPointY=data[1], minPointZ=data[2];
        for(let i=0; i<data.length; i++){
            let quote = i%3;
            if(quote == 0){
                minPointX = Math.min(minPointX, data[i]);
                maxPointX = Math.max(maxPointX, data[i]);
            }
            else if (quote == 1){
                minPointY = Math.min(minPointY, data[i]);
                maxPointY = Math.max(maxPointY, data[i]);
            }
            else{
                minPointZ = Math.min(minPointZ, data[i]);
                maxPointZ = Math.max(maxPointZ, data[i]);
            }
        }
        return [maxPointX, maxPointY, maxPointZ, minPointX, minPointY, minPointZ];
    }

    
}