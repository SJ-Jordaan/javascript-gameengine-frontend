import {Entity} from "./entity";
export class GameScene extends PIXI.Container{
    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
        this.edgeSnap = true;
        this.vertexSnap = true;
        this.snapDistance = 20;

        //TODO: Snap should only be enabled in design mode
    }

    addEntity(entity){
        this.addChild(entity);
    }

    enableEdgeSnap(){
        this.edgeSnap = true;
    }

    disableEdgeSnap(){
        this.edgeSnap = false;
    }
};