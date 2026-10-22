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

		/** @type {{onAction: Function}|null} Le composant qui reçoit les actions */
		this.focused = null
	}

	focus(component) {
		if (this.focused) { // Debranche le focus
			this.bus.off('action', this.focused.onAction)
		}
		this.focused = component
		if (component) { // Branche le focus
			this.bus.on('action', component.onAction)
		}
	}

	showMenu() {
		clear()
		this.ui.menu.showMainScreen()
		this.focus(this.ui.menu)
		this.ui.common.showLadderInfo(this.ladder, 0, 0)
	}

	async startGame() {
		this.focus(null)                  // le menu n'écoute plus
		clear()
		await this.launchTicTacToeGame()  // l'ancienne partie, avec son while
		this.showMenu()
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
	 * Branche les écouteurs une seule fois, puis affiche le menu.
	 */
	start() { // Faire le schema de l'achevisement sur escalidraw
		this.controller.on('action', (action) => this.bus.emit('action', action))
		Utils.log()
		this.ui.menu.on('menu:option', (option) => {
			if (option === 'start') {
				this.startGame()
			} else if (option === 'rules') {
				clear()
				this.ui.menu.showRules()
				this.focus(null)
				this.bus.once('action', () => this.showMenu())
			} else {
				this.exit()
			}
		})
		this.bot.initBot()
		this.controller.listen()
		this.showMenu()
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