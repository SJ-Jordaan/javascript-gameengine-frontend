import Point from "./point";

export const EntityType = {
    character: "character",
    surface: "surface",
    background: "background",
};

Object.freeze(EntityType);

export class BaseEntity extends PIXI.Sprite {
    constructor(texture, name) {
        super(texture);
        this.name = name.toLowerCase(); //Unique identifier for this entity
        this.interactive = true;
        this.buttonMode = true;
        this.type = EntityType.surface;
        this.anchor.set(0.5);
        this.vertexPoints = {
            topLeft: new Point(this.x, this.y),
            topRight: new Point(this.x + this.getBounds().width, this.y),
            bottomLeft: new Point(this.x, this.y + this.getBounds().height),
            bottomRight: new Point(this.x + this.getBounds().width, this.y + this.getBounds().height),
        };

        this.on("pointerdown", this.onDragStart)
            .on("pointerup", this.onDragEnd)
            .on("pointerupoutside", this.onDragEnd)
            .on("pointermove", this.onDragMove);

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragMove = this.onDragMove.bind(this);
        this.updateVertexPoints = this.updateVertexPoints.bind(this);
        this.snapToEdge = this.snapToEdge.bind(this);
        this.snapToVertex = this.snapToVertex.bind(this);
        this.getSiblings = this.getSiblings.bind(this);
    }

    updateVertexPoints() {
        this.vertexPoints = {
            topLeft: new Point(this.x, this.y),
            topRight: new Point(this.x + this.getBounds().width, this.y),
            bottomLeft: new Point(this.x, this.y + this.getBounds().height),
            bottomRight: new Point(this.x + this.getBounds().width, this.y + this.getBounds().height),
        };
    }

    snapToEdge(snapDistance) {
        if (this.parent.mode === "design" && this.parent.edgeSnap === true) {
            let siblings = this.parent.children.filter((element) => {
                return element.x !== this.x && element.y !== this.y;
            });

            siblings.forEach((sibling) => {
                if (sibling.type !== EntityType.background) {
                    if (
                        Math.abs(this.getBounds().top - sibling.getBounds().bottom) < snapDistance &&
                        this.x <= sibling.getBounds().right &&
                        this.x >= sibling.getBounds().left
                    ) {
                        this.x = sibling.x;
                        this.y = sibling.y + sibling.getBounds().height;
                    } else if (
                        Math.abs(this.getBounds().bottom - sibling.getBounds().top) < snapDistance &&
                        this.x <= sibling.getBounds().right &&
                        this.x >= sibling.getBounds().left
                    ) {
                        this.x = sibling.x;
                        this.y += Math.abs(this.getBounds().bottom - sibling.getBounds().top);
                    } else if (
                        Math.abs(this.getBounds().right - sibling.getBounds().left) < snapDistance &&
                        this.y <= sibling.getBounds().bottom &&
                        this.y >= sibling.getBounds().top
                    ) {
                        this.y = sibling.y;
                        this.x += Math.abs(this.getBounds().right - sibling.getBounds().left);
                    } else if (
                        Math.abs(this.getBounds().left - sibling.getBounds().right) < snapDistance &&
                        this.y <= sibling.getBounds().bottom &&
                        this.y >= sibling.getBounds().top
                    ) {
                        this.y = sibling.y;
                        this.x = sibling.x + sibling.getBounds().width;
                    }
                }
            });
        }
    }

    snapToVertex(snapDistance) {
        if (this.parent.mode === "design" && this.parent.vertexSnap === true) {
            let siblings = this.parent.children.filter((element) => {
                return element.x !== this.x && element.y !== this.y;
            });

            siblings.forEach((sibling) => {
                if (sibling.type !== EntityType.background) {
                    if (this.vertexPoints.topLeft.distanceTo(sibling.vertexPoints.bottomRight) <= snapDistance) {
                        this.x = sibling.x + sibling.getBounds().width;
                        this.y = sibling.y + sibling.getBounds().height;
                    } else if (this.vertexPoints.topRight.distanceTo(sibling.vertexPoints.bottomLeft) <= snapDistance) {
                        this.x = sibling.x - this.getBounds().width;
                        this.y = sibling.y + this.getBounds().height;
                    } else if (this.vertexPoints.bottomRight.distanceTo(sibling.vertexPoints.topLeft) <= snapDistance) {
                        this.x = sibling.x - this.getBounds().width;
                        this.y = sibling.y - this.getBounds().height;
                    } else if (this.vertexPoints.bottomLeft.distanceTo(sibling.vertexPoints.topRight) <= snapDistance) {
                        this.x = sibling.x + sibling.getBounds().width;
                        this.y = sibling.y - this.getBounds().height;
                    }
                }
            });
        }
    }

    setEntityType(entityType) {
        this.type = EntityType[entityType];
    }

    getSiblings() {
        let siblings = this.parent.children.filter((element) => {
            return element.name !== this.name;
        });
        return siblings;
    }

    moveX(delta) {
        this.x += delta;
        this.updateVertexPoints();
    }

    moveY(delta) {
        this.y += delta;
        this.updateVertexPoints();
    }

    translateEntity(x, y) {
        this.setTransform(x, y);
        this.updateVertexPoints();
    }

    rotateEntity(rotation) {
        this.setTransform(this.position.x, this.position.y, this.scale.x, this.scale.y, rotation);
        this.setTransform(this.position.x, this.position.y, this.scale.x, this.scale.y, rotation);
    }

    scaleEntity(scaleX, scaleY) {
        this.setTransform(this.position.x, this.position.y, scaleX, scaleY, this.rotation);
    }

    onDragStart(event) {
        this.parent.setSelectedEntityName(this.name);
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;

        this.offX = this.x - this.data.getLocalPosition(this.parent).x;
        this.offY = this.y - this.data.getLocalPosition(this.parent).y;
    }

    onDragEnd() {
        this.parent.setSelectedEntityName(this.name);
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
    }

    onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x + this.offX;
            this.y = newPosition.y + this.offY;
            this.updateVertexPoints();
            this.snapToEdge(this.parent.snapDistance);
            this.snapToVertex(this.parent.snapDistance);
        }
    }
}
