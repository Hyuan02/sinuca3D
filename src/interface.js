import * as BABYLON from 'babylonjs'
import * as GUI from 'babylonjs-gui';


export default class GameInterface {
    constructor() {
        var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        advancedTexture.renderAtIdealSize = true;
        advancedTexture.idealWidth = 1520;
        advancedTexture.idealHeight = 1000;
        var title1 = new GUI.TextBlock("instructions", "Q e E para mudar angulo\n Espaço para lançar \n w, a, s e d para atalhos.");
        title1.color = BABYLON.Color3.White();
        title1.left = -500;
        title1.top = -300;
        advancedTexture.addControl(title1);
    }
}