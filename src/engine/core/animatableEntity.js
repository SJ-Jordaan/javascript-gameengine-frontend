import { BaseEntity, EntityType } from "./baseEntity";
import {detectCollision} from "../physics/physicsEngine";

export class AnimatableEntity extends BaseEntity {
    constructor(texture, name) {
        super(texture, name);
        this.anchor.set(0.5);
        this.mass = 0;
        this.acceleration = 0;

        this.onSurface = this.onSurface.bind(this);
    }

    onSurface(){
        let onSurface = false;
        if(this.type === EntityType.surface){
            onSurface = true;
        }

        let siblings = this.getSiblings();
        siblings.forEach(sibling => {
            if(sibling.type === EntityType.surface){
                if(detectCollision(this, sibling)){
                    onSurface = true
                }
            }
        });

        return onSurface;
    }
}