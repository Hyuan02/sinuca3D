export default class Vec2{
    constructor(x, z){
        this.x = x;
        this.z = z;
    }


    /**
     *
     * Sum this vector with another vector, returning the result. 
     * @param {*} vector Vec2
     * @returns Vec2 
     * @memberof Vec2
     */
    sum(vector){
        return new Vec2(this.x + vector.x, this.z + vector.z);
    }

    /**
     * Subtracts this vector with another vector, returning the result.
     *
     * @param {*} vector Vec2
     * @returns Vec2
     * @memberof Vec2
     */
    sub(vector){
        return new Vec2(this.x - vector.x, this.z - vector.z);        
    }


    /**
     * Multiplies this vector with another vector returning the result.
     *
     * @param {*} vector
     * @returns Vec3
     * @memberof Vec3
     */
    mul(vector){
        return new Vec2(this.x*vector.x, this.z * vector.z);
    }


    /**
     * Divides this vector with another vector returning the result.
     *
     * @param {*} vector
     * @returns Vec2
     * @memberof Vec2
     */
    div(number){
        return new Vec2(this.x/number, this.z/number);s
    }


    /**
     * Return the magnitude of the vector.
     *
     * @returns number
     * @memberof Vec2
     */
    mag(){
        let a = Math.pow(this.x,2);
        let b = Math.pow(this.z, 2);
        return Math.sqrt(a+b);
    }


    
    /**
     * Return the normalized vector.
     *
     * @returns Vec2
     * @memberof Vec2
     */
    norm(){
        let result = this.mag();
        return new Vec2(this.x/result, this.z/result);
    }


    /**
     * Return the vector multiplied by a escalar.
     */

     mulEs(num){
        return new Vec2(this.x*num, this.z*num);
     }


    dot(vector){
        return (this.x * vector.x) + (this.z * vector.z);
     }

     proj(vector){
         return vector.mulEs(this.dot(vector)/vector.dot(vector));
     }

     slide(vector){
         return this.sub(this.proj(vector));
     }


     applyPositiveRotation(ang){
        let cosAng = Math.cos(ang);
        // console.log("cosAng: ", cosAng);
        let sinAng = Math.sin(ang);
        // console.log("sinAng: ", cosAng);
        let result1 = this.x * cosAng - this.z * sinAng;
        let result2 = this.x * sinAng + this.z * cosAng;
        return new Vec2(result1, result2);
     }
    
}