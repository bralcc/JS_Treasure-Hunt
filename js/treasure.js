class Treasure {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = 'treasure';
    }

    getCoordinates() {
        return { x: this.x, y: this.y };
    }

    setCoordinates(x, y) {
        if (x < 0 || y < 0) {
            throw new Error('Coordinates must be non-negative');
        }
        this.x = x;
        this.y = y;
    }

    getType() {
        return this.type;
    }    
}

export default Treasure;