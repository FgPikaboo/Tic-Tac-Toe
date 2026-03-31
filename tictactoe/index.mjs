import { TicTacToe_Game } from "./game.mjs"
import { TicTacToe_UI } from "./ui.mjs"

export class TicTacToe {
	constructor() {
		/** @type {Array<TicTacToe_Game>} Historique des games faites */
		this.games = [ ]
		/** @type {TicTacToe_Game} L'instance de la classe Game */
		this.currentGame = new TicTacToe_Game()
		this.ui = new TicTacToe_UI() // L'instance de la classe UI (pour l'affichage)
	}

	/**
	 * Jeu du tictactoe en cours
	 */
	playGame() {
		this.ui.showMainScreen()
		this.ui.showMenuCursor()
		this.ui.moveDown()
		this.ui.moveUp()
		this.ui.moveUp()
	}

	main() { }

	/**
	 * Exit game
	 */
	exit() { }
}