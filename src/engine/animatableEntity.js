import { BaseEntity } from "./baseEntity";
import Point from "./point";
export class AnimatableEntity extends BaseEntity {
    constructor(texture, x = 0, y = 0) {
        super(texture);
        this.setTransform(x, y);
        this.anchor.set(0.5);
        this.on('pointermove', this.onDragMove);
        this.vertexPoints = {
            topLeft: new Point(this.x, this.y),
            topRight: new Point(this.x + this.getBounds().width, this.y),
            bottomLeft: new Point(this.x, this.y + this.getBounds().height),
            bottomRight: new Point(this.x + this.getBounds().width, this.y + this.getBounds().height)
        };

        //Methods
        this.updateVertexPoints = this.updateVertexPoints.bind(this);
        this.snapToEdge = this.snapToEdge.bind(this);
        this.snapToVertex = this.snapToVertex.bind(this);
        this.onDragMove = this.onDragMove.bind(this);
    }

    updateVertexPoints() {
        this.vertexPoints = {
            topLeft: new Point(this.x, this.y),
            topRight: new Point(this.x + this.getBounds().width, this.y),
            bottomLeft: new Point(this.x, this.y + this.getBounds().height),
            bottomRight: new Point(this.x + this.getBounds().width, this.y + this.getBounds().height)
        };
    }

    snapToEdge(snapDistance) {
        if (this.parent.edgeSnap === true) {
            let siblings = this.parent.children.filter(element => {
                return element.x !== this.x && element.y !== this.y;
            });

            siblings.forEach(sibling => {
                if (sibling instanceof AnimatableEntity) {
                    if (Math.abs(this.getBounds().top - sibling.getBounds().bottom) < snapDistance &&
                        this.x <= sibling.getBounds().right && this.x >= sibling.getBounds().left) {
                        this.x = sibling.x;
                        this.y = sibling.y + sibling.getBounds().height;
                    }
                    else if (Math.abs(this.getBounds().bottom - sibling.getBounds().top) < snapDistance &&
                        this.x <= sibling.getBounds().right && this.x >= sibling.getBounds().left) {
                        this.x = sibling.x;
                        this.y += Math.abs(this.getBounds().bottom - sibling.getBounds().top);
                    }
                    else if (Math.abs(this.getBounds().right - sibling.getBounds().left) < snapDistance &&
                        this.y <= sibling.getBounds().bottom && this.y >= sibling.getBounds().top) {
                        this.y = sibling.y;
                        this.x += Math.abs(this.getBounds().right - sibling.getBounds().left);
                    }
                    else if (Math.abs(this.getBounds().left - sibling.getBounds().right) < snapDistance &&
                        this.y <= sibling.getBounds().bottom && this.y >= sibling.getBounds().top) {
                        this.y = sibling.y;
                        this.x = sibling.x + sibling.getBounds().width;
                    }
                }
            });
        };
    }

    snapToVertex(snapDistance) {
        if (this.parent.vertexSnap === true) {
            let siblings = this.parent.children.filter(element => {
                return element.x !== this.x && element.y !== this.y;
            });

            siblings.forEach(sibling => {
                if(sibling instanceof AnimatableEntity){
                    if (this.vertexPoints.topLeft.distanceTo(sibling.vertexPoints.bottomRight) <= snapDistance) {
                        this.x = sibling.x + sibling.getBounds().width;
                        this.y = sibling.y + sibling.getBounds().height;
                    }
                    else if (this.vertexPoints.topRight.distanceTo(sibling.vertexPoints.bottomLeft) <= snapDistance) {
                        this.x = sibling.x - this.getBounds().width;
                        this.y = sibling.y + this.getBounds().height;
                    }
                    else if (this.vertexPoints.bottomRight.distanceTo(sibling.vertexPoints.topLeft) <= snapDistance) {
                        this.x = sibling.x - this.getBounds().width;
                        this.y = sibling.y - this.getBounds().height;
                    }
                    else if (this.vertexPoints.bottomLeft.distanceTo(sibling.vertexPoints.topRight) <= snapDistance) {
                        this.x = sibling.x + sibling.getBounds().width;
                        this.y = sibling.y - this.getBounds().height;
                    }
                }
            });
        }
    }

    //Pointer Events
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