import { GameScene } from "./scene";
import { Entity } from "./entity";
export class CoreEngine {
    constructor(width = 800, height = 600) {
        this.app = new PIXI.Application({
            width: width,
            height: height,
            backgroundColor: 0xaaaaaa,
            resolution: window.devicePixelRatio || 1, autoResize: true
        });
        this.scene = new GameScene(width, height);
        this.app.stage.addChild(this.scene);
        this.addTestObjects = this.addTestObjects.bind(this);
        this.init = this.init.bind(this);
        this.loadTexturesFromLocal = this.loadTexturesFromLocal.bind(this);
    }

    init() {
        const engineView = document.getElementById("engine-view");
        engineView.appendChild(this.app.view);

        const uploadBtn = document.querySelector('#upload-button');
        uploadBtn.addEventListener('change', this.loadTexturesFromLocal, false);

        //Pre-load default assets here
        this.app.loader.baseUrl = "/public/assets/";
        this.app.loader
            .add("blueTile", "images/blueTile.png")
            .add("brownTile", "images/brownTile.png")
            .add("blackTile", "images/blackTile.png")
            .add("greenTile", "images/greenTile.png")
            .add("yellowTile", "images/yellowTile.png")
            .add("redTile", "images/redTile.png")
            .add("whiteTile", "images/whiteTile.png")
            .add("orangeTile", "images/orangeTile.png")

        this.app.loader.load(this.addTestObjects);
    }

    //Event handler for reading images from the local machine and uploading them
    //into the engine's TextureCache (PIXI.utils.TextureCache)
    loadTexturesFromLocal(event){
        let input = event.target;
        let selectedFiles = input.files;

        for(let i = 0; i < selectedFiles.length; i++){
            let reader = new FileReader();
            reader.onload = function(){
                const img = new Image();
                img.src = reader.result;
                let texture = new PIXI.BaseTexture(img.src);
                PIXI.Texture.addToCache(texture, input.files[i].name);
            }
            reader.readAsDataURL(input.files[i]);
        }
    }

    //Adds test objects to the scene
    addTestObjects(loader, resources){
        let green = new Entity(resources.greenTile.texture);
        green.x = 20;
        green.y = 20;
        this.scene.addChild(green);

        let brown = new Entity(resources.brownTile.texture);
        brown.x = 80;
        brown.y = 80;
        this.scene.addChild(brown);

        let blue = new Entity(resources.blueTile.texture);
        blue.x = 120;
        blue.y = 120;
        this.scene.addChild(blue);

        let orange = new Entity(resources.orangeTile.texture);
        orange.x = 240;
        orange.y = 240;
        this.scene.addChild(orange);

        let red = new Entity(resources.redTile.texture);
        red.x = 320;
        red.y = 320;
        this.scene.addChild(red);

        let yellow = new Entity(resources.yellowTile.texture);
        yellow.x = 400;
        yellow.y = 400;
        this.scene.addChild(yellow);

        let black = new Entity(resources.blackTile.texture);
        black.x = 500;
        black.y = 500;
        this.scene.addChild(black);
    }
};