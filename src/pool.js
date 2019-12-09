import PhysicsLoop from "./physicsLoop";
import {UtilFunctions, AABBCollider} from "./collider";
import { Vector3, Matrix, VertexBuffer, MeshBuilder } from "babylonjs";
import Vec3 from "./vector3D";
import Vec2 from "./vector2D";

export default class Pool{
    constructor(mesh){
        this.mesh = mesh;
        this.colliders = [];
        this.pLoop = new PhysicsLoop();
    }
    
    generateWallColliders(scene){
        console.log(UtilFunctions.forceBrutePoints(this.mesh.getVerticesData(VertexBuffer.PositionKind)));  
        
        let points = [
            new Vector3(17, 20, 37.8304),
            new Vector3(-17, 20, 37.8304),
            new Vector3(-17, 20, 32.5),
            new Vector3(17, 20, 32.5),
        
        ];
        console.log(BABYLON.MeshBuilder.CreateLines("lines", {points, updatable: true}, scene));

        let aabb1 = new AABBCollider(new Vec2(points[2].x, points[2].z), new Vec2(points[0].x, points[0].z), new Vec2(0,0));

        this.pLoop.updateColliders(aabb1);
    }

}