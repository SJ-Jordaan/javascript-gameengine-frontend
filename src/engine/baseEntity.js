export class BaseEntity extends PIXI.Sprite {
    constructor(texture) {
        super(texture);
        this.interactive = true;
        this.buttonMode = true;
        
        this.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragMove = this.onDragMove.bind(this);
    }

    onDragStart(event) {
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;

        this.offX = this.x - this.data.getLocalPosition(this.parent).x;
        this.offY = this.y - this.data.getLocalPosition(this.parent).y;
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
    }

    onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x + this.offX;
            this.y = newPosition.y + this.offY;
        }
    }
}