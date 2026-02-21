

// fork from https://github.com/SanjaiG2003/2048-game/blob/main/2048_Game/2048.js
// ai prompt: make it into OOP
// ai prompt: add jsdoc comments everywhere
// ai prompt: separate logic from UI

/**
 * Game2048 Class - Handles core game logic and primitive UI updates.
 * @constructor
 */
function Game2048() {
    /** @type {number[][]|null} */
    this.board = null;
    /** @type {number} */
    this.score = 0;
    /** @type {number} */
    this.rows = 4;
    /** @type {number} */
    this.columns = 4;

    this.setGame();
}

/**
 * Game2048UI Class - Handles UI updates for the game.
 * @constructor
 * @param {HTMLElement} boardEl - The board element.
 */
function Game2048UI(boardEl) {
    if (!(this instanceof Game2048UI)) return new Game2048UI(boardEl);
    /** @type {HTMLElement} */
    this.boardEl = boardEl;
    /** @type {Game2048} */
    this.game = new Game2048();
    this.render();
}

document.addEventListener("load", () => {
    let boardEl = document.getElementById("board");
    let game2048UI = new Game2048UI(boardEl);
});

/**
 * Renders the game board and tiles.
 * @returns {void}
 */
Game2048UI.prototype.render = function() {
    this.boardEl.innerHTML = "";
    let rows = this.game.rows;
    let columns = this.game.columns;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            this.boardEl.append(tile);
            this.updateTile(tile, this.game.board[r][c]);
        }
    }

    if (this.game.checkWin()) {
        alert("🎉 Congratulations! You reached 2048! 🎉");
    } else if (this.game.isGameOver()) {
        alert("💀 Game Over!");
    }
}

/**
 * Initializes the game board and DOM elements.
 * @returns {Game2048}
 */
Game2048.prototype.setGame = function() {
    this.board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    this.setTwo();
    this.setTwo();
}

/**
 * Checks if there is at least one empty tile on the board.
 * @returns {boolean} True if an empty tile exists.
 */
Game2048.prototype.hasEmptyTile = function() {
    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
            if (this.board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Spawns a '2' tile in a random empty cell.
 * @returns {void}
 */
Game2048.prototype.setTwo = function() {
    if (!this.hasEmptyTile()) return;

    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * this.rows);
        let c = Math.floor(Math.random() * this.columns);

        if (this.board[r][c] == 0) {
            this.board[r][c] = 2;
            found = true;
        }
    }
}

/**
 * Updates the visual representation of a tile.
 * @param {HTMLElement} tile - The tile DOM element.
 * @param {number} num - The value to display.
 * @returns {void}
 */
Game2048UI.prototype.updateTile = function(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

/** @type {Game2048UI} */
var game2048UI;
/** @type {Game2048} */
var game2048;
window.onload = function() {
    let boardEl = document.getElementById("board");
    game2048UI = new Game2048UI(boardEl);
    game2048 = game2048UI.game;
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        game2048.slideLeft();
        game2048.setTwo();
        game2048UI.render();
    } else if (e.code == "ArrowRight") {
        game2048.slideRight();
        game2048.setTwo();
        game2048UI.render();
    } else if (e.code == "ArrowUp") {
        game2048.slideUp();
        game2048.setTwo();
        game2048UI.render();
    } else if (e.code == "ArrowDown") {
        game2048.slideDown();
        game2048.setTwo();
        game2048UI.render();
    }
    document.getElementById("score").innerText = game2048.score;
});

/**
 * Removes zeros from a row array.
 * @param {number[]} row - Array of numbers.
 * @returns {number[]} Array without zeros.
 */
Game2048.prototype.filterZero = function(row) {
    return row.filter(num => num != 0);
}

/**
 * Slides and merges a single row or column.
 * @param {number[]} row - Array representing a row/column.
 * @returns {number[]} The processed array.
 */
Game2048.prototype.slide = function(row) {
    row = this.filterZero(row);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            this.score += row[i];
        }
    }
    row = this.filterZero(row);

    while (row.length < this.columns) {
        row.push(0);
    }
    return row;
}

/**
 * Handles sliding logic for the Left direction.
 * @returns {void}
 */
Game2048.prototype.slideLeft = function() {
    for (let r = 0; r < this.rows; r++) {
        let row = this.board[r];
        row = this.slide(row);
        this.board[r] = row;
    }
}

/**
 * Handles sliding logic for the Right direction.
 * @returns {void}
 */
Game2048.prototype.slideRight = function() {
    for (let r = 0; r < this.rows; r++) {
        let row = this.board[r];
        row.reverse();
        row = this.slide(row);
        row.reverse();
        this.board[r] = row;
    }
}

/**
 * Handles sliding logic for the Up direction.
 * @returns {void}
 */
Game2048.prototype.slideUp = function() {
    for (let c = 0; c < this.columns; c++) {
        let row = [this.board[0][c], this.board[1][c], this.board[2][c], this.board[3][c]];
        row = this.slide(row);

        for (let r = 0; r < this.rows; r++) {
            this.board[r][c] = row[r];
        }
    }
}

/**
 * Handles sliding logic for the Down direction.
 * @returns {void}
 */
Game2048.prototype.slideDown = function() {
    for (let c = 0; c < this.columns; c++) {
        let row = [this.board[0][c], this.board[1][c], this.board[2][c], this.board[3][c]];
        row.reverse();
        row = this.slide(row);
        row.reverse();

        for (let r = 0; r < this.rows; r++) {
            this.board[r][c] = row[r];
        }
    }
}

/**
 * Checks if no more moves are possible (board is full and no adjacent matches).
 * @returns {boolean} True if the game is over.
 */
Game2048.prototype.isGameOver = function() {
    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
            if (this.board[r][c] === 0) {
                return false;
            }
        }
    }

    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns - 1; c++) {
            if (this.board[r][c] === this.board[r][c + 1]) {
                return false;
            }
        }
    }

    for (let r = 0; r < this.rows - 1; r++) {
        for (let c = 0; c < this.columns; c++) {
            if (this.board[r][c] === this.board[r + 1][c]) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Checks if any tile on the board has reached the value 2048.
 * @returns {boolean} True if user won.
 */
Game2048.prototype.checkWin = function() {
    for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.columns; c++) {
            if (this.board[r][c] === 2048) {
                return true;
            }
        }
    }
    return false;
}
