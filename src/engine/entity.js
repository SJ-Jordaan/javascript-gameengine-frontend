export class Entity extends PIXI.Sprite{
    constructor(filePath, x = 0, y = 0){
        const texture = PIXI.Texture.from(filePath);
        super(texture);
        this.x = x;
        this.y = y;
        this.interactive = true;
        this.buttonMode = true;
        this.anchor.set(0.5);
        this.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
    }

    onDragStart(event){
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    onDragEnd(){
        this.alpha = 1;
        this.dragging = false;
        this.data = null;
    }

    onDragMove(){
        if(this.dragging){
            const newPosition = this.data.getLocalPosition(this.parent);
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }
}