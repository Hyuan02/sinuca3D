import { Vector3 } from "babylonjs";

export default class CuePool{
    constructor(cueMesh){
        this.mesh = cueMesh;
    }

    set position(vec3){
        this.mesh.position = new Vector3(vec3.x, vec3.y, vec3.z);
    }

    set rotation(vec3){
        this.mesh.rotation = new Vector3(vec3.x, vec3.y, vec3.z);
    }
}