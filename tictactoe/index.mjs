import { TicTacToe_CouchVersus } from "./couch_versus.mjs"
import { TicTacToe_Game } from "./game.mjs"
import { TicTacToe_UI } from "./ui/index.mjs"
import { destroy, waitOnceKey, clear, drawString } from "../terminal-engine.mjs"
import { I18n } from "./constantes/I18n.mjs"

export class TicTacToe {
	constructor() {
		/** @type {Array<TicTacToe_Game>} Historique des games faites */
		this.games = [ ]
		this.ui = new TicTacToe_UI() // L'instance de la classe UI (pour l'affichage)
		this.controller = new TicTacToe_CouchVersus()
		this.ladder = {
			P1: 0,
			P2: 0
		}
		this.replay = false
		this.prevWinner = undefined
	}

	/**
	 * Ajoute le player gagnant
	 * @param {number} player Le player gagnant
	 */
	countWinnerLadder(current_winner) {
		if (current_winner === TicTacToe_Game.STATUS.P1) {
			this.ladder.P1 += 1
		} else if (current_winner === TicTacToe_Game.STATUS.P2) {
			this.ladder.P2 += 1
		}
	}

	addCountGameFinish() {
		this.countGame += 1
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
					clear()
					if (this.ui.menu.getMenuOptionSelected() === 1) {
						this.ui.menu.showRules()
						await this.controller.waitDoubleConfirm()
						clear()
						break
					}
					exitMenu = true
					if (this.ui.menu.getMenuOptionSelected() === 0) {
						nextPhase = true
					}
			}
		}
		if (exitMenu && !nextPhase) {
			this.exit()
		}
	}
	
	async launchTicTacToeGame() {
		if (!this.ui.game.checkSizeTerminal()) {
			console.log(I18n.ERROR_TERMINAL_TOO_SMALL)
			this.exit()
		}

		// Nouvelle instance d'une partie
		const currentGame = new TicTacToe_Game()

		currentGame.setFirstPlayer(this.prevWinner)
		this.ui.game.showTicTacToe()
		this.ui.game.showSeparatorBlocks()
		this.ui.game.showLadderInfo(this.ladder)
		this.ui.game.showGameCursor()

		let endGame = false
		let errorSamePos = false
		while (!endGame) {
			if (!errorSamePos) {
				this.ui.game.showOrderTurnAndInfo(currentGame.getStatus())
			} else {
				errorSamePos = false
			}
			const action = await this.controller.waitMoveInGame()
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
					try {
						currentGame.playCurrentTurn(this.ui.game.getCaseSelected())
					} catch (error) {
						errorSamePos = true
						this.ui.game.showOrderTurnAndInfo()
					}
					this.ui.game.showValueTicTacToe(currentGame.getValueGrid())
					if (currentGame.getStatus() === TicTacToe_Game.STATUS.ENDED) {
						clear()
						const winner = currentGame.getWinner()
						if (winner === TicTacToe_Game.WINNER.P1 || winner === TicTacToe_Game.WINNER.P2) {
							this.countWinnerLadder(winner)
						}
						this.ui.game.showEndGame(winner)
						this.prevWinner = winner
						await this.controller.waitDoubleConfirm()
						endGame = true
						clear()
					}
					break
			}
		}
	}

	/**
	 * Jeu du tictactoe en cours
	 */
	async playGame() {
		while (!this.replay) {
			await this.applyChoiceInMenuSelection()
			await this.launchTicTacToeGame()
		}
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