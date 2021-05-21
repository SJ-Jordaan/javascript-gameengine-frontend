import { AnimatableEntity } from "./animatableEntity";
import Game from "./game";
import EventType from "/public/scripts/common/constants/eventType.js";
import CardBuilder from "/public/scripts/view-components/cards/cardBuilder.js";
import { Card, Button, PresetColours, PresetFontSize } from "/public/scripts/view-components/cards/card.js";
import { EntityType } from "./baseEntity";
import { GameScene } from "./scene";

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

        this._scenesList = document.getElementById("activeScene");
        this._changeSceneForm = document.getElementById("changeSceneForm");
        this._createSceneForm = document.getElementById("createSceneForm");
        this._entityType = document.getElementById("entityType");

        this.currentMode = EngineModes.designing;

        //methods
        this.init = this.init.bind(this);
        this.loadTexturesFromLocal = this.loadTexturesFromLocal.bind(this);
        this.loadTextureToWorkspace = this.loadTextureToWorkspace.bind(this);
        this.bulkUploadTexturesToWorkspace = this.bulkUploadTexturesToWorkspace.bind(this);
        this.createGame = this.createGame.bind(this);
        this.loadDefaultAssets = this.loadDefaultAssets.bind(this);
        this.createGameEntity = this.createGameEntity.bind(this);
        this.render = this.render.bind(this);
        this.playGame = this.playGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.translateEntityHandler = this.translateEntityHandler.bind(this);
        this.scaleEntityHandler = this.scaleEntityHandler.bind(this);
        this.rotateEntityHandler = this.rotateEntityHandler.bind(this);
        this.entityTransformedHandler = this.entityTransformedHandler.bind(this);
    }

    //Transformations Event Handlers
    translateEntityHandler(ev) {
        ev.preventDefault();
        const fData = new FormData(ev.target);
        const formValues = {};

        for (let keyval of fData.entries()) {
            formValues[keyval[0]] = keyval[1];
        }

        this.games[this.currentGameIndex].getCurrentSelectedEntity().translateEntity(parseFloat(formValues.x), parseFloat(formValues.y));
    }

    rotateEntityHandler(ev) {
        ev.preventDefault();
        const fData = new FormData(ev.target);
        const formValues = {};

        for (let keyval of fData.entries()) {
            formValues[keyval[0]] = keyval[1];
        }

        console.log(formValues);

        this.games[this.currentGameIndex].getCurrentSelectedEntity().rotateEntity(parseFloat(formValues.degrees));
    }

    scaleEntityHandler(ev) {
        ev.preventDefault();
        const fData = new FormData(ev.target);
        const formValues = {};

        for (let keyval of fData.entries()) {
            formValues[keyval[0]] = keyval[1];
        }

        this.games[this.currentGameIndex].getCurrentSelectedEntity().scaleEntity(parseFloat(formValues.x), parseFloat(formValues.y))
    }

    entityTransformedHandler() {
        const selectedEntity = this.games[this.currentGameIndex].getCurrentSelectedEntity();
        if (selectedEntity) {
            // position
            document.getElementById("xPosition").value = selectedEntity.transform.position.x.toFixed(2);
            document.getElementById("yPosition").value = selectedEntity.transform.position.y.toFixed(2);

            // Scale
            document.getElementById("xScale").value = selectedEntity.transform.scale.x.toFixed(2);
            document.getElementById("yScale").value = selectedEntity.transform.scale.y.toFixed(2);

            // Rotation
            document.getElementById("rotationDeg").value = selectedEntity.transform.rotation.toFixed(2)
        }
    }

    degrees_to_radians(degrees) {
        var pi = Math.PI;
        return degrees * (pi / 180);
    }

    setupEventListeners() {
        const playButton = document.querySelector("#play-button");
        playButton.addEventListener("click", this.playGame, false);

        const stopButton = document.querySelector("#stop-button");
        stopButton.addEventListener("click", this.stopGame, false);

        this._entityContainerId = "entities";
        this._entities = document.getElementById(this._entityContainerId);

        this._positionForm = document.getElementById("positionForm");
        this._rotationForm = document.getElementById("rotationForm");
        this._scaleForm = document.getElementById("scaleForm");

        window.addEventListener("entityChanged", this.entityTransformedHandler);
        this._positionForm.addEventListener(EventType.FORM.SUBMIT, this.translateEntityHandler);
        this._rotationForm.addEventListener(EventType.FORM.SUBMIT, this.rotateEntityHandler);
        this._scaleForm.addEventListener(EventType.FORM.SUBMIT, this.scaleEntityHandler);
    }

    addScenes() {
        if (this._scenesList) {
            this._scenesList.innerHTML = "";

            this.games[0].scenes.forEach((scene) => {
                let option = document.createElement("option");
                option.text = scene.name;
                option.value = scene.name;
                this._scenesList.add(option);
            });
        }
    }

    changeScene() {
        this._changeSceneForm.addEventListener(EventType.FORM.SUBMIT, (ev) => {
            ev.preventDefault();

            const fData = new FormData(ev.target);
            const formValues = {};

            for (let keyval of fData.entries()) {
                formValues[keyval[0]] = keyval[1];
            }

            if (formValues) {
                const index = this.games[this.currentGameIndex].getSceneIndex(formValues.activeScene);

                if (index && index > -1) {
                    this.games[this.currentGameIndex].currentGameIndex = index;

                    console.log(this.games[this.currentGameIndex].scenes);
                    this.games[this.currentGameIndex].scenes.forEach((scene) => {
                        const currIndex = this.games[this.currentGameIndex].scenes.findIndex((x) => {
                            if (x.name === scene.name) return true;
                        });

                        if (currIndex !== index) {
                            scene.visible = false;
                        } else {
                            console.log(scene);
                            scene.visible = true;
                        }
                    });
                }
            }
        });
    }

    createScene() {
        this._createSceneForm.addEventListener(EventType.FORM.SUBMIT, (ev) => {
            ev.preventDefault();
            const fData = new FormData(ev.target);
            const formValues = {};

            for (let keyval of fData.entries()) {
                formValues[keyval[0]] = keyval[1];
            }

            if (formValues) {
                const hasErrors = false;
                if (!formValues?.sceneGravity) {
                    alert("Scene Creation Failed, no gravity selected!");
                    hasErrors = true;
                } else if (!formValues?.sceneHeight && parseFloat(formValues?.sceneHeight) > 0) {
                    alert("Scene Creation Failed, no height selected!");
                    hasErrors = true;
                } else if (!formValues?.sceneWidth && parseFloat(formValues?.sceneWidth) > 0) {
                    alert("Scene Creation Failed, no width selected!");
                    hasErrors = true;
                } else if (!formValues?.sceneName) {
                    alert("Scene Creation Failed, no name provided!");

                    if (this.games[this.currentGameIndex].getSceneIndex(formValues.sceneName) > -1) {
                        alert("Scene Creation Failed, scene name already exists!");
                    }
                    hasErrors = true;
                }

                if (hasErrors) {
                    return undefined;
                }

                this.games[this.currentGameIndex].init(
                    formValues.sceneWidth,
                    formValues.sceneHeight,
                    formValues.sceneName
                );

                this.stage.addChild(
                    this.games[this.currentGameIndex].getSceneAtIndex(
                        this.games[this.currentGameIndex].getSceneIndex(formValues.sceneName)
                    )
                );

                this.addScenes();
                confirm(`Scene ${formValues.sceneName} created Succesfully!`);
            }
        });
    }

    initializeScenes() {
        this.addScenes();
        this.changeScene();
        this.createScene();
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
            width: 1200,
            height: 1000,
        });
        this.renderer = renderer;

        const engineView = document.getElementById("engine-view");
        engineView.appendChild(renderer.view);

        this.setupEventListeners();

        //Pre-load default assets here (Assets that come with the engine)
        this.loader.baseUrl = "/public/assets/";

        this.loadDefaultAssets();
        this.createGame("Test Game");

        this.games[this.currentGameIndex].scenes.forEach((scene) => {
            this.stage.addChild(scene);
        });

        this.initializeScenes();
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

        this.loader.onComplete.add(this.bulkUploadTexturesToWorkspace);
        this.loader.load();
    }

    bulkUploadTexturesToWorkspace(loader, resources) {
        for (var property in resources) {
            let resource = resources[property];
            let name = resource.name;
            let url = resource.url;
            this.loadTextureToWorkspace(name, url);
        }
    }

    loadTextureToWorkspace(name, path) {
        const builder = new CardBuilder();

        const card = new Card();
        card.title = name;
        card.image = path;
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
        game.init(this.renderer.view.width, this.renderer.view.height, "gameScene");
        this.games.push(game);
    }

    deleteGame(gameName) { }

    saveGame(name) {
        const gameState = {};
        gameState[name] = name;
        this.games[this.currentGameIndex].scenes.forEach(scene => {
            const sceneProperties = {
                name: scene.name,
                height: scene.height,
                width: scene.width,
                gravity: scene.gravity,
                children: [],
            };

            let entityProperties;
            gameState[scene.name] = sceneProperties;

            scene.children.forEach(child => {
                let scale = { x: child.scale._x, y: child.scale._y };
                entityProperties = {
                    name: child.name,
                    type: child.type,
                    xPosition: child.x,
                    yPosition: child.y,
                    mass: child.mass,
                    acceleration: child.acceleration,
                    texture: child._texture.textureCacheIds,
                    scale: scale,
                    rotation: child.angle,
                };
                gameState[scene.name].children.push(entityProperties);
                console.log(child.transform);
            });
        });

        //Send save request from here JSON.stringify(gameState)
    }

    loadGame(gameName){
        //Send request to get back game data
        //Testing method using data of a game previously saved
        //JSON formatting for saving above needs a bit of tweaking though
        const response = "{\"name\":\"gameScene\",\"height\":389,\"width\":310,\"gravity\":8,\"children\":[{\"name\":\"untitled0\",\"type\":\"character\",\"xPosition\":346,\"yPosition\":247,\"mass\":0,\"acceleration\":0,\"texture\":[\"blueTile\",\"\/public\/assets\/images\/blueTile.png\"],\"scale\":{\"x\":1,\"y\":1},\"rotation\":0},{\"name\":\"untitled1\",\"type\":\"character\",\"xPosition\":368,\"yPosition\":393,\"mass\":0,\"acceleration\":0,\"texture\":[\"greenTile\",\"\/public\/assets\/images\/greenTile.png\"],\"scale\":{\"x\":5,\"y\":1},\"rotation\":0},{\"name\":\"untitled2\",\"type\":\"character\",\"xPosition\":558,\"yPosition\":144,\"mass\":0,\"acceleration\":0,\"texture\":[\"redTile\",\"\/public\/assets\/images\/redTile.png\"],\"scale\":{\"x\":1,\"y\":6},\"rotation\":0}]}";
        const gameData = JSON.parse(response);
        const game = new Game(gameData["name"]);
        const gameScene = new GameScene(gameData["name"], gameData["height"], gameData["width"]);
        gameScene.gravity = gameData["gravity"];
        game.scenes.push(gameScene);

        gameData["children"].forEach(child => {
            let entity;
            if(child.type === EntityType["character"]){
                const texture = child.texture[0];
                const name = child.name;
                entity = new AnimatableEntity(PIXI.utils.TextureCache[texture], name);
                entity.setTransform(child.xPosition, child.yPosition, child.scale["x"], child.scale["y"], child["rotation"]);
                entity.acceleration = child.acceleration;
                entity.mass = child.mass;
                gameScene.addChild(entity);
            }
        });

        this.games[this.currentGameIndex] = game;
        this.games[this.currentGameIndex].scenes.forEach((scene) => {
            this.stage.addChild(scene);
        });
    }

    createGameEntity(texture = PIXI.utils.TextureCache["blueTile"]) {
        const index = this.games[this.currentGameIndex].scenes[0].children.length;

        const gameEntity = new AnimatableEntity(texture, "untitled" + index);
        gameEntity.type = EntityType[this._entityType.value];
        gameEntity.x = this.renderer.screen.width / 2;
        gameEntity.y = this.renderer.screen.height / 2;
        this.games[this.currentGameIndex].getCurrentScene().setSelectedEntityName(gameEntity.name);
        this.games[this.currentGameIndex].scenes[0].addChild(gameEntity);
    }

    playGame() {
        this.loadGame();
        this.games[this.currentGameIndex].setGameMode("play");
    }

    stopGame() {
        this.games[this.currentGameIndex].setGameMode("design");
    }
}
