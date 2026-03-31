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
		X: 0,
		O: 1
	}

	constructor() {
		/** @type {number} L'etat actuel du joueurs (P1,P2,ENDED) */
		this.status
		/** @type {number} L'etat du vainqueur de la partie (P1,P2,ENDED) */
		this.winner
		/** @type {Array<string>} Les valeurs de la grille du Tictactoe (a voir si un tableau de number est mieux) */
		this.value_grid = [ 
			'', '', '',
			'', '', '',
			'', '', ''
		]
		/** @type {number} L'etat du classement en cours */
		this.ladder = {
			P1: 0,
			P2: 0
		}
	}

	/** 
	 * Choisie aléatoirement ou par le joueur qui a perdu, par qui commence
	 * @return {number} Le joueurs qui commence
	 */
	setFirstPlayer() { }

	/**
	 * Commence la partie
	 */
	startGame() {
		this.setFirstPlayer()
	}

	/**
	 * Verifie la condition de victoire
	 * @return {boolean} Condition valide
	 */
	checkWinCondition() { 
		// If true -> countWinnerLadder(player)
		this.countWinnerLadder(TicTacToe_Game.WINNER.P2)
		console.error(new Date().toISOString(), this.ladder)
	}

	countWinnerLadder(player) {
		// if player === 0, +1 au ladder P1
		if (player === 0) {
			this.ladder.P1 += 1
		} else {
			this.ladder.P2 += 1
		}
	}


	/** 
	 * Obtiens le choix du joueur dans la grille du tictactoe
	 * @param {number} idx Le choix du joueur
	 */
	setChoice(idx) { }

}

