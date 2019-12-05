




export class SphereCollider{

}


export class AABBCollider{

    constructor(min, max, position){
        this.min = min;
        this.max = max;
        this.position = position;
    }


    static checkAABBOverlap(a, b){
        return (a.min.x + a.position.x <= b.max.x + b.position.x && a.max.x + a.position.x >= b.min.x + b.position.x) &&
        (a.min.y + a.position.y <= b.max.y + b.position.y && a.max.y + a.position.y >= b.min.y + b.position.y) &&
        (a.min.z + a.position.z <= b.max.z + b.position.z && a.max.z + a.position.z >= b.min.z + b.position.z)
    }


    static forceBrutePoints(data){
        let maxPointX=data[0], maxPointY=data[1], maxPointZ=data[2];
        let minPointX=data[0], minPointY=data[1], minPointZ=data[2];
        for(let i=0; i<data.length; i++){
            let quote = i%3;
            if(quote == 0){
                minPointX = Math.min(minPointX, data[i]);
                maxPointX = Math.max(maxPointX, data[i]);
            }
            else if (quote == 1){
                minPointY = Math.min(minPointY, data[i]);
                maxPointY = Math.max(maxPointY, data[i]);
            }
            else{
                minPointZ = Math.min(minPointZ, data[i]);
                maxPointZ = Math.max(maxPointZ, data[i]);
            }
        }
        return [maxPointX, maxPointY, maxPointZ, minPointX, minPointY, minPointZ];
    }
}

export class OBBCollider{

}