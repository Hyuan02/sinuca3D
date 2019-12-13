export default class Vec2{
    constructor(x, z){
        this.x = x;
        this.z = z;
    }


    /**
     *
     * Soma um vetor com o outro retornando o resultado
     * @param {*} vector Vec2
     * @returns Vec2 
     * @memberof Vec2
     */
    sum(vector){
        return new Vec2(this.x + vector.x, this.z + vector.z);
    }

    /**
     * Subtrai um vetor com o outro retornando o resultado;
     *
     * @param {*} vector Vec2
     * @returns Vec2
     * @memberof Vec2
     */
    sub(vector){
        return new Vec2(this.x - vector.x, this.z - vector.z);        
    }


    /**
     * Retorna a magnitude de um vetor.
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
     * Return o vetor normalizado.
     *
     * @returns Vec2
     * @memberof Vec2
     */
    norm(){
        let result = this.mag();
        return new Vec2(this.x/result, this.z/result);
    }


    /**
     * Retorna o vetor multiplicado por um escalar.
     * @returns Vec2
     * @memberof Vec2
     */

     mulEs(num){
        return new Vec2(this.x*num, this.z*num);
     }


    
    /**
     * Retorna o produto escalar de dois vetores.
     *
     * @param {*} vector
     * @returns number
     * @memberof Vec2
     */
    dot(vector){
        return (this.x * vector.x) + (this.z * vector.z);
     }



     /**
      * Retorna a projeção de dois vetores.
      *
      * @param {*} vector
      * @returns Vec2
      * @memberof Vec2
      */
     proj(vector){
         return vector.mulEs(this.dot(vector)/vector.dot(vector));
     }



     /**
      * Retorna o calculo de deslizamento de dois vetores 
      *
      * @param {*} vector
      * @returns
      * @memberof Vec2
      */
     slide(vector){
         return this.sub(this.proj(vector));
     }




     /**
      * Aplica a matriz de translação positiva com um determinado ângulo.
      *
      * @param {*} ang - angulo em radianos.
      * @returns Vec2
      * @memberof Vec2
      */
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