import { Entity } from "./entity";
import { GameScene } from "./scene";
export class CoreEngine{
    constructor(width = 800, height = 600){
        this.app = new PIXI.Application({
            width: width,
            height: height,
            backgroundColor: 0xaaaaaa,
            resolution: window.devicePixelRatio || 1,
            autoResize: true,
        });

        this.scene = new GameScene(800, 600);
    }

    init(){
        const engineView = document.getElementById("engine-view");
        engineView.appendChild(this.app.view);
        this.app.stage.addChild(this.scene);
    }

    loadAsset(assetName, filePath){
        this.app.loader.add(assetName, filePath);
        return this.app.loader; //For method chaining
    }

    addToScene(entity){
        this.scene.addEntity(entity);
    }

    static gameLoop(frameRate){
        console.log(frameRate);
    }
};