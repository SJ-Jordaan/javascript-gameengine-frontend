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
        this.addTestObjects = this.addTestObjects.bind(this);
        this.render = this.render.bind(this);
        this.playGame = this.playGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
    }

    addTestObjects(){
        const surface_1 = new BaseEntity(PIXI.utils.TextureCache["redTile"], "red");
        surface_1.x = 20;
        surface_1.y = 20;
        this.games[this.currentGameIndex].scenes[0].addChild(surface_1);

        const surface_2 = new BaseEntity(PIXI.utils.TextureCache["blackTile"], "black");
        surface_2.x = 20;
        surface_2.y = 20;
        this.games[this.currentGameIndex].scenes[0].addChild(surface_2);

        const surface_3 = new BaseEntity(PIXI.utils.TextureCache["yellowTile"], "yellow");
        surface_3.x = 20;
        surface_3.y = 20;
        this.games[this.currentGameIndex].scenes[0].addChild(surface_3);

        const surface_4 = new BaseEntity(PIXI.utils.TextureCache["brownTile"], "brown");
        surface_4.x = 20;
        surface_4.y = 20;
        this.games[this.currentGameIndex].scenes[0].addChild(surface_4);

        const surface_5 = new BaseEntity(PIXI.utils.TextureCache["greenTile"], "green");
        surface_5.x = 20;
        surface_5.y = 20;
        this.games[this.currentGameIndex].scenes[0].addChild(surface_5);
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

        const playBtn = document.querySelector("#play-button");
        playBtn.addEventListener('click', this.playGame, false);

        const stopBtn = document.querySelector("#stop-button");
        stopBtn.addEventListener('click', this.stopGame, false);

        //Pre-load default assets here (Assets that come with the engine)
        this.loader.baseUrl = "/public/assets/";

        this.loadDefaultAssets();
        this.createGame("Test Game");

        this.games[this.currentGameIndex].scenes.forEach(scene => {
            this.stage.addChild(scene);
        });

        PIXI.Ticker.shared.add(this.render);
    }

    render(delta){
        this.renderer.clear();
        if(this.games[this.currentGameIndex].mode === "play"){
            this.games[this.currentGameIndex].play(delta);
        }
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
            .add("background", "images/background.jpg");

        this.loader.onComplete.add(this.addTestObjects);
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
        game.init(this.renderer.view.width, this.renderer.view.height);
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

    playGame(){
        this.games[this.currentGameIndex].setGameMode("play");
    }

    stopGame(){
        this.games[this.currentGameIndex].setGameMode("design");
    }
};