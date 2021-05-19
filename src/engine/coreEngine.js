import Game from "./game";

const EngineModes = {
    designing: "Designing",
    playing: "Playing",
    paused: "Paused"
};

Object.freeze(EngineModes);
export class CoreEngine {
    constructor(width = 900, height = 600) {
        //Instance variables
        this.app = new PIXI.Application({
            width: width,
            height: height,
            backgroundColor: 0xaaaaaa,
            resolution: window.devicePixelRatio || 1, autoResize: true
        });
        this.currentGameIndex = 0;
        this.games = [];
        this.currentMode = EngineModes.designing;

        //methods
        this.init = this.init.bind(this);
        this.loadTexturesFromLocal = this.loadTexturesFromLocal.bind(this);
        this.renderGame = this.renderGame.bind(this);
        this.createGame = this.createGame.bind(this);
        this.loadDefaultAssets = this.loadDefaultAssets.bind(this);
    }

    init() {
        const engineView = document.getElementById("engine-view");
        engineView.appendChild(this.app.view);

        const uploadBtn = document.querySelector('#upload-button');
        uploadBtn.addEventListener('change', this.loadTexturesFromLocal, false);

        //Pre-load default assets here (Assets that come with the engine)
        this.app.loader.baseUrl = "/public/assets/";

        this.loadDefaultAssets();
        this.createGame("Test Game");

        this.games[this.currentGameIndex].scenes.forEach(scene => {
            this.app.stage.addChild(scene);
        });
    }

    loadDefaultAssets() {
        this.app.loader
            .add("blueTile", "images/blueTile.png")
            .add("brownTile", "images/brownTile.png")
            .add("blackTile", "images/blackTile.png")
            .add("greenTile", "images/greenTile.png")
            .add("yellowTile", "images/yellowTile.png")
            .add("redTile", "images/redTile.png")
            .add("whiteTile", "images/whiteTile.png")
            .add("orangeTile", "images/orangeTile.png")
            .add("background", "images/background.jpg");
        
        this.app.loader.onComplete.add(this.renderGame);
        this.app.loader.load();
    }

    //Event handler for reading images from the local machine and uploading them
    //into the engine's TextureCache (PIXI.utils.TextureCache)
    loadTexturesFromLocal(event) {
        let input = event.target;
        let selectedFiles = input.files;

        for (let i = 0; i < selectedFiles.length; i++) {
            let reader = new FileReader();
            reader.onload = function () {
                const img = new Image();
                img.src = reader.result;
                let texture = new PIXI.BaseTexture(img.src);
                PIXI.Texture.addToCache(texture, input.files[i].name);
            }
            reader.readAsDataURL(input.files[i]);
        }
    }

    renderGame() {
        this.games[this.currentGameIndex].render();
    }

    createGame(gameName) {
        let game = new Game(gameName);
        game.init();
        this.games.push(game);
    }

    deleteGame(gameName) {
        //TODO: This method deletes a game with name gameName from the list of games
        //TODO: This should make a backend call to have the data associated with the
        //game deleted from the DB as well
    }

    saveGame() {
        //TODO: Saves the current state of the game in the database.
        //TODO: Figure out the best way to save game data
    }

    play(){
        this.currentMode = EngineModes.playing;
    }
};