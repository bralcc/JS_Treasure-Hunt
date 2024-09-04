import Grass from './grass.js';

class Enemy {
    constructor(x, y, gameBoard) {
        this.x = x;
        this.y = y;
        this.gameBoard = gameBoard;
        this.type = 'enemy';
    }

    getType() {
        return this.type;
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

    updatePosition(x, y) {
        this.gameBoard.setCell(this.x, this.y, new Grass(this.x, this.y));
        this.x = x;
        this.y = y;
        this.gameBoard.setCell(this.x, this.y, this);
        this.gameBoard.drawBoard();
    }

    moveRandom() {
        const direction = Math.floor(Math.random() * 4);
        let newX = this.x;
        let newY = this.y;

        switch (direction) {
            case 0:
                if (this.x > 0) {
                    newX--;
                }
                break;
            case 1:
                if (this.x < this.gameBoard.size - 1) {
                    newX++;
                }
                break;
            case 2:
                if (this.y > 0) {
                    newY--;
                }
                break;
            case 3:
                if (this.y < this.gameBoard.size - 1) {
                    newY++;
                }
                break;
        }

        // Check if the new cell is occupied by another entity
        if (this.gameBoard.getCell(newX, newY).getType() === 'grass') {
            // Update the game board to reflect the enemy's new position
            this.updatePosition(newX, newY);
        } else if (this.gameBoard.getCell(newX, newY).getType() === 'player') {
            // If the new cell is occupied by the player, end the game
            alert('Game over!');
            window.location.reload();
        }
    }
}

export default Enemy;