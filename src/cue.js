import { Vector3, Matrix, VertexBuffer, MeshBuilder, StandardMaterial } from "babylonjs";
import PhysicsLoop from './physicsLoop';
import {UtilFunctions, OBBCollider} from './collider';
import Vec2 from "./vector2D";



/**
 * Classe responsável por administrar o taco de sinuca. 
 *
 * @export
 * @class CuePool
 */
export default class CuePool{


    /**
     *Cria uma instância do taco.
     * @param {*} cueMesh
     * @param {*} scene
     * @memberof CuePool
     */
    constructor(cueMesh, scene){
        this.mesh = cueMesh;
        ([this.maxPointX, this.maxPointY, this.maxPointZ,
        this.minPointX, this.minPointY, this.minPointZ] = UtilFunctions.forceBrutePoints(this.mesh.getVerticesData(VertexBuffer.PositionKind)));
        this.mesh.setPivotPoint(new Vector3(this.maxPointX, this.maxPointY, this.maxPointZ)); // utilizado para fazer o mesh rotacionar ao fim, simulando o comportamento de um taco.
        this.moveMode = false;
        this.pLoop = new PhysicsLoop();
        this.collider = OBBCollider.minContainingArea(UtilFunctions.valuesToVectors(this.mesh.getVerticesData(VertexBuffer.PositionKind)));
        this.collider.parent = this;
        this.mesh.position = new Vector3(0,22,0);
        this.rotation = new Vec2(0,0);
        this.pLoop.updateColliders(this.collider);
        this.collider.originalPivot = new Vec2(this.minPointX, this.minPointZ); // utilizado para guardar o pivo original do objeto.
        this.position = new Vec2(0,-155);
        this.shootMode = false;
        this.origin = this.position;
        this.power = new Vec2(0,0);
        this.active = true;
        this.defaultMaterial = this.mesh.material;
    }

    


    /**
     * Operador utilizado para definir a posição do taco. Traduzindo a estrutura de fisica, para o componente de vetor que o babylon usa.
     *
     * @memberof CuePool
     */
    set position(vec2){
        this.mesh.position = new Vector3(vec2.x, this.mesh.position.y, vec2.z);
        this.applyTransformation();
    }


    /**
     * Operador utilizado para definir a rotação do taco. Traduzindo a estrutura de fisica, para o componente de vetor que o babylon usa.
     *
     * @memberof CuePool
     */
    set rotation(vec2){
        this.mesh.rotation = new Vector3(vec2.x, vec2.z, this.mesh.rotation.z);
        this.applyTransformation();
    }

    /**
     * Operador utilizado para ler a posição do taco. Pegando o vetor que o babylon usa e transformando na estrutura fisica utilizada.
     *
     * @memberof CuePool
     */
    get position(){
        return new Vec2(this.mesh.position.x, this.mesh.position.z);
    }

    /**
     * Operador utilizado para ler a rotação do taco. Pegando o vetor que o babylon usa e transformando na estrutura fisica utilizada.
     *
     * @memberof CuePool
     */
    get rotation(){

        //ROTACAO DADA EM RADIANOS
        return new Vec2(this.mesh.rotation.x, this.mesh.rotation.y);
    }



    
    /**
     *
     * função que checa os inputs e transfere para ações correspondentes no taco.
     * @param {*} inputMap
     * @memberof CuePool
     */
    checkControl(inputMap){
            if(inputMap["q"]){
                this.rotation = this.rotation.sum(new Vec2(0,-1).mulEs(0.01));
            }
            if(inputMap["e"]){
                this.rotation = this.rotation.sum(new Vec2(0,1).mulEs(0.01));
            }

            if(inputMap["a"]){
                this.rotation = new Vec2(0,0);
            }
            if(inputMap["w"]){
                this.rotation = new Vec2(0,Math.PI/2);
            }
            if(inputMap["d"]){
                this.rotation = new Vec2(0,Math.PI);
            }
            if(inputMap["s"]){
                this.rotation = new Vec2(0,Math.PI + Math.PI/2);
            }

            if(inputMap[" "]){
                this.shootMode = true;
                this.shootBall();
            }
            else{
                if(this.shootMode){
                    this.position = this.origin;
                    this.shootMode = false;
                    this.applyCueForce();
                }
                else{
                    this.origin = this.position;
                }
            }
    }




    /**
     * Função que aplica lê os parâmetros atuais de rotação e posição e aplica transformações no collider
     *
     * @memberof CuePool
     */
    applyTransformation(){
        let position = this.position;
        let rotation = this.rotation;


        this.collider.axis[0] = this.collider.originalAxis[0].applyPositiveRotation(-this.rotation.z); //ROTAÇÃO DO EIXO U
        this.collider.axis[1] = this.collider.originalAxis[1].applyPositiveRotation(-this.rotation.z); // ROTAÇÃO DO EIXO V

        this.collider.position = this.collider.originalPivot; // PEGO O PIVO ORIGINAL
        // console.log("originalPivot: ", this.collider.originalPivot); // DEBUG DO PIVOT ORIGINAL

        // console.log("extents: ", this.collider.extents.x);
        // console.log("operation: ", this.collider.axis[0].mulEs(this.collider.extents.z));
        let rotatedPivot = this.collider.position.applyPositiveRotation(this.rotation.z); //APLICO A ROTACAO NO PIVOT ORIGINAL

        // console.log("rotatedPivot: ", rotatedPivot); //VEJO COM O VETOR APLICADO DA ROTAÇÃO


        let centerPivot = rotatedPivot.sum(this.collider.axis[0].mulEs(this.collider.extents.x)); //SOMO O PIVOT ORIGINAL + EIXO U * OS EXTENTS.Z (TA SERVINDO COMO O Y)

        // let rotatedPivot = this.collider.position.sum(this.collider.axis[0].mulEs(this.collider.extents.x));

        centerPivot = centerPivot.sum(new Vec2(0, this.maxPointZ));

        // console.log("centerPivot: ", centerPivot);  //DEBUGO


        this.collider.position = centerPivot;

        // let rotatedPosition = this.position.applyPositiveRotation(-this.rotation.z);

        this.collider.position = centerPivot.sum(this.position); //SOMO O VETOR CALCULADO COM A POSICAO

        // this.lines = BABYLON.MeshBuilder.CreateLines("linescue", {points: this.generateLines(), instance: this.lines});

        // console.log("position: ", this.collider.position);
    }



    /**
     *
     * Função utilizada para gerar linhas de debug para colisor. 
     * @returns
     * @memberof CuePool
     */
    generateLines(){
        let point1 = this.collider.position.sum(this.collider.axis[0].mulEs(this.collider.extents.x).sum(this.collider.axis[1].mulEs(this.collider.extents.z)));
        let point2 = this.collider.position.sub(this.collider.axis[0].mulEs(this.collider.extents.x).sum(this.collider.axis[1].mulEs(this.collider.extents.z)));
        let point3 = this.collider.position.sum(this.collider.axis[0].mulEs(this.collider.extents.x).sub(this.collider.axis[1].mulEs(this.collider.extents.z)));
        let point4 = this.collider.position.sub(this.collider.axis[0].mulEs(this.collider.extents.x).sub(this.collider.axis[1].mulEs(this.collider.extents.z)));
        return [new Vector3(point1.x, 30, point1.z), new Vector3(point3.x, 30, point3.z), new Vector3(point2.x, 30, point2.z), new Vector3(point4.x, 30, point4.z), new Vector3(point1.x, 30, point1.z)]
    }

    
    /**
     * Função para aplicar um deslocamento no taco quando ele estiver preparando para um lançamento.
     *
     * @memberof CuePool
     */
    shootBall(){
        if(this.power.mag() < 5){
            let calc = new Vec2(0,-2).applyPositiveRotation(-this.rotation.z);
            this.position = this.position.sum(calc);
            this.power = this.power.sum(calc.mulEs(-0.1));
        }
    }


    /**
     *
     * Função para a atualizar a posição do taco baseada na posição da bola branca. 
     * @param {*} ball - instancia da bola branca.
     * @memberof CuePool
     */
    updatePosition(ball){
        if(ball.movement.x == 0 && ball.movement.z == 0){
            if(!this.shootMode && this.power.x == 0 && this.power.z == 0){
                let calc = new Vec2(0,2.2).applyPositiveRotation(-this.rotation.z).sum(new Vec2(0,this.maxPointZ));
                this.position = ball.position.sub(calc);
            }
        }
    }



    /**
     *
     * Aplica a força de lançamento em um deslocamento para o taco. 
     * @memberof CuePool
     */
    applyCueForce(){
        this.position = this.position.sum(this.power.mulEs(1.5));
    }



    /**
     *
     * Função que desabilita o taco temporariamente fazendo ele ignorar colisões.
     * @param {*} scene - Cena que o taco está presente.
     * @memberof CuePool
     */
    disableCue(scene){
        if(this.active){
            this.active = false;
            let transp = new StandardMaterial("transpMat", scene);
            transp.alpha = 0.1;
            this.mesh.material = transp;
        }
    }



    /**
     *
     * Habilita o taco e troca para a textura padrão dele.
     * @memberof CuePool
     */
    enableCue(){
        if(!this.active){
            this.active = true;
            this.mesh.material = this.defaultMaterial;
        }
    }
}