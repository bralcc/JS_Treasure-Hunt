# Treasure Hunt Game

Welcome to the Treasure Hunt Game! This is a simple browser-based game where players navigate a game board to find treasures while avoiding enemies and walls. This is made purely in JavaScript to learn the basics of the language.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [Contributing](#contributing)
- [License](#license)

## Project Structure (V1)

### JavaScript Files

- **character.js**: Defines the base `Character` class.
- **enemy.js**: Defines the `Enemy` class.
- **gameboard.js**: Manages the game board and its cells.
- **grass.js**: Defines the `Grass` class, representing empty cells.
- **index.js**: Entry point for the game logic.
- **player.js**: Defines the `Player` class.
- **treasure.js**: Defines the `Treasure` class.
- **wall.js**: Defines the `Wall` class.

### Other Files

- **index.html**: The main HTML file that sets up the game interface.
- **style.css**: Contains the styles for the game.
- **test.txt**: Placeholder file.

## Usage

1. Open `index.html` in your IDE (e.g: VSCode) with the plug-in Live Server.
2. Use the arrow keys to move the player around the game board.
3. Select the difficulty level from the dropdown menu.

## Game Rules

- **Objective**: Find all the treasures on the game board.
- **Player**: Represented by a blue cell.
- **Enemies**: Represented by red cells. If an enemy moves to the player's cell, the game is over.
- **Treasures**: Represented by yellow cells. Collect them to increase your score.
- **Walls**: Represented by black cells. They block the player's movement.
- **Grass**: Represented by dark cells. They are empty cells where the player can move.

- ## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature-name
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m 'Add some feature'
    ```
4. Push to the branch:
    ```sh
    git push origin feature-name
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

Enjoy the game and happy treasure hunting!
