import { TicTacToe_CouchVersus } from "./couch_versus.mjs"
import { TicTacToe_Game } from "./game.mjs"
import { TicTacToe_UI } from "./ui/index.mjs"
import { destroy, clear } from "../terminal-engine.mjs"
import { I18n } from "./constantes/I18n.mjs"
import EventEmitter from 'node:events'
import { Bot_Discord } from "../bot_discord.mjs"
import { Bus } from "./bus.mjs"

/**
 * Le chef d'orchestre : il écoute tout le monde et décide qui fait quoi.
 * Personne d'autre ne connaît personne.
 */
export class TicTacToe extends EventEmitter {

	constructor() {
		super()
		/** @type {TicTacToe_UI} */
		this.ui = new TicTacToe_UI()

		/** @type {TicTacToe_CouchVersus} */
		this.controller = new TicTacToe_CouchVersus()

		/** @type {Bot_Discord} */
		this.bot = new Bot_Discord()

		/** @type {Bus} */
		this.bus = new Bus()

		/** @type {TicTacToe_Game|null} La partie en cours */
		this.currentGame = null

		/** @type {{onAction: Function}|null} Le composant d'UI qui reçoit les actions */
		this.focused = null

		/** @type {{P1: number, P2: number}} */
		this.ladder = {
			P1: 0,
			P2: 0
		}

		/** @type {number|undefined} */
		this.prevWinner = undefined
	}

	/**
	 * Branche les écouteurs (une seule fois !) puis affiche le menu.
	 */
	start() {
		// Main transmet les actions au Bus : l'UI ne connaît pas le Controller
		this.controller.on('action', (action) => this.bus.emit('action', action))
		this.ui.menu.on('menu:option', (option) => this.onMenuOption(option))
		this.ui.game.on('case', (idx) => this.currentGame.playCurrentTurn(idx))
		this.bus.on('game:end', (winner) => this.bot.sendMessage(I18n.BOT_DISCORD_WINNER(winner)))

		this.bot.initBot()
		this.controller.listen()
		this.showMenu()
	}

	/**
	 * Donne les actions à un seul composant d'UI : celui de l'écran affiché.
	 * @param {{onAction: Function}|null} component null = personne
	 */
	focus(component) {
		if (this.focused) {
			this.bus.off('action', this.focused.onAction)
		}
		this.focused = component
		if (component) {
			this.bus.on('action', component.onAction)
		}
	}

	/**
	 * Écran sans composant (règles, fin) : la prochaine action ramène au menu.
	 */
	waitAnyActionThenMenu() {
		this.focus(null)
		this.bus.once('action', () => this.showMenu())
	}

	showMenu() {
		clear()
		this.ui.menu.showMainScreen()
		this.ui.common.showLadderInfo(this.ladder, 0, 0)
		this.focus(this.ui.menu)
	}

	/**
	 * @param {'start'|'rules'|'exit'} option
	 */
	onMenuOption(option) {
		if (option === 'start') {
			this.startGame()
		} else if (option === 'rules') {
			clear()
			this.ui.menu.showRules()
			this.waitAnyActionThenMenu()
		} else {
			this.exit()
		}
	}

	startGame() {
		if (!this.ui.game.checkSizeTerminal()) {
			console.log(I18n.ERROR_TERMINAL_TOO_SMALL)
			this.exit()
			return
		}

		// Une nouvelle partie = un nouvel émetteur, donc de nouveaux écouteurs.
		// L'ancienne partie part à la poubelle avec les siens : pas de fuite.
		this.currentGame = new TicTacToe_Game()
		this.currentGame.on('turn', (turn) => {
			this.ui.game.showValueTicTacToe(turn.grid)
			if (turn.nextPlayer) {
				this.ui.game.showOrderTurnAndInfo(turn.nextPlayer)
			}
		})
		this.currentGame.on('refused', () => {
			this.ui.game.showOrderTurnAndInfo()
		})
		this.currentGame.on('end', (winner) => this.onGameEnd(winner))

		this.currentGame.setFirstPlayer(this.prevWinner)
		clear()
		this.ui.game.showTicTacToe()
		this.ui.game.showSeparatorBlocksInGame()
		this.ui.common.showLadderInfo(this.ladder, this.ui.game.getBlocks().upperRight.x, this.ui.game.getBlocks().upperRight.y)
		this.ui.game.showCredits()
		this.ui.game.showGameCursor()
		this.ui.game.showOrderTurnAndInfo(this.currentGame.getStatus())
		this.focus(this.ui.game)
	}

	/**
	 * @param {number} winner Un des TicTacToe_Game.WINNER
	 */
	onGameEnd(winner) {
		this.countWinnerLadder(winner)
		this.prevWinner = winner
		clear()
		this.ui.game.showEndGame(winner)
		this.waitAnyActionThenMenu()
		this.bus.emit('game:end', winner)
	}

	/**
	 * Increments the score counter for the winning player.
	 * @param {number} current_winner - The status code representing the winning player.
	 */
	countWinnerLadder(current_winner) {
		if (current_winner === TicTacToe_Game.WINNER.P1) {
			this.ladder.P1 += 1
		} else if (current_winner === TicTacToe_Game.WINNER.P2) {
			this.ladder.P2 += 1
		}
	}

	/**
	 * Exit game
	 */
	exit() {
		destroy()
		process.exit()
	}
}
