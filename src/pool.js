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
            new Vector3(17, 20, 37.8304)
        ];
        BABYLON.MeshBuilder.CreateLines("lines", {points, updatable: true}, scene);

        let points2 = [
            new Vector3(25.2127, 20, -28),
            new Vector3(25.2127, 20, -2),
            new Vector3(20, 20, -2),
            new Vector3(20, 20, -28),
            new Vector3(25.2127, 20, -28),
        ];

        BABYLON.MeshBuilder.CreateLines("lines2", {points: points2, updatable: true}, scene);

        let points3 = [
            new Vector3(25.2127, 20, 30),
            new Vector3(25.2127, 20, 2.5),
            new Vector3(20.100, 20, 2.5),
            new Vector3(20.100, 20, 30),
            new Vector3(25.2127, 20, 30),
        ];

        BABYLON.MeshBuilder.CreateLines("lines3", {points: points3, updatable: true}, scene);

        let points4 = [
            new Vector3(-25, 20, 30),
            new Vector3(-25, 20, 2.5),
            new Vector3(-20.5, 20, 2.5),
            new Vector3(-20.5, 20, 30),
            new Vector3(-25, 20, 30),
        ];

        BABYLON.MeshBuilder.CreateLines("lines4", {points: points4, updatable: true}, scene);


        let points5 = [
            new Vector3(-25, 20, -28),
            new Vector3(-25, 20, -2),
            new Vector3(-20.5, 20, -2),
            new Vector3(-20.5, 20, -28),
            new Vector3(-25, 20, -28),
        ];

        BABYLON.MeshBuilder.CreateLines("lines5", {points: points5, updatable: true}, scene);

        let points6 = [
            new Vector3(17, 20, -35),
            new Vector3(-17, 20, -35),
            new Vector3(-17, 20, -30),
            new Vector3(17, 20, -30),
            new Vector3(17, 20, -35),
        ];

        BABYLON.MeshBuilder.CreateLines("lines6", {points: points6, updatable: true}, scene);


        let aabb1 = new AABBCollider(new Vec2(points[2].x, points[2].z), new Vec2(points[0].x, points[0].z), new Vec2(0,0));
        let aabb2 = new AABBCollider(new Vec2(points2[3].x, points2[3].z), new Vec2(points2[1].x, points[1].z), new Vec2(0,0));
        let aabb3 = new AABBCollider(new Vec2(points3[2].x, points3[2].z), new Vec2(points3[0].x, points3[0].z), new Vec2(0,0));
        let aabb4 = new AABBCollider(new Vec2(points4[1].x, points4[1].z), new Vec2(points4[3].x, points4[3].z), new Vec2(0,0));
        let aabb5 = new AABBCollider(new Vec2(points5[0].x, points5[0].z), new Vec2(points5[2].x, points5[2].z), new Vec2(0,0));
        let aabb6 = new AABBCollider(new Vec2(points6[1].x, points6[1].z), new Vec2(points6[3].x, points6[3].z), new Vec2(0,0));



        this.pLoop.updateColliders(aabb1);
        this.pLoop.updateColliders(aabb2);
        this.pLoop.updateColliders(aabb3);
        this.pLoop.updateColliders(aabb4);
        this.pLoop.updateColliders(aabb5);
        this.pLoop.updateColliders(aabb6);
    }

}