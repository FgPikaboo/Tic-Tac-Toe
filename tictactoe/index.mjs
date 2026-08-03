import { TicTacToe_CouchVersus } from "./couch_versus.mjs"
import { TicTacToe_Game } from "./game.mjs"
import { TicTacToe_UI } from "./ui/index.mjs"
import { destroy, waitOnceKey, clear, drawString } from "../terminal-engine.mjs"
import { I18n } from "./constantes/I18n.mjs"

/**
 * Main application class orchestrating the TicTacToe game lifecycle, UI, input controls, and score tracking.
 */
export class TicTacToe {
	constructor() {
		/** @type {Array<TicTacToe_Game>} History of completed game sessions. */
		this.games = [ ]
		
		/** @type {TicTacToe_UI} Instance of the user interface management class. */
		this.ui = new TicTacToe_UI()
		
		/** @type {TicTacToe_CouchVersus} Instance handling user input and key bindings. */
		this.controller = new TicTacToe_CouchVersus()
		
		/** 
		 * Match score tracking for both players.
		 * @type {{P1: number, P2: number}} 
		 */
		this.ladder = {
			P1: 0,
			P2: 0
		}
		
		/** @type {boolean} Flag indicating if a rematch was requested. */
		this.replay = false
		
		/** @type {number|undefined} The winner status from the preceding round. */
		this.prevWinner = undefined
	}

	/**
	 * Increments the score counter for the winning player.
	 * @param {number} current_winner - The status code representing the winning player.
	 */
	countWinnerLadder(current_winner) {
		if (current_winner === TicTacToe_Game.STATUS.P1) {
			this.ladder.P1 += 1
		} else if (current_winner === TicTacToe_Game.STATUS.P2) {
			this.ladder.P2 += 1
		}
	}

	/**
	 * Manages menu rendering and navigation execution flow.
	 */
	async applyChoiceInMenuSelection() {
		let exitMenu = false
		let nextPhase = false
		while (!exitMenu) {
			this.ui.menu.showMainScreen()
			this.ui.common.showLadderInfo(this.ladder, 0, 0)
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
	
	/**
	 * Validates terminal dimensions and initializes a new game session.
	 */
	async launchTicTacToeGame() {
		if (!this.ui.game.checkSizeTerminal()) {
			console.log(I18n.ERROR_TERMINAL_TOO_SMALL)
			this.exit()
		}

		// New game instance
		const currentGame = new TicTacToe_Game()

		currentGame.setFirstPlayer(this.prevWinner)
		this.ui.game.showTicTacToe()
		this.ui.game.showSeparatorBlocksInGame()
		this.ui.common.showLadderInfo(this.ladder, this.ui.game.getBlocks().upperRight.x, this.ui.game.getBlocks().upperRight.y)
		this.ui.game.showCredits()
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
	 * Main application loop handling menu selection and active game execution until replay is requested.
	 */
	async playGame() {
		while (!this.replay) {
			await this.applyChoiceInMenuSelection()
			await this.launchTicTacToeGame()
		}
	}

	/**
	 * Exit game
	 */
	exit() { 
		destroy()
		process.exit()
	}

	main() {}
}