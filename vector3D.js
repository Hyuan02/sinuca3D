export default class Vec3 {

    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    sum(vector){
        return new Vec3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
    }


    sub(vector){
        return new Vec3(this.x - vector.x, this.y - vector.y, this.z - vector.z);        
    }

    mul(vector){
        return new Vec3(this.x*vector.x, this.y * vector.y, this.z * vector.z);
    }

    div(vector){
        return new Vec3(this.x/vector.x, this.y/vector.y, this.z/vector.z);
    }

}