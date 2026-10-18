import { TicTacToe_CouchVersus } from "./couch_versus.mjs"
import { TicTacToe_Game } from "./game.mjs"
import { TicTacToe_UI } from "./ui/index.mjs"
import { destroy, clear, onkey } from "../terminal-engine.mjs"
import { I18n } from "./constantes/I18n.mjs"
import EventEmitter from 'node:events'
import { Bot_Discord } from "../bot_discord.mjs"
import { Bus } from "./bus.mjs"
import { Utils } from "../utils.mjs"

/**
 * Main application class orchestrating the TicTacToe game lifecycle, UI, input controls, and score tracking.
 */
export class TicTacToe extends EventEmitter {

	constructor() {
		super()
		/** @type {Array<TicTacToe_Game>} History of completed game sessions. */
		this.games = [ ]
		
		/** @type {TicTacToe_UI} Instance of the user interface management class. */
		this.ui = new TicTacToe_UI()
		
		/** @type {TicTacToe_CouchVersus} Instance handling user input and key bindings. */
		this.controller = new TicTacToe_CouchVersus()

		/** @type {Bot_Discord} */
		this.bot = new Bot_Discord()

		/** @type {Bus} */
		this.bus = new Bus()
		
		/** 
		 * Match score tracking for both players.
		 * @type {{P1: number, P2: number}} 
		 */
		this.ladder = { // EVENT
			P1: 0,
			P2: 0
		}
		
		/** @type {boolean} Flag indicating if a rematch was requested. */
		this.replay = false
		
		/** @type {number|undefined} The winner status from the preceding round. */
		this.prevWinner = undefined // EVENT
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
	async menuOptionSelection() {
		let isNotInMenu = false
		let nextPhase = false
		// Grace au evenement, je n'aurais pu besoin de boucle
		this.ui.menu.showMainScreen()
		this.ui.common.showLadderInfo(this.ladder, 0, 0)

		this.ui.menu.on('menu:option', (option) => {
			if (option === 'start') {
				Utils.log('Next Game')
			} else if (option === 'rules') {
				Utils.log('rules selected')
				this.controller.once('double:confirm', () => {
					Utils.log('double confirm')
				})
			} else {
				Utils.log('Exit game')
			}
		})

		while (!isNotInMenu) {
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

					this.ui.menu.emitMenuOptionSelected()

					if (this.ui.menu.getMenuOptionSelected() === 1) {
						this.ui.menu.showRules()
						await this.controller.waitDoubleConfirm()
						clear()
						break
					}
					
					isNotInMenu = true

					if (this.ui.menu.getMenuOptionSelected() === 0) {
						nextPhase = true
					}
			}
			if (isNotInMenu && !nextPhase) {
				this.exit()
			}
		}
	}
	
	/**
	 * Validates terminal dimensions and initializes a new game session.
	 */
	async launchTicTacToeGame() {

		this.ui.game.once('window:work', () => {
			Utils.log('Window work')
		})
		this.ui.game.checkSizeTerminal()

		if (!this.ui.game.checkSizeTerminal()) {
			console.log(I18n.ERROR_TERMINAL_TOO_SMALL)
			this.exit()
		}

		// New game instance
		const currentGame = new TicTacToe_Game()

		currentGame.on('turn', (player) => {
			Utils.log(`Fin du tour du joueur ${player.who}`)
		})

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
						const winner = currentGame.getWinner() // EVENT pour avoir le vainqueur // 	FAIRE CA BESOIN EMIT
						if (winner === TicTacToe_Game.WINNER.P1 || winner === TicTacToe_Game.WINNER.P2) {
							this.countWinnerLadder(winner)
						}
						this.ui.game.showEndGame(winner) // EVENT but.emit pour informer l'ui du vainqueur, qui puisse afficher
						this.bot.sendMessage(I18n.BOT_DISCORD_WINNER(winner))
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

		this.controller.on('action', (action) => {
			switch (action) {
				case "up":
					Utils.log(action + ' is up (playgame)')
					break
				case "down":
					Utils.log(action + ' is down ? (playgame)')
					break
				case "left":
					Utils.log(action + ' is left (playgame)')
					break
				case "right":
					Utils.log(action + ' is right ? (playgame)')
					break
				case "confirm":
					Utils.log(action + ' is confirm ? (playgame)')
					break
			}
		})
		
		this.controller.listen()

		while (!this.replay) {
			this.bot.initBot()
			await this.menuOptionSelection()
			await this.launchTicTacToeGame()
		}
	}

	/**
	 * Exit game
	 */
	exit() { // EVENT
		destroy()
		process.exit()
	}

	main() {}
}