/**
 * Pure game logic for 2048.
 */
class Game2048 {
	/**
	 * @param {number} rows - Rows count.
	 * @param {number} cols - Columns count.
	 * @param {function(): number} getNewTileValue - Function returning 2 or 4.
	 */
	constructor(rows = 4, cols = 4, getNewTileValue = () => Math.random() < 0.9 ? 2 : 4) {
		this.rows = rows;
		this.columns = cols;
		this.getNewTileValue = getNewTileValue;

		/** @type {(number|null)[][]} */
		this.board = [];
		this.score = 0;
		this.init();
	}

	/**
	 * Initializes the board with empty cells and starting tiles.
	 */
	init() {
		this.board = Array.from({ length: this.rows }, () => new Array(this.columns).fill(null));
		this.score = 0;
		this.addTile();
		this.addTile();
	}

	/**
	 * Adds a new tile (2 or 4) to a random empty cell.
	 * @returns {boolean} Whether a tile was added.
	 */
	addTile() {
		let empty = [];
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.columns; c++) {
				if (this.board[r][c] === null) empty.push({r, c});
			}
		}
		if (empty.length === 0) return false;
		const pos = empty[Math.floor(Math.random() * empty.length)];
		this.board[pos.r][pos.c] = this.getNewTileValue();
		return true;
	}

	/**
	 * Internal helper to slide and merge a single line.
	 * @param {(number|null)[]} line - Array of values.
	 * @returns {(number|null)[]} Processed line.
	 */
	slideLine(line) {
		let values = line.filter(v => v !== null);
		for (let i = 0; i < values.length - 1; i++) {
			if (values[i] === values[i + 1]) {
				values[i] *= 2;
				this.score += values[i];
				values[i + 1] = null;
				i++;
			}
		}
		values = values.filter(v => v !== null);
		while (values.length < this.columns) {
			values.push(null);
		}
		return values;
	}

	/**
	 * Moves tiles in the specified direction.
	 * @param {number} dx - -1 (left), 1 (right).
	 * @param {number} dy - -1 (up), 1 (down).
	 * @returns {boolean} Whether the board changed.
	 */
	move(dx, dy) {
		const oldBoard = JSON.stringify(this.board);
		const newBoard = Array.from({ length: this.rows }, () => new Array(this.columns).fill(null));

		if (dx !== 0) {
			for (let r = 0; r < this.rows; r++) {
				let line = [];
				for (let c = 0; c < this.columns; c++) {
					let colIdx = dx === 1 ? (this.columns - 1 - c) : c;
					line.push(this.board[r][colIdx]);
				}
				let processed = this.slideLine(line);
				if (dx === 1) processed.reverse();
				for (let c = 0; c < this.columns; c++) {
					newBoard[r][c] = processed[c];
				}
			}
		} else {
			for (let c = 0; c < this.columns; c++) {
				let line = [];
				for (let r = 0; r < this.rows; r++) {
					let rowIdx = dy === 1 ? (this.rows - 1 - r) : r;
					line.push(this.board[rowIdx][c]);
				}
				let processed = this.slideLine(line);
				if (dy === 1) processed.reverse();
				for (let r = 0; r < this.rows; r++) {
					newBoard[r][c] = processed[r];
				}
			}
		}

		this.board = newBoard;
		const moved = oldBoard !== JSON.stringify(this.board);
		if (moved) this.addTile();
		return moved;
	}

	/**
	 * Checks if any moves are possible.
	 * @returns {boolean}
	 */
	canMove() {
		for (let r = 0; r < this.rows; r++) {
			for (let c = 0; c < this.columns; c++) {
				if (this.board[r][c] === null) return true;
				if (c < this.columns - 1 && this.board[r][c] === this.board[r][c + 1]) return true;
				if (r < this.rows - 1 && this.board[r][c] === this.board[r + 1][c]) return true;
			}
		}
		return false;
	}

	/**
	 * Checks if 2048 has been reached.
	 * @returns {boolean}
	 */
	checkWin() {
		return this.board.some(row => row.some(v => v === 2048));
	}
}

/**
 * UI Controller for 2048.
 */
class Game2048UI {
	/**
	 * @param {HTMLElement} element - Board container.
	 */
	constructor(element) {
		this.boardElement = element;
		this.game = new Game2048();
		this.touchStartX = 0;
		this.touchStartY = 0;
		this.render();
		this.setupEventListeners();
	}

	/**
	 * Renders the game board.
	 */
	render() {
		if (!this.boardElement) return;
		this.boardElement.innerHTML = '';
		for (let i = 0; i < this.game.rows * this.game.columns; i++) {
			const cell = document.createElement('div');
			cell.className = 'cell';
			this.boardElement.appendChild(cell);
		}

		for (let r = 0; r < this.game.rows; r++) {
			for (let c = 0; c < this.game.columns; c++) {
				const val = this.game.board[r][c];
				if (val !== null) {
					const el = document.createElement('div');
					el.className = 'tile';
					el.setAttribute('data-val', val.toString());
					el.textContent = val.toString();
					
					// Assign a unique name to each grid cell to allow smooth cross-fades // animation
					el.style.viewTransitionName = `tile-${r}-${c}`; // animation
					
					const index = r * this.game.columns + c;
					this.boardElement.children[index].appendChild(el);
				}
			}
		}

		if (this.game.checkWin()) setTimeout(() => alert("🎉 Win!"), 300);
		else if (!this.game.canMove()) setTimeout(() => alert("💀 Game Over!"), 300);
	}

	/**
	 * Handles move calls and triggers render.
	 */
	handleMove(dx, dy) {
		if (document.startViewTransition) { // animation
			document.startViewTransition(() => { // animation
				const moved = this.game.move(dx, dy); // animation
				if (moved) this.render(); // animation
			}); // animation
		} else { // animation
			const moved = this.game.move(dx, dy); // animation
			if (moved) this.render(); // animation
		} // animation
	}

	setupEventListeners() {
		window.addEventListener('keydown', e => {
			const dir = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
			if (dir) { e.preventDefault(); this.handleMove(dir[0], dir[1]); }
		});
		window.addEventListener('touchstart', e => { this.touchStartX = e.touches[0].clientX; this.touchStartY = e.touches[0].clientY; }, { passive: true });
		window.addEventListener('touchend', e => {
			const dx = e.changedTouches[0].clientX - this.touchStartX;
			const dy = e.changedTouches[0].clientY - this.touchStartY;
			if (Math.abs(dx) > Math.abs(dy)) {
				if (Math.abs(dx) > 30) this.handleMove(dx > 0 ? 1 : -1, 0);
			} else {
				if (Math.abs(dy) > 30) this.handleMove(0, dy > 0 ? 1 : -1);
			}
		});
	}
}

window.game2048UI = new Game2048UI(document.getElementById('board'));
window.game2048 = window.game2048UI.game;