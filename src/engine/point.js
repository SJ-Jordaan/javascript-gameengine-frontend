export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.distanceTo = this.distanceTo.bind(this);
    }

    distanceTo(otherPoint) {
        return Math.sqrt(Math.pow(this.x - otherPoint.x, 2) + Math.pow(this.y - otherPoint.y, 2));
    }
};