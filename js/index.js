import GameBoard from './gameboard.js';
import Player from './player.js';

document.addEventListener('DOMContentLoaded', () => {
    const difficultySelect = document.getElementById('difficulty');
    const boardElement = document.getElementById('board');
    const treasuresFoundElement = document.getElementById('treasuresFound');
    let gameBoard = null;
    let player = null;
    let enemyMovementInterval = null;
    let intervalMs = 1000;

    const startGame = () => {
        // Clear the board
        boardElement.innerHTML = '';

        // Clear the existing interval if any
        if (enemyMovementInterval) {
            clearInterval(enemyMovementInterval);
        }

        // Get the selected difficulty
        const difficulty = difficultySelect.value;

        // Set game difficulty
        switch (difficulty) {
            case 'easy':
                gameBoard = new GameBoard(10, 5, 2, 1);
                intervalMs = 1000;
                break;
            case 'medium':
                gameBoard = new GameBoard(12, 7, 4, 3);
                intervalMs = 500;
                break;
            case 'hard':
                gameBoard = new GameBoard(12, 10, 6, 6);
                intervalMs = 250;
                break;
            default:
                gameBoard = new GameBoard(10, 5, 2, 1);
                intervalMs = 1000;
        }

        // Initialize player
        player = new Player(0, 0, gameBoard);

        // Add entities to the game board
        gameBoard.addEnemies();
        gameBoard.addWalls();
        gameBoard.addTreasures();

        // Spawn the player
        player.spawn();

        // Draw the board
        gameBoard.drawBoard();

        // Print default value treasures found
        treasuresFoundElement.innerText = player.treasuresFound;

        // Move enemies at the specified interval
        enemyMovementInterval = setInterval(() => {
            gameBoard.moveEnemies();
        }, intervalMs);
    };

    // Event listener for switching difficulty
    difficultySelect.addEventListener('change', () => {
        localStorage.setItem('difficulty', difficultySelect.value);
        startGame();
        difficultySelect.blur();
    });

    // Get the difficulty from local storage
    const savedDifficulty = localStorage.getItem('difficulty');
    if (savedDifficulty) {
        difficultySelect.value = savedDifficulty;
    }

    // Start the game with the saved or default difficulty
    startGame();

    // Event listener for keydown events
    document.addEventListener('keydown', (event) => {
        if (player) {
            switch (event.key) {
                case 'ArrowUp':
                    player.move(-1, 0); // Move up
                    break;
                case 'ArrowDown':
                    player.move(1, 0); // Move down
                    break;
                case 'ArrowLeft':
                    player.move(0, -1); // Move left
                    break;
                case 'ArrowRight':
                    player.move(0, 1); // Move right
                    break;
            }
        }
    });
});