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
    }

    init(){
        const engineView = document.getElementById("engine-view");
        engineView.appendChild(this.app.view);
        const gameScene = new GameScene(800, 600);
        gameScene.init();
        this.app.stage.addChild(gameScene);
        // this.app.ticker(this.gameLoop);
    }

    gameLoop(){

    }
};