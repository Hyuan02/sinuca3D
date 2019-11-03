import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

const ASSETS_FOLDER = "assets/models";

const POOL_FOLDER = "/Pool_table/";

const POOL_FILE = "pool_table.obj";

export default class AssetsImport{
    static importPool(scene){
        return new BABYLON.SceneLoader.AppendAsync(ASSETS_FOLDER+POOL_FOLDER,POOL_FILE, scene, (err, scene)=>{ 
        });
    }
}
