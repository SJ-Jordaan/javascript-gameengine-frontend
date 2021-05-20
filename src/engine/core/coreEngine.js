"use strict";

import {AnimatableEntity} from "./animatableEntity";
import {BaseEntity} from "./baseEntity";
import Game from "./game";
import EventType from "/public/scripts/common/constants/eventType.js";
import workspaceNavigation from "/public/scripts/workspaceNav.js";
import CardBuilder from "/public/scripts/view-components/cards/cardBuilder.js";
import {Card, Button, PresetColours, PresetFontSize} from "/public/scripts/view-components/cards/card.js";
import Form from "/public/scripts/common/utility/forms/form.js";
import {EventTypeAndHandler} from "/public/scripts/common/utility/events/events.js";

const EngineModes = {
    designing: "Designing",
    playing: "Playing",
    paused: "Paused",
};

Object.freeze(EngineModes);
export class CoreEngine {
    constructor() {
        //Instance variables
        this.loader = new PIXI.Loader();
        this.stage = new PIXI.Container();
        this.currentGameIndex = 0;
        this.games = [];
        this._entityContainerId = "entities";
        this._entities = document.getElementById(this._entityContainerId);

        this._posForm = document.getElementById("positionForm");
        this._rotForm = document.getElementById("rotationForm");
        this._scaleForm = document.getElementById("scaleForm");
        this._filtEntForm = document.getElementById("filterEntitiesForm");
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

    addTestObjects() {
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

    filterEntities() {
        const entities = document.getElementById("entities");

        this._filtEntForm.addEventListener(EventType.FORM.SUBMIT, (ev) => {
            ev.preventDefault();
            const fData = new FormData(ev.target);
            const values = {};

            for (let keyval of fData.entries()) {
                values[keyval[0]] = keyval[1];
            }

            // clear entities before populating
            // entities.innerHTML = "";
            console.log(`Filtering By: ${values.type}`);
        });
    }

    initializeEntitySettings() {
        // this._posForm = new Form("rotationForm");
        // this._rotForm = new Form("rotationForm");
        // this._scaleForm = new Form("scaleForm");
        const scene = this.games[this.currentGameIndex].getCurrentScene();

        window.addEventListener("entityChanged", (e) => {
            if (scene) {
                const index = scene.children.findIndex((e) => {
                    if (e.name === scene.selectedEntityName) return true;
                });

                if (index > -1) {
                    // position
                    document.getElementById("xPosition").value = scene.children[index].transform.position.x.toFixed(2);
                    document.getElementById("yPosition").value = scene.children[index].transform.position.y.toFixed(2);

                    // Scale
                    document.getElementById("xScale").value = scene.children[index].transform.scale.x.toFixed(2);
                    document.getElementById("yScale").value = scene.children[index].transform.scale.y.toFixed(2);

                    // Rotation
                    document.getElementById("rotationDeg").value = scene.children[index].transform.rotation.toFixed(2);
                }
            }
        });

        this._posForm.addEventListener(EventType.FORM.SUBMIT, (ev) => {
            ev.preventDefault();
            const fData = new FormData(ev.target);
            const formValues = {};

            for (let keyval of fData.entries()) {
                formValues[keyval[0]] = keyval[1];
            }

            if (!fData) {
                alert("Invalid form submitted");
            }

            if (scene) {
                const index = scene.children.findIndex((e) => {
                    if (e.name === scene.selectedEntityName) return true;
                });

                if (index > -1) {
                    scene.children[index].transformEntity(parseFloat(formValues.x), parseFloat(formValues.y));
                }
            }
        });

        this._rotForm.addEventListener(EventType.FORM.SUBMIT, (ev) => {
            ev.preventDefault();
            const fData = new FormData(ev.target);
            const formValues = {};

            for (let keyval of fData.entries()) {
                formValues[keyval[0]] = keyval[1];
            }

            if (!fData) {
                alert("Invalid form submitted");
            }

            if (scene) {
                const index = scene.children.findIndex((e) => {
                    if (e.name === scene.selectedEntityName) return true;
                });

                if (index > -1) {
                    scene.children[index].rotateEntity(this.degrees_to_radians(parseFloat(formValues.degrees)));
                }
            }
        });

        this._scaleForm.addEventListener(EventType.FORM.SUBMIT, (ev) => {
            ev.preventDefault();
            const fData = new FormData(ev.target);
            const formValues = {};

            for (let keyval of fData.entries()) {
                formValues[keyval[0]] = keyval[1];
            }

            if (!fData) {
                alert("Invalid form submitted");
            }

            if (scene) {
                const index = scene.children.findIndex((e) => {
                    if (e.name === scene.selectedEntityName) return true;
                });

                if (index > -1) {
                    scene.children[index].scaleEntity(parseFloat(formValues.x), parseFloat(formValues.y));
                }
            }
        });
    }

    degrees_to_radians(degrees) {
        var pi = Math.PI;
        return degrees * (pi / 180);
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
        const uploadBtn = document.querySelector("#upload-button");
        uploadBtn.addEventListener("change", this.loadTexturesFromLocal, false);

        const createBtn = document.querySelector("#create-sprite-button");
        createBtn.addEventListener("click", this.createGameEntity, false);

        const playBtn = document.querySelector("#play-button");
        playBtn.addEventListener("click", this.playGame, false);

        const stopBtn = document.querySelector("#stop-button");
        stopBtn.addEventListener("click", this.stopGame, false);

        //Pre-load default assets here (Assets that come with the engine)
        this.loader.baseUrl = "/public/assets/";

        this.loadDefaultAssets();
        this.createGame("Test Game");

        this.games[this.currentGameIndex].scenes.forEach((scene) => {
            this.stage.addChild(scene);
        });
        this.initializeEntitySettings();
        this.filterEntities();

        // this.loadEntitiesToWorkspace();
        PIXI.Ticker.shared.add(this.render);
    }

    render(delta) {
        this.renderer.clear();
        if (this.games[this.currentGameIndex].mode === "play") {
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

        this.loadEntityToWorkspace("blueTile", "images/blueTile.png");

        this.loader.onComplete.add(this.addTestObjects);
        this.loader.load();
    }

    loadEntityToWorkspace(name, path) {
        const assetPath = "/public/assets/" + path;
        const builder = new CardBuilder();

        const card = new Card();
        card.title = name;
        card.image = assetPath;
        card.colour = PresetColours.Light;

        var buttons = new Array();

        const button = new Button();
        button.title = "Add";
        button.id = name;
        button.colour = PresetColours.Primary;
        button.fontSize = PresetFontSize.Smaller;
        button.action = (ev) => {
            ev.preventDefault();
            const create = ev.target.id;
            this.createGameEntity(PIXI.utils.TextureCache[create]);
        };
        buttons.push(button);

        card.buttons = buttons;

        let cardWrapper = builder.createInlineCard(card);
        this._entities.appendChild(cardWrapper);
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
            };
            reader.readAsDataURL(input.files[i]);
        }
    }

    createGame(gameName) {
        let game = new Game(gameName);
        game.init(this.renderer.view.width, this.renderer.view.height);
        this.games.push(game);
    }

    deleteGame(gameName) {}

    saveGame() {}

    createGameEntity(texture = PIXI.utils.TextureCache["blueTile"]) {
        //Creates an entity at the center of the current game scene with the default
        //texture and default title
        const index = this.games[this.currentGameIndex].scenes[0].children.length;

        const gameEntity = new AnimatableEntity(texture, "untitled" + index);
        gameEntity.x = this.renderer.screen.width / 2;
        gameEntity.y = this.renderer.screen.height / 2;
        this.games[this.currentGameIndex].getCurrentScene().setSelectedEntityName(gameEntity.name);
        this.games[this.currentGameIndex].scenes[0].addChild(gameEntity);
    }

    playGame() {
        this.games[this.currentGameIndex].setGameMode("play");
    }

    stopGame() {
        this.games[this.currentGameIndex].setGameMode("design");
    }
}
