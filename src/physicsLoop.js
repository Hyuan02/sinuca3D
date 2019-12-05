import { AABBCollider } from "./collider";

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
            console.log(AABBCollider.checkAABBOverlap(element, secondElement));
        }
    }
}


