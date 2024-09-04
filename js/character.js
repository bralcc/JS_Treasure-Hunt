class Character {
    static PLAYER_TYPES = {
        player: 'player',
        enemy: 'enemy',
    };

    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = this.setType(type);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
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

    setType(type) {
        if (!Object.values(Character.PLAYER_TYPES).includes(type)) {
            throw new Error('Invalid character type');
        }
        this.type = type;
    }

    getType() {
        return this.type;
    }

    moveRandom() {
        const directions = ['up', 'down', 'left', 'right'];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        let x = this.x;
        let y = this.y;
        switch (randomDirection) {
            case 'up':
                x--;
                break;
            case 'down':
                x++;
                break;
            case 'left':
                y--;
                break;
            case 'right':
                y++;
                break;
        }
        this.setCoordinates(x, y);
    }

    move() {
        // Move the player
        document.addEventListener('keydown', (event) => {
            let x = this.x;
            let y = this.y;
            switch (event.key) {
                case 'ArrowUp':
                    x--;
                    break;
                case 'ArrowDown':
                    x++;
                    break;
                case 'ArrowLeft':
                    y--;
                    break;
                case 'ArrowRight':
                    y++;
                    break;
            }
            if (gameBoard.isValidMove(x, y)) {
                gameBoard.updateBoard(this.x, this.y, x, y, this);
                this.setCoordinates(x, y);
            }
        });
    }
}

export default Character;