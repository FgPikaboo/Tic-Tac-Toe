import { I18n } from "./constantes/I18n.mjs"

/**
 * Manages the core game state and logic behind the scenes.
 */
export class TicTacToe_Game {

	/**
	 * Enumeration of possible game lifecycle states.
	 * @enum {number}
	 */
	static STATUS = {
		P1: 1,
		P2: 2,
		ENDED: 3
	}

	/**
	 * Enumeration of possible match outcomes (Winners / Draw).
	 * @enum {number}
	 */
	static WINNER = {
		P1: 1,
		P2: 2,
		DRAW: 3
	}

	/**
	 * Enumeration of player visual symbols.
	 * @enum {string}
	 */
	static SYMBOLE_PLAYER = {
		P1: 'X',
		P2: 'O'
	}

	constructor() {
		/**
		 * Current turn or state of the match (Player 1 turn, Player 2 turn, or finished).
		 * @type {number}
		 */
		this.status

		/**
		 * Final match result or winner.
		 * @type {number|null}
		 */
		this.winner = null

		/**
		 * Array representing the state of all 9 board slots in the grid.
		 * @type {Array<string>}
		 */
		this.value_grid = [ 
			'', '', '',
			'', '', '',
			'', '', ''
		]
	}

	/**
	 * Returns a shallow copy of the current grid state to prevent direct mutation.
	 * @returns {string[]} A shallow copy of the board array.
	 */
	getValueGrid() { 
		return [...this.value_grid] 
	}

	/**
	 * Retrieves the current game lifecycle status.
	 * @returns {number} The active status code.
	 */
	getStatus() {
		return this.status
	}

	/**
	 * Retrieves the match winner or outcome status.
	 * @returns {number|null} Winner status identifier, or `null` if the game is still active.
	 */
	getWinner() {
		return this.winner
	}

	/**
	 * Resets the board array by clearing all cell values.
	 */
	resetValueGrid() {
		this.value_grid.fill('')
	}

	/**
	 * Initializes and starts a new game session.
	 */
	startGame() {
		this.setFirstPlayer()
	}

	/**
	 * Determines which player starts the game.
	 * If a winner exists from the previous match, priority goes to the opponent; otherwise, chooses randomly.
	 * @param {number|null} [winner] - The winner of the previous game (optional).
	 */
	setFirstPlayer(winner) {
		if (winner === TicTacToe_Game.STATUS.P1) {
			this.status = TicTacToe_Game.STATUS.P2
		} else if (winner === TicTacToe_Game.STATUS.P2) {
			this.status = TicTacToe_Game.STATUS.P1
		} else {
			this.status = Math.random() > 0.50 ? TicTacToe_Game.STATUS.P1 : TicTacToe_Game.STATUS.P2
		}
	}

	/**
	 * Places current player's symbol on target cell and advances turn sequence.
	 * @param {number} idx - Zero-based index of targeted board cell (0 to 8).
	 * @throws {Error} If index is out of bounds or targeted cell is already occupied.
	 */
	playCurrentTurn(idx) {
		if (idx > 8 || idx < 0) {
			throw new Error(I18n.ERROR_IDX(idx))
		}
		if (this.value_grid[idx] !== '') {
			throw new Error(I18n.ERROR_SAME_SEIZURE)
		}
		if (this.status === TicTacToe_Game.STATUS.P1) {
			this.value_grid[idx] = TicTacToe_Game.SYMBOLE_PLAYER.P1
		} else {
			this.value_grid[idx] = TicTacToe_Game.SYMBOLE_PLAYER.P2
		}
		this._checkWinCondition()
		if (!(this.status === TicTacToe_Game.STATUS.ENDED)) {
			if (this.status === TicTacToe_Game.STATUS.P1) {
				this.status = TicTacToe_Game.STATUS.P2
			} else {
				this.status = TicTacToe_Game.STATUS.P1
			}
		}
	}

	/**
	 * Evaluates the board state to check for win conditions or draw scenarios.
	 * Updates instance status and winner properties directly upon finding a result.
	 * @private
	 */
	_checkWinCondition() {
		const isFull = (array) => !array.some((element) => element === '')
		if (isFull(this.value_grid)) {
			this.winner = TicTacToe_Game.WINNER.DRAW
			this.status = TicTacToe_Game.STATUS.ENDED
			return
		}
		const isDiagonalWin = (this.value_grid[0] === this.value_grid[4]) &&
			(this.value_grid[0] === this.value_grid[8]) && 
			this.value_grid[0] !== ''
		const isOtherDiagonalWin = (this.value_grid[2] === this.value_grid[4]) && 
			(this.value_grid[2] === this.value_grid[6]) && 
			this.value_grid[2] !== ''
		if (isDiagonalWin || isOtherDiagonalWin) {
			this.winner = this.status
			this.status = TicTacToe_Game.STATUS.ENDED
			return
		} 
		for (let n = 0; n < this.value_grid.length; n++) {
			const isHorizontalWin = (n < this.value_grid.length - 2) && 
				(n % 3 === 0) && 
				(this.value_grid[n] === this.value_grid[n + 1]) && 
				(this.value_grid[n] === this.value_grid[n + 2]) &&
				this.value_grid[n] !== ''
			const isVerticalWin = (n < this.value_grid.length - 6) && 
				(n % 3 === n) && 
				(this.value_grid[n] === this.value_grid[n + 3]) && 
				(this.value_grid[n] === this.value_grid[n + 6]) &&
				this.value_grid[n] !== ''
			if (isHorizontalWin || isVerticalWin) {
				this.winner = this.status
				this.status = TicTacToe_Game.STATUS.ENDED
				return
			}
		}
	}
}