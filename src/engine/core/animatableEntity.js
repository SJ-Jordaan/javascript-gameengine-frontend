import { BaseEntity } from "./baseEntity";

export class AnimatableEntity extends BaseEntity {
    constructor(texture, name, x = 0, y = 0) {
        super(texture, name);
        this.setTransform(x, y);
        this.anchor.set(0.5);

        //Physics Properties (Should be configurable)
        this.mass = 0;
        this.acceleration = 0;
    }
}