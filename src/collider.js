import Vec3 from "./vector3D";

export class SphereCollider{
    constructor(position, radius){
        this.position = position;
        this.radius = radius;
    }

    static containingCircle(points){
        

        

    }

}


export class AABBCollider{

    constructor(min, max, position, colBox){
        this.min = min;
        this.max = max;
        this.position = position;
        this.colBox = colBox;
        console.log(colBox);
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

    constructor(position, center, extents, axisX, axisY){
        this.position = position;
        this.center = center; 
        this.extents = extents; 
        this.axisX = axisX;
        this.axisY = axisY;
    }


    static minContainingArea(points){
        let u,v;
        let center = new Vec3();
        let i, j = 0;
        let minArea = Number.MAX_VALUE;
        // console.log(minArea)
        for(i=0; i<points.length; i++){
            let e1 = points[i].sub(points[j]);
            e1 = e1.norm();
            let e2 = new Vec3(-e1.z, e1.y, e1.x);

            let min0 = 0.0, min1 = 0.0, max0 = 0.0, max1 = 0.0;

            for(let k = 0; k<points.length; k++){
                let d = points[k].sub(points[j]);
                let dot = d.dot(e1);
                // console.log("dot: ", dot);
                if(dot < min0)
                    min0 = dot;
                if(dot > max0)
                    max0 = dot;
                dot = d.dot(e2);
                if(dot < min1)
                    min1 = dot;
                if(dot > max1)
                    max1 = dot;
            }

            let area = (max0 - min0) * (max1 - min1);
            console.log(area);
            if(area < minArea && area != 0){
                minArea = area;
                center = points[j].sum((e1.mulEs(min0+max0).sum(e2.mulEs(min1+max1)).mulEs(0.5)));
                // console.log("center: ",center);
                u = e1;
                v = e2;
            }

            j = i;
        }

        return {u, v, minArea, center};
    }
}


export class utilFunctions{
    static valuesToVectors(data){

        let arrayVectors = new Array();
        let point = new Vec3();
        for(let i=0; i<data.length; i++){
            let quote = i%3;
            if(quote == 0){
                point.x = data[i];
            }
            else if (quote == 1){
                point.y = data[i];
            }
            else{
                point.z = data[i];
                arrayVectors.push(point);
                point = new Vec3();
            }
        }
        return arrayVectors;
    }
}