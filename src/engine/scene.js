import { Entity } from "./entity";
export class GameScene extends PIXI.Container {
    constructor() {
        super();
        this.edgeSnap = true;
        this.vertexSnap = true;
        this.snapDistance = 20;
        this.enableEdgeSnap = this.enableEdgeSnap.bind(this);
        this.disableEdgeSnap = this.disableEdgeSnap.bind(this);
        this.enableVertexSnap = this.enableVertexSnap.bind(this);
        this.disableVertexSnap = this.disableVertexSnap.bind(this);
    }

    enableEdgeSnap() {
        this.edgeSnap = true;
    }

    disableEdgeSnap() {
        this.edgeSnap = false;
    }

    enableVertexSnap(){
        this.vertexSnap = true;
    }

    disableVertexSnap(){
        this.vertexSnap = false;
    }
};