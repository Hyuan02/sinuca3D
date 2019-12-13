import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

const ASSETS_FOLDER = "assets/models";

const POOL_FOLDER = "/Pool_table/";

const POOL_FILE = "pool_table.obj";

const CUE_FOLDER = "/Pool_cue/";

const CUE_FILE = "10522_Pool_Cue_v1_L3.obj";



/**
 * Classe com funções para importar os asssets.
 *
 * @export
 * @class AssetsImport
 */
export default class AssetsImport{


    /**
     * Importa a mesa de sinuca.
     *
     * @static
     * @param {*} scene BABYLON.Scene
     * @returns BABYLON.Scene
     * @memberof AssetsImport
     */
    static importPool(scene){
        return new Promise ((resolve, reject)=>{
            BABYLON.SceneLoader.LoadAssetContainer(ASSETS_FOLDER+POOL_FOLDER,POOL_FILE, scene, (container)=>{
                container.addAllToScene();
                resolve(container.meshes[0]); 
            });
        });
    }


    /**
     * Importa o taco.
     *
     * @static
     * @param {*} scene 
     * @returns BABYLON.Scene
     * @memberof AssetsImport
     */
    static importCue(scene){
        return new Promise((resolve, reject)=>{
            BABYLON.SceneLoader.LoadAssetContainer(ASSETS_FOLDER+CUE_FOLDER,CUE_FILE, scene, (container)=>{
                container.addAllToScene();
                resolve(container.meshes[0]);
            });
        }); 
    }
}
