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
		this.status = TicTacToe_Game.STATUS.P1
		/** @type {number} L'etat du vainqueur de la partie (P1,P2,ENDED) */
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
	}

	/** 
	 * Choisie aléatoirement ou par le joueur qui a perdu, par qui commence
	 * @return {number} Le joueurs qui commence
	 */
	setFirstPlayer() { }

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
	}

	/**
	 * Verifie la condition de victoire
	 * @return {number} Condition valide
	 */
	checkWinCondition() { 
		// If P1 win / else if P2 / else draw -> return gagnant pour ladder + partie suivante
		return TicTacToe_Game.WINNER.P1
	}
}
