import { BaseEntity } from "./baseEntity";
import { AnimatableEntity } from "./animatableEntity";
import { GameScene } from "./scene";
import {detectCollision} from "../physics/physicsEngine";

export default class Game {
    constructor(name) {
        this.name = name;
        this.TextureCache = PIXI.utils.TextureCache;
        this.scenes = [];
        this.currentSceneIndex = 0;

        //methods
        this.addBackground = this.addBackground.bind(this);
        this.play = this.play.bind(this);
        this.init = this.init.bind(this);
        this.stop = this.stop.bind(this);
        this.update = this.update.bind(this);
    }

    //Initializes a game with a single blank scene
    init() {
        let gameScene = new GameScene("gameScene");
        gameScene.visible = true;
        this.scenes.push(gameScene);
    }

    addBackground(texture) {
        if (texture !== null && typeof texture !== "undefined") {
            let background = new BaseEntity(texture);
            this.scenes[this.currentSceneIndex].addChild(background);
        }
    }

    play() {
        this.update();
    }

    stop() {
        //TODO: This method stops the game loop
    }

    update(){
        const children = this.scenes[this.currentSceneIndex].children;
        children.forEach(element => {
            if(element instanceof AnimatableEntity){
                element.transformX(1);
                let siblings = element.getSiblings();
                siblings.forEach(sibling => {
                    if(detectCollision(element, sibling)){
                        console.log("Collision Detected");
                    }
                });
            }
        });
    }
}