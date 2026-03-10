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
		/** @type {number} */
		this.status
		/** @type {number} */
		this.winner
		/** @type {Array<string>} */
		this.value_grid = [ 
			'', '', '',
			'', '', '',
			'', '', ''
		]
	}

	// Defini le joueur qui commence
	setFirstPlayer() { }
	// Commence la partie
	startGame() { 
		this.setFirstPlayer()
	}
	// Verfie la condition de victoire de la partie en cours
	checkWinCondition() { }
	// Remplie la grille par le choix du joueurs
	setChoice(idx) { }

}

