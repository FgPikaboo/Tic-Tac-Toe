export class TicTacToe_Game {
	
	static SYMBOLE_PLAYER = {
		P1: 'X',
		P2: 'O'
	}

	constructor() {
		/** @type {string} */
		this.status
		this.winner = ''
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

