import { BaseEntity } from "./baseEntity";
import { AnimatableEntity } from "./animatableEntity";
import { GameScene } from "./scene";

export default class Game {
    constructor(name) {
        this.name = name;
        this.TextureCache = PIXI.utils.TextureCache;
        this.scenes = [];
        this.currentSceneIndex = 0;

        //methods
        this.addBackground = this.addBackground.bind(this);
        this.play = this.play.bind(this);
        this.render = this.render.bind(this);
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
        //TODO: This method starts the game loop 
    }

    stop() {
        //TODO: This method stops the game loop
    }

    update() {
        //TODO: Updates the game scene during playing mode
    }

    //Adds entities to the game scene (currenty test objects)
    render() {
        
        this.addBackground(this.TextureCache["background"]);

        let green = new AnimatableEntity(this.TextureCache["greenTile"]);
        green.x = 20;
        green.y = 20;
        this.scenes[0].addChild(green);

        let brown = new AnimatableEntity(this.TextureCache["brownTile"]);
        brown.x = 80;
        brown.y = 80;
        this.scenes[0].addChild(brown);

        let blue = new AnimatableEntity(this.TextureCache["blueTile"]);
        blue.x = 120;
        blue.y = 120;
        this.scenes[0].addChild(blue);

        let orange = new AnimatableEntity(this.TextureCache["orangeTile"]);
        orange.x = 240;
        orange.y = 240;
        this.scenes[0].addChild(orange);

        let red = new AnimatableEntity(this.TextureCache["redTile"]);
        red.x = 320;
        red.y = 320;
        this.scenes[0].addChild(red);

        let yellow = new AnimatableEntity(this.TextureCache["yellowTile"]);
        yellow.x = 400;
        yellow.y = 400;
        this.scenes[0].addChild(yellow);

        let black = new AnimatableEntity(this.TextureCache["/public/assets/images/yellowTile.png"]);
        black.x = 500;
        black.y = 500;
        this.scenes[0].addChild(black);
    }
}