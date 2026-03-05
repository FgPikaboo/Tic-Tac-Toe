import { TicTacToe_Game } from "./game.mjs"
import { TicTacToe_UI } from "./ui.mjs"

export class TicTacToe {
	constructor() {
		/** @type {Array<TicTacToe_Game>} */
		this.games = [ ] // Historique des games faites
		/** @type {TicTacToe_Game} */
		this.currentGame = null // L'instance de la classe Game
		this.ui = new TicTacToe_UI() // L'instance de la classe UI (pour l'affichage)
	}

	// Jeu en cours
	playGame() { }
	// Main
	main() { }
	// Exit le programme
	exit() { }
} 