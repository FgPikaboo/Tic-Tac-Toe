import { TicTacToe_Game } from "./game.mjs"
import { TicTacToe_UI } from "./ui.mjs"

export class TicTacToe {
	constructor() {
		/** @type {Array<TicTacToe_Game>} Historique des games faites */
		this.games = [ ]
		/** @type {TicTacToe_Game} L'instance de la classe Game */
		this.currentGame = new TicTacToe_Game()
		this.ui = new TicTacToe_UI() // L'instance de la classe UI (pour l'affichage)
		this.ladder = {
			P1: 0,
			P2: 0
		}
	}

	/**
	 * Ajoute le player gagnant
	 * @param {number} player Le player gagnant
	 */
	countWinnerLadder() {
		const winner = this.currentGame.checkWinCondition()

		if (winner === 0) {
			this.ladder.P1 += 1
		} else {
			this.ladder.P2 += 1
		}
	}

	/**
	 * Jeu du tictactoe en cours
	 */
	playGame() {
		this.countWinnerLadder()
		this.countWinnerLadder()
		this.ui.showTicTacToe()
		this.ui.showLadder(this.ladder)
	}

	main() { }

	/**
	 * Exit game
	 */
	exit() { }
}