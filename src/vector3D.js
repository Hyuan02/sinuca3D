

/**
 * Base implementation of vector3 operations.
 *
 * @export
 * @class Vec3
 */
export default class Vec3 {

    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }


    /**
     *
     * Sum this vector with another vector, returning the result. 
     * @param {*} vector Vec3
     * @returns Vec3 
     * @memberof Vec3
     */
    sum(vector){
        return new Vec3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }

    /**
     * Subtracts this vector with another vector, returning the result.
     *
     * @param {*} vector Vec3
     * @returns Vec3
     * @memberof Vec3
     */
    sub(vector){
        return new Vec3(this.x - vector.x, this.y - vector.y, this.z - vector.z);        
    }


    /**
     * Multiplies this vector with another vector returning the result.
     *
     * @param {*} vector
     * @returns Vec3
     * @memberof Vec3
     */
    mul(vector){
        return new Vec3(this.x*vector.x, this.y * vector.y, this.z * vector.z);
    }


    /**
     * Divides this vector with another vector returning the result.
     *
     * @param {*} vector
     * @returns Vec3
     * @memberof Vec3
     */
    div(vector){
        return new Vec3(this.x/vector.x, this.y/vector.y, this.z/vector.z);
    }


    /**
     * Return the magnitude of the vector.
     *
     * @param {*} vector Vec3
     * @returns number
     * @memberof Vec3
     */
    mag(){
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2) + Math.pow(this.z, 2));
    }


    
    /**
     * Return the normalized vector.
     *
     * @returns Vec3
     * @memberof Vec3
     */
    norm(){
        let result = this.mag();
        return new Vec3(this.x/result, this.y/result, this.z/result);
    }

    // dot(vector){
    //     const norm_vec = this.norm();


    // }
    
    
}