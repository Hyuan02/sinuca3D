import PhysicsLoop from "./physicsLoop";
import {UtilFunctions, AABBCollider, SphereCollider} from "./collider";
import { Vector3, Matrix, VertexBuffer, MeshBuilder } from "babylonjs";
import Vec2 from "./vector2D";

const RADIUS = 2.5;

// Colisores AABB fixos que representam as paredes da mesa.
const AABBPoints = [
    [
        new Vector3(17, 20, 37.8304),
        new Vector3(-17, 20, 37.8304),
        new Vector3(-17, 20, 32.5),
        new Vector3(17, 20, 32.5),
        new Vector3(17, 20, 37.8304)
    ],
    [
        new Vector3(25.2127, 20, -28),
        new Vector3(25.2127, 20, -2),
        new Vector3(20, 20, -2),
        new Vector3(20, 20, -28),
        new Vector3(25.2127, 20, -28),
    ],
    [
        new Vector3(25.2127, 20, 30),
        new Vector3(25.2127, 20, 2.5),
        new Vector3(20.100, 20, 2.5),
        new Vector3(20.100, 20, 30),
        new Vector3(25.2127, 20, 30),
    ],
    [
        new Vector3(-25, 20, 30),
        new Vector3(-25, 20, 2.5),
        new Vector3(-20.5, 20, 2.5),
        new Vector3(-20.5, 20, 30),
        new Vector3(-25, 20, 30),
    ],
    [
        new Vector3(-25, 20, -28),
        new Vector3(-25, 20, -2),
        new Vector3(-20.5, 20, -2),
        new Vector3(-20.5, 20, -28),
        new Vector3(-25, 20, -28),
    ],
    [
        new Vector3(17, 20, -35),
        new Vector3(-17, 20, -35),
        new Vector3(-17, 20, -30),
        new Vector3(17, 20, -30),
        new Vector3(17, 20, -35),
    ]
]


// COlisores esfericos fixos que representam as caçapas da mesa.
const SpherePoints = [
    new Vector3(-19.8,20,-29.5),
    new Vector3(-19.8,20,32),
    new Vector3(19.8,20,32),
    new Vector3(19.8,20,-29.5),
    new Vector3(20.8,20,0.2),
    new Vector3(-20.8,20,0.2)
]



export default class Pool{
    constructor(mesh){
        this.mesh = mesh;
        this.colliders = [];
        this.pLoop = new PhysicsLoop();
        this.colliderShapes = [];
        this.static = true;
        this.active = true;
    }
    

    /**
     *
     * Gera os colisores da mesa.
     * @param {*} scene - cena.
     * @memberof Pool
     */
    generateWallColliders(scene){
        const myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
        myMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);
        myMaterial.wireframe = true;

        let aabb1 = new AABBCollider(new Vec2(AABBPoints[0][2].x, AABBPoints[0][2].z), new Vec2(AABBPoints[0][0].x, AABBPoints[0][0].z), new Vec2(0,0));
        let aabb2 = new AABBCollider(new Vec2(AABBPoints[1][3].x, AABBPoints[1][3].z), new Vec2(AABBPoints[1][1].x, AABBPoints[1][1].z), new Vec2(0,0));
        let aabb3 = new AABBCollider(new Vec2(AABBPoints[2][2].x, AABBPoints[2][2].z), new Vec2(AABBPoints[2][0].x, AABBPoints[2][0].z), new Vec2(0,0));
        let aabb4 = new AABBCollider(new Vec2(AABBPoints[3][1].x, AABBPoints[3][1].z), new Vec2(AABBPoints[3][3].x, AABBPoints[3][3].z), new Vec2(0,0));
        let aabb5 = new AABBCollider(new Vec2(AABBPoints[4][0].x, AABBPoints[4][0].z), new Vec2(AABBPoints[4][2].x, AABBPoints[4][2].z), new Vec2(0,0));
        let aabb6 = new AABBCollider(new Vec2(AABBPoints[5][1].x, AABBPoints[5][1].z), new Vec2(AABBPoints[5][3].x, AABBPoints[5][3].z), new Vec2(0,0));

        AABBPoints.forEach((e)=>{
            this.colliderShapes.push(new BABYLON.MeshBuilder.CreateLines("lines", {points: e, updatable: true}, scene));
        });

        this.pLoop.updateColliders(aabb1);
        this.pLoop.updateColliders(aabb2);
        this.pLoop.updateColliders(aabb3);
        this.pLoop.updateColliders(aabb4);
        this.pLoop.updateColliders(aabb5);
        this.pLoop.updateColliders(aabb6);

        SpherePoints.forEach((e)=>{
            let mesh = new BABYLON.MeshBuilder.CreateSphere("meshSphere", {diameter: RADIUS}, scene, BABYLON.Mesh.BACKSIDE);
            this.pLoop.updateColliders(new SphereCollider(new Vec2(e.x, e.z), RADIUS/2, this, new Vec2(e.x, e.z)));
            mesh.position = e;
            mesh.material = myMaterial;
            this.colliderShapes.push(mesh);
        });

        this.disableColliders();
        // this.enableColliders();
    }



    
    /**
     * Desabilita as caixas de debug
     *
     * @memberof Pool
     */
    disableColliders(){
        this.colliderShapes.forEach((e)=>{
            e.setEnabled(false);
        });
    }
    


    /**
     *
     * HAbilita as caixas de debug.
     * @memberof Pool
     */
    enableColliders(){
        this.colliderShapes.forEach((e)=>{
            e.setEnabled(true);
        });
    }

}