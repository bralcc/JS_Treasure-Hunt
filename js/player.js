import Grass from './grass.js';

class Player {
    constructor(x, y, gameBoard) {
        this.x = x;
        this.y = y;
        this.type = 'player';
        this.treasuresFound = 0;
        this.gameBoard = gameBoard;
    }

    setCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }

    getCoordinates() {
        return { x: this.x, y: this.y };
    }

    getType() {
        return this.type;
    }

    updateTreasuresFound() {
        this.treasuresFound++;

        // Print treasures found
        const treasuresFoundElement = document.getElementById('treasuresFound');
        treasuresFoundElement.innerText = this.treasuresFound;
    }

    spawn() {
        this.gameBoard.setCell(0, 0, this);
    }

    updatePosition(x, y) {
        this.gameBoard.setCell(this.x, this.y, new Grass(this.x, this.y));
        this.x = x;
        this.y = y;
        this.gameBoard.setCell(this.x, this.y, this);
        this.gameBoard.drawBoard();
    }

    move(x, y) {
        const newX = this.x + x;
        const newY = this.y + y;
        

        if (this.gameBoard.isValidCoordinate(newX, newY)) {
            const cell = this.gameBoard.getCell(newX, newY);

            switch (cell.getType()) {
                case 'grass':
                    this.updatePosition(newX, newY);
                    break;
                case 'wall':
                    break;
                case 'treasure':
                    this.updatePosition(newX, newY);
                    this.updateTreasuresFound();
                    // Check to see if all treasures have been found
                    if (this.treasuresFound === this.gameBoard.treasureCount) {
                        alert('You won!');
                        window.location.reload();
                    }

                    // If not all treasures have been found, continue the game
                    this.gameBoard.drawBoard();
                    break;
                case 'enemy':
                    alert('Game over!');
                    this.reset();
                    this.gameBoard.reset();
                    window.location.reload();
                    break;
            }
        }
    }

    reset() {
        this.setCoordinates(0, 0);
        this.treasuresFound = 0;
    }
}

export default Player;