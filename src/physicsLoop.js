import { AABBCollider, OBBCollider, SphereCollider } from "./collider";
import {Vector3} from "babylonjs";
import Vec2 from "./vector2D";
// import Ball from "./ball";
import BallsController from "./ballsController";

let colliders = [];
/**
 *Classe que lida com os calculos fisicos que acontecem no jogo.
 *
 * @export
 * @class PhysicsLoop
 */
export default class PhysicsLoop{


    /**
     *Creates an instance of PhysicsLoop.
     * @memberof PhysicsLoop
     */
    constructor(){
        this.colliders = colliders;
        this.ballsController = new BallsController();
    }




    /**
     *
     *Atualiza o array de colisores do jogo.
     * @param {*} collider -  o colisor.
     * @returns
     * @memberof PhysicsLoop
     */
    updateColliders(collider){
        colliders.push(collider);
        this.colliders = colliders;
        return this.colliders.length - 1;
    }

 



    /**
     *
     * Checa colisoes que ocorrem perante todos os elementos.
     * @memberof PhysicsLoop
     */
    checkCollisions(){
        if(colliders.length>1){
            colliders.forEach((element, index) => {
                colliders.forEach((secondElement, secondIndex)=>{
                    if(index != secondIndex){
                        this.checkIndividualCollision(element, secondElement);
                    }
                });
            });
        }
    }



    /**
     *
     * Checa colisões que ocorrem entre um qualquer tipo de colisor 
     * @param {*} element
     * @param {*} secondElement
     * @memberof PhysicsLoop
     */
    checkIndividualCollision(element, secondElement){
        if(element instanceof AABBCollider && secondElement instanceof AABBCollider){
            // console.log(AABBCollider.checkAABBOverlap(element, secondElement)); // funcao desabilitada pois nao havia necessidade
        }

        
        // Checa colisao entre obb e circulo
        else if(element instanceof OBBCollider && secondElement instanceof SphereCollider){
            if(element.parent.active && secondElement.parent.whiteBall){ // caso o elemento esteja ativo, e a esfera seja a bola branca
                if(OBBCollider.checkOBBToSphereOverlap(secondElement, element)){ //
                    if(secondElement instanceof SphereCollider){
                        let rot = element.parent.rotation; //pega a rotacao do taco
                        let rotX = Math.sin(rot.z); 
                        let rotY = Math.cos(rot.z);
                        secondElement.parent.movement = new Vec2(rotX, rotY).mulEs(element.parent.power.mag()); //cria um vetor com o deslocamento relativo a normal que ira acontecer na bola.
                        element.parent.power = new Vec2(0,0); // zera o vetor de impulso para utiliza-lo novamente
                    }
                }
            }
        }

        else if(element instanceof AABBCollider && secondElement instanceof SphereCollider){
            if(!secondElement.parent.static){ //caso a esfera nao seja uma estatica, ou seja, uma caçapa;
                if(AABBCollider.checkAABBSphereOverlap(element,secondElement)){
                    secondElement.parent.movement = secondElement.parent.movement.mulEs(-1);
                }
            }
        }

        else if (element instanceof SphereCollider && secondElement instanceof SphereCollider) {
            if (element.parent.active && secondElement.parent.active) { // caso as duas estejam no jogo
                if (!(element.parent.static && secondElement.parent.static)) { //e ambas nao sejam caçapas
                    if (SphereCollider.checkCircleOverlap(element, secondElement)) {
                        if (element.parent.static || secondElement.parent.static) { // caso a colisao seja entre uma bola e uma caçapa
                            let ball = !element.parent.static ? element.parent : secondElement.parent;
                            ball.applyEffect(); // aplica o efeito de descida dependendo da bola que e dinamica
                        }
                        else {
                            SphereCollider.applyForceBalls(element, secondElement); // caso ambas sejam dinamicas
                        }
                    }
                }
            }
        }

    }



    /**
     *
     * Aplica movimentos nas bolas a cada frame.
     * @memberof PhysicsLoop
     */
    checkMovements(){
        this.ballsController.balls.forEach(e=>{
            e.applyMovement();
        });
    }
}


