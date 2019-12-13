import * as BABYLON from 'babylonjs';
import { AABBCollider, UtilFunctions, SphereCollider } from './collider';
import PhysicsLoop from './physicsLoop';
import BallsController from './ballsController';
import Vec2 from './vector2D';
import { Vector3 } from 'babylonjs';

const SIZE_BALL = 3;




/**
 * Represents a instancia de uma bola.
 *
 * @export
 * @class Ball
 */
export default class Ball{
    constructor(mesh, position, collider, whiteBall){
        this.mesh = mesh;
        this.collider = collider;
        this.position = position;
        this.movement = new Vec2(0,0);
        this.whiteBall = whiteBall;
        this.static = false;
        this.active = true;
    }


    /**
     * Instancia uma bola e preenche o array de bolas, adicionando seu colisor também.
     *
     * @param {*} x number - Posição x.
     * @param {*} z number - Posição z.
     * @param {*} scene BABYLON.scene - cena
     * @param {*} whiteBall boolean - checa se e a bola branca ou não.
     * @returns Ball
     * @memberof Ball
     */
    static createBall(x,z, scene, whiteBall = false){
        let ballsController = new BallsController();
        let mesh = new BABYLON.MeshBuilder.CreateSphere('ball' + ballsController.balls.length, {diameter:SIZE_BALL}, scene);
        mesh.position.x = x;
        mesh.position.y = 20;
        mesh.position.z = z;
        let points = UtilFunctions.valuesToVectors(mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind)); // funcao utilizada para extrair todos os pontos de um mesh
        let collider = SphereCollider.containingCircle(points);
        let ball = new Ball(mesh, new Vec2(mesh.position.x, mesh.position.z), collider, whiteBall);
        collider.parent = ball;
        collider.position = new Vec2(x,z);
        ballsController.updateBalls(ball);
        let pLoop = new PhysicsLoop();
        pLoop.updateColliders(collider);
        return ball;
    }



    
    /**
     * Retorna a posição da bola, por tradução dos parâmetros do babylon.
     *
     * @memberof Ball
     */
    get position(){
        return new Vec2(this.mesh.position.x, this.mesh.position.z);
    }


    /**
     * Define a posição da bola, traduzindo os parâmetros para o babylon.
     *
     * @memberof Ball
     */
    set position(vec2){
        this.mesh.position = new Vector3(vec2.x, this.mesh.position.y, vec2.z);
        this.collider.position = vec2;
    }



    /**
     * Função responsável por aplicar as forças na bola. 
     *
     * @memberof Ball
     */
    applyMovement(){
        this.position = this.position.sum(this.movement);
        this.applyFriction();
        this.applyRotation();
    }



    /**
     *
     * Função responsável por aplicar uma força de atrito na bola, até chegar ao movimento nulo.
     * @memberof Ball
     */
    applyFriction(){
        // console.log(this.movement);
        if(this.movement.x >= 0.1 || this.movement.z > 0.1){
            this.movement = this.movement.mulEs(0.98);
        }
        else if(this.movement.x < -0.1 || this.movement.z < -0.1){
           this.movement = this.movement.mulEs(0.98);
        }
        else{
            this.movement = new Vec2(0,0);
        }
    }



    /**
     * Função responsável por um efeito estético de rotação da bola.
     *
     * @memberof Ball
     */
    applyRotation(){
        if(this.movement.x > 0 || this.movement.z > 0){
            let rot =  this.movement.mulEs(1.0/SIZE_BALL);
            this.mesh.rotation = new Vector3(this.mesh.rotation.x + rot.x, this.mesh.rotation.y + rot.z, this.mesh.rotation.z + 0.08);
            // console.log(this.mesh.rotation);
        }
    }




    /**
     * Função responsável por aplicar um efeito de queda a bola quando ela cai dentro da caçapa.
     *
     * @memberof Ball
     */
    applyEffect(){
        if(this.mesh.position.y>2){
            this.movement = this.movement.mulEs(0.8);
            this.mesh.position.y -= 1;
        }
        else{
            if(this.whiteBall){
                this.mesh.position.y = 20;
                this.position = new Vec2(0,0);
            }
            else{
                this.active = false;
            }
        }
    }




}