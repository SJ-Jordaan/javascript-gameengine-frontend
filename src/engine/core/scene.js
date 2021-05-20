export class GameScene extends PIXI.Container {
    constructor(name, width, height) {
        super();
        this.name = name;
        this.width = width;
        this.height = height;
        this.edgeSnap = true;
        this.vertexSnap = true;
        this.snapDistance = 20;
        this.gravity = 8;
        this.selectedEntityName;
        this.entitySelectedEvent = new CustomEvent("entityChanged", {
            detail: {
                changed: true,
            },
        });
    }

    enableEdgeSnap() {
        this.edgeSnap = true;
    }

    disableEdgeSnap() {
        this.edgeSnap = false;
    }

    enableVertexSnap() {
        this.vertexSnap = true;
    }

    disableVertexSnap() {
        this.vertexSnap = false;
    }

    setGravity(gravity) {
        this.gravity = gravity;
    }

    addChild(gameEntity) {
        super.addChild(gameEntity);
        window.dispatchEvent(this.entitySelectedEvent);
    }

    setSelectedEntityName(entityName) {
        window.dispatchEvent(this.entitySelectedEvent);
        this.selectedEntityName = entityName;
    }

    getSelectedEntity() {
        return this.children.find((e) => e.name == this.selectedEntityName);
    }

    getEntityChangeEvent() {
        this.entitySelectedEvent;
    }
}
