import {Entity} from "./entity";

export class GameScene extends PIXI.Container{
    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
    }

    init(){
        let block_1 = new Entity("/public/images/tile.png");
        this.addChild(block_1);

        let block_2 = new Entity("/public/images/tile.png", 100, 100);
        this.addChild(block_2);

        let block_3 = new Entity("/public/images/tile.png", 200, 200);
        this.addChild(block_3);

        let block_4 = new Entity("/public/images/tile.png", 50, 50);
        this.addChild(block_4);
    }
};