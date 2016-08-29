// @see https://github.com/dkozar/edriven-gui/blob/master/eDriven/eDriven.Core/Geom/Point.cs

export default class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Point(this.x + other.x, this.y + other.y);
    }

    subtract(other) {
        return new Point(this.x - other.x, this.y - other.y);
    }

    toObject() {
        return {
            x: this.x,
            y: this.y
        }
    }

    static fromObject(obj) {
        return new Point(obj.x, obj.y);
    }
}