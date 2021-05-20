import { EntityType } from "../core/baseEntity";

//Collision detection between two entities
export function detectCollision(first, second) {
    const bounds_1 = first.getBounds();
    const bounds_2 = second.getBounds();

    return bounds_1.x < bounds_2.x + bounds_2.width
        && bounds_1.x + bounds_1.width > bounds_2.x
        && bounds_1.y < bounds_2.y + bounds_2.height
        && bounds_1.y + bounds_1.height > bounds_2.y;
};

export function impulseResponse(first, second) {

}

export function freeFall(rigidBody, delta) {
    if (rigidBody.onSurface() === false) {
        if (rigidBody.y + rigidBody.width / 2 < rigidBody.parent._height) {
            rigidBody.y = rigidBody.y + 1 / 2 * rigidBody.parent.gravity * Math.pow(delta, 2);
        }
    }
}