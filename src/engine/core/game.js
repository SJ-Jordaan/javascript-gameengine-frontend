import {BaseEntity} from "./baseEntity";
import {AnimatableEntity} from "./animatableEntity";
import {GameScene} from "./scene";
import {detectCollision, freeFall} from "../physics/physicsEngine";

const GameMode = {
    design: "design",
    play: "play",
    paused: "Paused",
};

Object.freeze(GameMode);
export default class Game {
    constructor(name) {
        this.name = name;
        this.TextureCache = PIXI.utils.TextureCache;
        this.scenes = [];
        this.currentSceneIndex = 0;
        this.mode = GameMode.design;
    }

    //Initializes a game with a single blank scene
    init(width, height) {
        let gameScene = new GameScene("gameScene", width, height);
        gameScene.mode = this.mode;
        gameScene.visible = true;
        this.scenes.push(gameScene);
    }

    getSceneAtIndex(index) {
        if (typeof index === "number" && index < this.scenes.length) {
            return this.scenes[index];
        }
        return undefined;
    }

    getCurrentScene() {
        return this.scenes[this.currentSceneIndex];
    }

    setGameMode(mode) {
        this.mode = GameMode[mode];
        this.scenes[this.currentSceneIndex].mode = this.mode;
    }

    addBackground(texture) {
        if (texture !== null && typeof texture !== "undefined") {
            let background = new BaseEntity(texture);
            this.scenes[this.currentSceneIndex].addChild(background);
        }
    }

    play(delta) {
        this.update(delta);
    }

    stop() {
        //TODO: This method stops the game loop
    }

    update(delta) {
        const children = this.scenes[this.currentSceneIndex].children;
        children.forEach((element) => {
            if (element instanceof AnimatableEntity) {
                element.moveX(1);
                freeFall(element, delta);
            }
        });
    }

    getCurrentSelectedEntity(){
        const index = this.scenes[0].children.findIndex((e) => {
            if (e.name === this.scenes[0].selectedEntityName) return true;
        });

        if(index > -1){
            return this.scenes[this.currentSceneIndex].children[index];
        }
    }
}
