//Collision detection between two entities
export function detectCollision(first, second) {
    const bounds_1 = first.getBounds();
    const bounds_2 = second.getBounds();

    return bounds_1.x < bounds_2.x + bounds_2.width
        && bounds_1.x + bounds_1.width > bounds_2.x
        && bounds_1.y < bounds_2.y + bounds_2.height
        && bounds_1.y + bounds_1.height > bounds_2.y;
};

export function impulseResponse(first, second){
    
}