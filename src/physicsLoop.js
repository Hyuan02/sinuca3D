import { AABBCollider, OBBCollider, SphereCollider } from "./collider";
import {Vector3} from "babylonjs";
import Vec2 from "./vector2D";
// import Ball from "./ball";
import BallsController from "./ballsController";

let colliders = [];
/**
 *Class used to handle physics operations in the scene loop.
 *
 * @export
 * @class PhysicsLoop
 */
export default class PhysicsLoop{
    constructor(){
        this.colliders = colliders;
        this.ballsController = new BallsController();
    }


    updateColliders(collider){
        colliders.push(collider);
        this.colliders = colliders;
        return this.colliders.length - 1;
    }

 
    updatePositionCollider(index, position){
        this.colliders[index].position = position;
        if(this.colliders[index].colBox != null){
            this.colliders[index].colBox.position = new Vector3(position.x, position.y, position.z);
        }
            
    }



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



    checkIndividualCollision(element, secondElement){
        if(element instanceof AABBCollider && secondElement instanceof AABBCollider){
            // console.log(AABBCollider.checkAABBOverlap(element, secondElement));
        }

        else if(element instanceof OBBCollider && secondElement instanceof SphereCollider){
            if(element.parent.active){
                if(OBBCollider.checkOBBToSphereOverlap(secondElement, element)){
                    if(secondElement instanceof SphereCollider){
                        element.parent.power = new Vec2(0,0);
                        let rot = element.parent.rotation;
                        let rotX = Math.sin(rot.z);
                        let rotY = Math.cos(rot.z);
                        secondElement.parent.movement = new Vec2(rotX, rotY).mulEs(1);
                    }
                }
            }
        }

        else if(element instanceof AABBCollider && secondElement instanceof SphereCollider){
            if(!secondElement.parent.static){  
                if(AABBCollider.checkAABBSphereOverlap(element,secondElement)){
                    secondElement.parent.movement = secondElement.parent.movement.mulEs(-1);
                }
            }
        }

        else if(element instanceof SphereCollider && secondElement instanceof SphereCollider){
            if(!(element.parent.static && secondElement.parent.static)){
                if(SphereCollider.checkCircleOverlap(element, secondElement)){
                    console.log("collided");
                }
            }
        }

    }

    checkMovements(){
        this.ballsController.balls.forEach(e=>{
            e.applyMovement();
        });
    }
}


