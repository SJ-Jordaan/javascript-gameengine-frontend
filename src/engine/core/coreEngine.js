'use strict';

import { AnimatableEntity } from "./animatableEntity";
import { BaseEntity } from "./baseEntity";
import Game from "./game";

const EngineModes = {
    designing: "Designing",
    playing: "Playing",
    paused: "Paused"
};

Object.freeze(EngineModes);
export class CoreEngine {
    constructor() {
        //Instance variables
        this.loader = new PIXI.Loader();
        this.stage = new PIXI.Container();
        this.currentGameIndex = 0;
        this.games = [];
        this.currentMode = EngineModes.designing;

        //methods
        this.init = this.init.bind(this);
        this.loadTexturesFromLocal = this.loadTexturesFromLocal.bind(this);
        this.createGame = this.createGame.bind(this);
        this.loadDefaultAssets = this.loadDefaultAssets.bind(this);
        this.createGameEntity = this.createGameEntity.bind(this);
        this.createBackground = this.createBackground.bind(this);
        this.render = this.render.bind(this);
    }

    init() {
        const renderer = PIXI.autoDetectRenderer({
            antalias: true,
            autoDensity: true,
            resolution: window.devicePixelRatio || 1,
            width: 900,
            height: 600,
        });
        this.renderer = renderer;

        const engineView = document.getElementById("engine-view");
        engineView.appendChild(renderer.view);

        const uploadBtn = document.querySelector('#upload-button');
        uploadBtn.addEventListener('change', this.loadTexturesFromLocal, false);

        const createBtn = document.querySelector("#create-sprite-button");
        createBtn.addEventListener('click', this.createGameEntity, false);

        //Pre-load default assets here (Assets that come with the engine)
        this.loader.baseUrl = "/public/assets/";

        this.loadDefaultAssets();
        this.createGame("Test Game");

        this.games[this.currentGameIndex].scenes.forEach(scene => {
            this.stage.addChild(scene);
        });

        PIXI.Ticker.shared.add(this.render);
    }

    render(){
        this.renderer.clear();
        this.games[this.currentGameIndex].play();
        this.renderer.render(this.stage);
    }

    loadDefaultAssets() {
        this.loader
            .add("blueTile", "images/blueTile.png")
            .add("brownTile", "images/brownTile.png")
            .add("blackTile", "images/blackTile.png")
            .add("greenTile", "images/greenTile.png")
            .add("yellowTile", "images/yellowTile.png")
            .add("redTile", "images/redTile.png")
            .add("whiteTile", "images/whiteTile.png")
            .add("orangeTile", "images/orangeTile.png")
            // .add("background", "images/background.jpg");

        // this.loader.onComplete.add();
        this.loader.load();
    }

    //Event handler for reading images from the local machine and uploading them
    //into the engine's TextureCache (PIXI.utils.TextureCache)
    loadTexturesFromLocal(event) {
        let input = event.target;
        let selectedFiles = input.files;

        for (let i = 0; i < selectedFiles.length; i++) {
            let reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                let texture = new PIXI.BaseTexture(img.src);
                PIXI.Texture.addToCache(texture, input.files[i].name);
            }
            reader.readAsDataURL(input.files[i]);
        }
    }

    createGame(gameName) {
        let game = new Game(gameName);
        game.init();
        this.games.push(game);
    }

    deleteGame(gameName) {
    }

    saveGame() {
    }

    createGameEntity() {
        //Creates an entity at the center of the current game scene with the default
        //texture and default title
        const index = this.games[this.currentGameIndex].scenes[0].children.length;

        const gameEntity = new AnimatableEntity(PIXI.utils.TextureCache["blueTile"], "untitled" + index);
        gameEntity.x = this.renderer.screen.width / 2;
        gameEntity.y = this.renderer.screen.height / 2;
        this.games[this.currentGameIndex].scenes[0].addChild(gameEntity);
    }

    createBackground(texture = PIXI.utils.TextureCache["background"]){
        const backgrounds = this.games[this.currentGameIndex].scenes[0].children.filter(element => {
            return element.name.toLowerCase() === "background";
        });

        const index = backgrounds.length;
        const background = new BaseEntity(texture, "background" + index);
        this.games[this.currentGameIndex].scenes[this.games[this.currentGameIndex].currentSceneIndex].addChild(background);
    }
};