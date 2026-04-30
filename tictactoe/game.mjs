export class TicTacToe_Game {
	
	static STATUS = {
		P1: 0,
		P2: 1,
		ENDED: 2
	}

	static WINNER = {
		P1: 0,
		P2: 1
	}

	static SYMBOLE_PLAYER = {
		P1: 'O',
		P2: 'X'
	}

	constructor() {
		/** @type {number} L'etat actuel du joueurs (P1,P2,ENDED) */
		this.status
		/** @type {number} L'etat du vainqueur de la partie (P1,P2) */
		this.winner
		/** @type {Array<string>} Les valeurs de la grille du Tictactoe (a voir si un tableau de number est mieux) */
		this.value_grid = [ 
			'', '', '',
			'', '', '',
			'', '', ''
		]
	}

	getValueGrid() { // destructuration pour faire une copie d'un objet complexe (a voir wiki)
		return this.value_grid // Faire une copie quand tout remarcheras
	}

	/**
	 * Commence la partie
	 */
	startGame() {
		this.setFirstPlayer()
		this.setChoice(0)
	}

	/** 
	 * Choisie aléatoirement ou par le joueur qui a perdu, par qui commence
	 * @returns {number} Le joueurs qui commence
	 */
	setFirstPlayer() {
		if (this.winner === TicTacToe_Game.STATUS.P1) {
			this.status = TicTacToe_Game.STATUS.P2
		} else if (this.winner === TicTacToe_Game.STATUS.P2) {
			this.status = TicTacToe_Game.STATUS.P1
		} else {
			this.status = Math.random() > 0.50 ? TicTacToe_Game.STATUS.P1 : TicTacToe_Game.STATUS.P2
		}
	}

	/** 
	 * Mets le choix du joueur dans le tictactoe
	 * @param {number} idx Numero de la case du Tictactoe
	 */
	setChoice(idx) {
		if (this.status === TicTacToe_Game.STATUS.P1) {
			this.value_grid[idx] = TicTacToe_Game.SYMBOLE_PLAYER.P1
		} else {
			this.value_grid[idx] = TicTacToe_Game.SYMBOLE_PLAYER.P2
		}
		console.log(this.checkWinCondition())
	}

	/**
	 * Verifie la condition de victoire
	 * @returns {number|undefined} Renvoie 0 si P1 a gagner ou 1 si P2 a gagner, undefined dans tout les autres cas
	 */
	checkWinCondition() {
		const isDiagonalWin = (this.value_grid[0] === this.value_grid[4]) &&
			(this.value_grid[0] === this.value_grid[8]) && 
			this.value_grid[0] !== ''
		const isOtherDiagonalWin = (this.value_grid[2] === this.value_grid[4]) && 
			(this.value_grid[2] === this.value_grid[6]) && 
			this.value_grid[2] !== ''
		if (isDiagonalWin || isOtherDiagonalWin) {
			this.winner = this.status
			return this.status
			// return this.value_grid[0] === TicTacToe_Game.SYMBOLE_PLAYER.P1 ? TicTacToe_Game.STATUS.P1 : TicTacToe_Game.STATUS.P2
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
				return this.status
			}
		}
		return undefined
	}
	// refait la fonction checkwincondition sans un renvoie de si c'est un number ou undefined, renvoyer qu'un seul type
}
