import Vec3 from "./vector3D";
import Vec2 from "./vector2D";

export class SphereCollider{
    constructor(center, radius){
        this.center = center;
        this.radius = radius;
        this.position;
    }

    static containingCircle(points){
        let center = new Vec2(0,0);
        points.forEach(e=>{
            center = center.sum(e);
        });
        center = center.mulEs(1.0/points.length);

        let circle = new SphereCollider(center, center.sub(points[0]).mag());
        for(let i = 1; i<points.length; i++){
            let distance = center.sub(points[i]).mag();
            if(distance > circle.radius){
                circle.radius = distance;
            }
        }

        circle.radius = Math.sqrt(circle.radius);
        console.log(circle);
        
        return circle;
    }

}


export class AABBCollider{

    constructor(min, max, position, colBox){
        this.min = min;
        this.max = max;
        this.position = position;
        this.colBox = colBox;
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

    constructor(center, extents, axis){
        this.center = center; 
        this.extents = extents; 
        this.axis = axis;
        this.position = new Vec2();
        this.originalAxis = Array.from(axis);
        this.originalPivot = new Vec2();
        this.debugBox;
    }


    static minContainingArea(points){
        let u,v;
        let center = new Vec2();
        let extents = new Vec2();
        let i, j = 0;
        let minArea = Number.MAX_VALUE;
        for(i=0; i<points.length; i++){
            let e1 = points[i].sub(points[j]);
            e1 = e1.norm();
            let e2 = new Vec2(-e1.z, e1.x);

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
            extents = new Vec2((max0-min0)/2.0, (max1-min1)/2.0);
            if(area < minArea && area != 0){
                minArea = area;
                center = points[j].sum((e1.mulEs(min0+max0).sum(e2.mulEs(min1+max1)).mulEs(0.5)));
                // console.log("center: ",center);
                u = e1;
                v = e2;
            }

            j = i;
        }

        return new OBBCollider(center, extents, [u,v]);
    }



    static checkOBBToSphereOverlap(circle, rectangle){
        let d = circle.center.sub(rectangle.position);
        let q = rectangle.position;
        let e = Object.values(rectangle.extents);

        for(let i=0; i<2; i++){
            let distance = d.dot(rectangle.axis[i]);
            if(distance > e[i]) 
                distance = e[i];
            if(distance < -e[i])
                distance = -e[i];
            
           q = q.sum(rectangle.axis[i].mulEs(distance));
        }

        let v = q.sub(circle.center);
        

        return v.dot(v) <= (circle.radius * circle.radius);
    }
}


export class UtilFunctions{
    static valuesToVectors(data){
        let arrayVectors = new Array();
        let point = new Vec2();
        for(let i=0; i<data.length; i++){
            let quote = i%3;
            if(quote == 0){
                point.x = data[i];
            }
            else if (quote == 2){
                point.z = data[i];
                arrayVectors.push(point);
                point = new Vec2();
            }
        }
        return arrayVectors;
    }
}