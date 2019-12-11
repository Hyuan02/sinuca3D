import { Vector3, Matrix, VertexBuffer, MeshBuilder, StandardMaterial } from "babylonjs";
import PhysicsLoop from './physicsLoop';
import {AABBCollider, UtilFunctions, OBBCollider} from './collider';
import Vec3 from "./vector3D";
import Vec2 from "./vector2D";
const SPEED = 5;
export default class CuePool{
    constructor(cueMesh, scene){
        this.mesh = cueMesh;
        // this.mesh.rotation = new Vector3(Math.PI,0,0);
        ([this.maxPointX, this.maxPointY, this.maxPointZ,
        this.minPointX, this.minPointY, this.minPointZ] = UtilFunctions.forceBrutePoints(this.mesh.getVerticesData(VertexBuffer.PositionKind)));
        this.mesh.setPivotPoint(new Vector3(this.maxPointX, this.maxPointY, this.maxPointZ));
        this.moveMode = false;
        this.pLoop = new PhysicsLoop();
        this.collider = OBBCollider.minContainingArea(UtilFunctions.valuesToVectors(this.mesh.getVerticesData(VertexBuffer.PositionKind)));
        this.collider.parent = this;
        this.mesh.position = new Vector3(0,20,0);
        this.rotation = new Vec2(0,0);
        this.pLoop.updateColliders(this.collider);
        this.collider.originalPivot = new Vec2(this.minPointX, this.minPointZ);
        this.position = new Vec2(0,-155);
        this.shootMode = false;
        this.origin = this.position;
        this.power = new Vec2(0,0);
        this.active = true;
        this.defaultMaterial = this.mesh.material;
    }

    set position(vec2){
        this.mesh.position = new Vector3(vec2.x, this.mesh.position.y, vec2.z);
        // this.collider.position = this.collider.center.sum(vec2);
        // this.collider.position =  new Vec2(this.maxPointX, this.maxPointZ).sum(this.collider.originalAxis[0].mulEs(this.collider.extents.z)).sum(this.position);
        this.applyTransformation();
    }

    set rotation(vec2){
        // console.log("vec2: ", vec2);
        this.mesh.rotation = new Vector3(vec2.x, vec2.z, this.mesh.rotation.z);
        this.applyTransformation();
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
            if(inputMap["q"]){
                this.rotation = this.rotation.sum(new Vec2(0,-1).mulEs(0.01));
            }
            if(inputMap["e"]){
                this.rotation = this.rotation.sum(new Vec2(0,1).mulEs(0.01));
            }

            if(inputMap["0"]){
                this.rotation = new Vec2(0,0);
            }
            if(inputMap["1"]){
                this.rotation = new Vec2(0,Math.PI/2);
            }
            if(inputMap["2"]){
                this.rotation = new Vec2(0,Math.PI);
            }
            if(inputMap["3"]){
                this.rotation = new Vec2(0,Math.PI + Math.PI/2);
            }

            if(inputMap[" "]){
                this.shootMode = true;
                this.shootBall();
            }
            else{
                if(this.shootMode){
                    this.position = this.origin;
                    this.shootMode = false;
                    this.applyCueForce();
                }
                else{
                    this.origin = this.position;
                }
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



    applyTransformation(){
        let position = this.position;
        let rotation = this.rotation;


        // console.log("Pivot point: ", this.mesh.getAbsolutePivotPoint());
        this.collider.axis[0] = this.collider.originalAxis[0].applyPositiveRotation(-this.rotation.z); //ROTAÇÃO DO EIXO U
        this.collider.axis[1] = this.collider.originalAxis[1].applyPositiveRotation(-this.rotation.z); // ROTAÇÃO DO EIXO V

        this.collider.position = this.collider.originalPivot; // PEGO O PIVO ORIGINAL
        // console.log("originalPivot: ", this.collider.originalPivot); // DEBUG DO PIVOT ORIGINAL

        // console.log("extents: ", this.collider.extents.x);
        // console.log("operation: ", this.collider.axis[0].mulEs(this.collider.extents.z));
        let rotatedPivot = this.collider.position.applyPositiveRotation(this.rotation.z); //APLICO A ROTACAO NO PIVOT ORIGINAL

        // console.log("rotatedPivot: ", rotatedPivot); //VEJO COM O VETOR APLICADO DA ROTAÇÃO


        let centerPivot = rotatedPivot.sum(this.collider.axis[0].mulEs(this.collider.extents.x)); //SOMO O PIVOT ORIGINAL + EIXO U * OS EXTENTS.Z (TA SERVINDO COMO O Y)

        // let rotatedPivot = this.collider.position.sum(this.collider.axis[0].mulEs(this.collider.extents.x));

        centerPivot = centerPivot.sum(new Vec2(0, this.maxPointZ));

        // console.log("centerPivot: ", centerPivot);  //DEBUGO

        // this.collider.axis = Array.from(this.collider.originalAxis);

        this.collider.position = centerPivot;

        // let rotatedPosition = this.position.applyPositiveRotation(-this.rotation.z);

        this.collider.position = centerPivot.sum(this.position); //SOMO O VETOR CALCULADO COM A POSICAO

        // updates the existing instance of lines : no need for the parameter scene here
        // this.lines = BABYLON.MeshBuilder.CreateLines("lines", {points: this.generateLines(), instance: this.lines});

        // console.log("position: ", this.collider.position);
    }


    generateLines(){
        let point1 = this.collider.position.sum(this.collider.axis[0].mulEs(this.collider.extents.x).sum(this.collider.axis[1].mulEs(this.collider.extents.z)));
        let point2 = this.collider.position.sub(this.collider.axis[0].mulEs(this.collider.extents.x).sum(this.collider.axis[1].mulEs(this.collider.extents.z)));
        let point3 = this.collider.position.sum(this.collider.axis[0].mulEs(this.collider.extents.x).sub(this.collider.axis[1].mulEs(this.collider.extents.z)));
        let point4 = this.collider.position.sub(this.collider.axis[0].mulEs(this.collider.extents.x).sub(this.collider.axis[1].mulEs(this.collider.extents.z)));
        return [new Vector3(point1.x, 25, point1.z), new Vector3(point3.x, 25, point3.z), new Vector3(point2.x, 25, point2.z), new Vector3(point4.x, 25, point4.z)]
    }

    shootBall(){
        if(this.power.mag() < 5){
            let calc = new Vec2(0,-2).applyPositiveRotation(-this.rotation.z);
            this.position = this.position.sum(calc);
            this.power = this.power.sum(calc.mulEs(-0.1));
        }
    }

    updatePosition(ball){
        if(ball.movement.x == 0 && ball.movement.z == 0){
            if(!this.shootMode && this.power.x == 0 && this.power.z == 0){
                let calc = new Vec2(0,2.2).applyPositiveRotation(-this.rotation.z).sum(new Vec2(0,this.maxPointZ));
                this.position = ball.position.sub(calc);
            }
        }
    }

    applyCueForce(){
        this.position = this.position.sum(this.power);
    }


    disableCue(scene){
        if(this.active){
            this.active = false;
            let transp = new StandardMaterial("transpMat", scene);
            transp.alpha = 0.1;
            // console.log(this.mesh);
            this.mesh.material = transp;
        }
    }

    enableCue(){
        if(!this.active){
            this.active = true;
            this.mesh.material = this.defaultMaterial;
        }
    }
}