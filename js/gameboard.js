import Grass from './grass.js';
import Wall from './wall.js';
import Treasure from './treasure.js';
import Enemy from './enemy.js';

class GameBoard {
    constructor(boardSize, wallCount, treasureCount, enemyCount) {
        this.size = boardSize;
        this.wallCount = wallCount;
        this.treasureCount = treasureCount;
        this.enemyCount = enemyCount;
        this.boardArray = [];
        this.enemiesArray = [];
        this.initBoardArray();
    }

    initBoardArray() {
        for (let i = 0; i < this.size; i++) {
            this.boardArray.push([]);
            for (let j = 0; j < this.size; j++) {
                this.boardArray[i].push(new Grass(i, j));
            }
        }
    }

    setCell(x, y, value) {
        if (this.isValidCoordinate(x, y)) {
            this.boardArray[x][y] =value;
        } else {
            throw new Error('Invalid coordinates');
        }
    }

    getCell(x, y) {
        if (this.isValidCoordinate(x, y)) {
            return this.boardArray[x][y];
        } else {
            throw new Error('Invalid coordinates');
        }
    }

    isValidCoordinate(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    generateRandomCoordinates() {
        return {
            x: Math.floor(Math.random() * this.size),
            y: Math.floor(Math.random() * this.size),
        };
    }

    createCell(cell) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.classList.add(cell.getType());
        cellElement.dataset.x = cell.x;
        cellElement.dataset.y = cell.y;
        cellElement.style.gridRow = cell.x + 1;
        cellElement.style.gridColumn = cell.y + 1;
        return cellElement;
    }

    drawBoard() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const cellElement = this.createCell(this.boardArray[i][j]);
                fragment.appendChild(cellElement);
            }
        }
        document.getElementById('board').appendChild(fragment);
    }

    addWalls() {
        let placedWalls = 0;

        while (placedWalls < this.wallCount) {
            const { x, y } = this.generateRandomCoordinates();
            if (this.getCell(x, y).getType() === 'grass') {
                this.setCell(x, y, new Wall(x, y));
                placedWalls++;
            }
        }
    }

    addTreasures() {
        let placedTreasures = 0;

        while (placedTreasures < this.treasureCount) {
            const { x, y } = this.generateRandomCoordinates();
            if (this.getCell(x, y).getType() === 'grass') {
                this.setCell(x, y, new Treasure(x, y));
                placedTreasures++;
            }
        }
    }

    addEnemies() {
        let spawnedEnemies = 0;
        let enemies = [];
        while (spawnedEnemies < this.enemyCount) {
            let coordinates = this.generateRandomCoordinates();
            let x = coordinates.x;
            let y = coordinates.y;
            if (y === 0 && x === 0) {
                continue;
            }
            
            if (this.getCell(x, y).getType() === 'grass') {
                let enemy = new Enemy(x, y, this);
                this.enemiesArray.push(enemy);
                this.setCell(x, y, enemy); // Set the newly created enemy
                spawnedEnemies++;
            }
        }
    }

    moveEnemies() {        
        this.enemiesArray.forEach(enemy => enemy.moveRandom());
        this.drawBoard(); // Update the board after moving enemies
    }

    reset() {
        this.boardArray = [];
        this.enemiesArray = [];
        this.initBoardArray();
    }
}

export default GameBoard;