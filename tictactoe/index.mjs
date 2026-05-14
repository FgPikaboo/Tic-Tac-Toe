import { TicTacToe_CouchVersus } from "./couch_versus.mjs"
import { TicTacToe_Game } from "./game.mjs"
import { TicTacToe_UI } from "./ui/index.mjs"
import { destroy, waitOnceKey, clear } from "../terminal-engine.mjs"

export class TicTacToe {
	constructor() {
		/** @type {Array<TicTacToe_Game>} Historique des games faites */
		this.games = [ ]
		/** @type {TicTacToe_Game} L'instance de la classe Game */
		this.currentGame = new TicTacToe_Game()
		this.ui = new TicTacToe_UI() // L'instance de la classe UI (pour l'affichage)
		this.controller = new TicTacToe_CouchVersus()
		this.ladder = {
			P1: 0,
			P2: 0
		}
		this.replay = false
	}

	/**
	 * Ajoute le player gagnant
	 * @param {number} player Le player gagnant
	 */
	countWinnerLadder() {
		const winner = this.currentGame.checkWinCondition()

		if (winner === TicTacToe_Game.STATUS.P1) {
			this.ladder.P1 += 1
		} else if (winner === TicTacToe_Game.STATUS.P2) {
			this.ladder.P2 += 1
		}
	}

	async applyChoiceInMenuSelection() {
		let exitMenu = false
		let nextPhase = false
		while (!exitMenu) {
			this.ui.menu.showMainScreen()
			const action = await this.controller.waitForMenuSelection()
			switch (action) {
				case "up":
					this.ui.menu.moveUp()
					break
				case "down":
					this.ui.menu.moveDown()
					break
				case "confirm":
					exitMenu = true
					clear()
					if (this.ui.menu.getMenuOptionSelected() === 0) {
						nextPhase = true
					}
			}
		}
		if (exitMenu && !nextPhase) {
			this.exit()
		}
	}
	
	async inGridTicTacToe() {
		if (!this.ui.game.checkSizeTerminal()) {
			console.log('\nTaille de la fenetre trop petite')
			this.exit()
		}
		const winner = this.currentGame.getWinner()
		this.currentGame.setFirstPlayer(winner)
		this.ui.game.showTicTacToe()
		this.ui.game.showLadder(this.ladder)
		this.ui.game.showGameCursor()

		let endGame = false
		while (!endGame) {
			const action = await this.controller.waitMoveInGame()
			console.error(new Date().toISOString(),action)
			switch (action) {
				case "up":
					this.ui.game.moveUp()
					break
				case "down":
					this.ui.game.moveDown()
					break
				case "left":
					this.ui.game.moveLeft()
					break
				case "right":
					this.ui.game.moveRight()
					break
				case "confirm":

					this.currentGame.playCurrentTurn(this.ui.game.getCaseSelected())
					this.ui.game.showValueTicTacToe(this.currentGame.getValueGrid())
					if (typeof(this.currentGame.checkWinCondition()) === 'number') {
						this.countWinnerLadder()
						// showEndScreen
						endGame = true
					}
					break
			}
		}
	}

	/**
	 * Jeu du tictactoe en cours
	 */
	async playGame() {
		if (this.replay) {
			this.currentGame.resetValueGrid()
		}
		await this.applyChoiceInMenuSelection()
		await this.inGridTicTacToe()
	}

	main() { }

	/**
	 * Exit game
	 */
	exit() { 
		destroy()
		process.exit()
	}
}