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

		/** @type {null|TicTacToe_Game} */
		this.currentGame = null
	}

	startGame() {
		clear()

		if (!this.ui.game.checkSizeTerminal()) {
			console.log(I18n.ERROR_TERMINAL_TOO_SMALL)
			this.exit()
		}

		// New game instance
		this.currentGame = new TicTacToe_Game()

		this.currentGame.on('refused', (refuse) => {
			this.ui.game.showOrderTurnAndInfo()
		})

		this.currentGame.on('turn', ({who, caseSelected, grid, nextPlayer}) => {
			this.ui.game.showValueTicTacToe(grid)
			if (nextPlayer) {
				this.ui.game.showOrderTurnAndInfo(nextPlayer)
			}

		})

		this.currentGame.on('end', (winner) => {
			clear()
			if (winner === TicTacToe_Game.WINNER.P1 || winner === TicTacToe_Game.WINNER.P2) {
				this.countWinnerLadder(winner)
			}
			this.ui.game.showEndGame(winner)
			this.bus.emit('game:end', winner)
			this.prevWinner = winner
			this.focus(null)
			this.bus.once('action', () => this.showMenu())
		})

		this.currentGame.setFirstPlayer(this.prevWinner)
		this.ui.game.showTicTacToe()
		this.ui.game.showSeparatorBlocksInGame()
		this.ui.common.showLadderInfo(this.ladder, this.ui.game.getBlocks().upperRight.x, this.ui.game.getBlocks().upperRight.y)
		this.ui.game.showCredits()
		this.ui.game.showGameCursor()
		this.ui.game.showOrderTurnAndInfo(this.currentGame.getStatus())
		this.focus(this.ui.game)
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

		this.ui.game.on('case', (caseSelected) => {
			this.currentGame.playCurrentTurn(caseSelected)
		})

		this.bus.on('game:end', (winner) => {
			this.bot.sendMessage(I18n.BOT_DISCORD_WINNER(winner))
		}) 
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