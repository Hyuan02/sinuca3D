import { AABBCollider, OBBCollider, SphereCollider } from "./collider";
import { Vector3 } from "babylonjs";

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
            console.log(OBBCollider.checkOBBToSphereOverlap(secondElement, element));
        }

        // else if(element instanceof SphereCollider && secondElement instanceof OBBCollider){
        //     console.log(OBBCollider.checkOBBToSphereOverlap(element, secondElement));
        // }
    }
}


