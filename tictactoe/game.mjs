export class TicTacToe_Game {
	
	static STATUS = {
		P1: 1,
		P2: 2,
		ENDED: 3
	}

	static WINNER = {
		P1: 1,
		P2: 2,
		DRAW: 3
	}

	static SYMBOLE_PLAYER = {
		P1: 'X',
		P2: 'O'
	}

	constructor() {
		/** @type {number} L'etat actuel du joueurs (P1 = 1, P2 = 2, ENDED = 3) */
		this.status
		/** @type {number} L'etat du vainqueur de la partie (P1 = 1, P2 = 2) */
		this.winner
		/** @type {Array<string>} Les valeurs de la grille du Tictactoe */
		this.value_grid = [ 
			'', '', '',
			'', '', '',
			'', '', ''
		]
	}

	getValueGrid() { // destructuration pour faire une copie d'un objet complexe (a voir wiki)
		return this.value_grid // Faire une copie quand tout remarcheras
	}

	getStatus() {
		return this.status
	}

	getWinner() {
		return this.winner
	}

	resetValueGrid() {
		this.value_grid.fill('')
	}

	/**
	 * Commence la partie
	 */
	startGame() {
		this.setFirstPlayer()
	}

	/** 
	 * Choisie aléatoirement ou par le joueur qui a perdu, par qui commence
	 * @returns {number} Le joueurs qui commence
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
	 * Mets le choix du joueur dans le tictactoe et change le joueur en cours si le jeu n'est pas terminer
	 * @param {number} idx Numero de la case du Tictactoe
	 */
	playCurrentTurn(idx) {
		if (idx > 8 || idx < 0) {
			throw new Error(`idx:(${idx}) dois etre entre 0 et 8`)
		}
		if (this.value_grid[idx] !== '') {
			throw new Error(`La valeur a deja etais saisie`)
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
	 * Verifie la condition de victoire
	 * @returns {undefined} Uniquement utiliser pour arreter la condition et eviter des calculs inutile
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