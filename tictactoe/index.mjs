import { TicTacToe_CouchVersus } from "./couch_versus.mjs"
import { TicTacToe_Game } from "./game.mjs"
import { TicTacToe_UI } from "./ui/index.mjs"
import { destroy, waitOnceKey, clear } from "../terminal-engine.mjs"
import { nextTick } from "node:process"



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
	
	async manualTicTacToe() {
		if (!this.ui.game.checkSizeTerminal()) {
			console.log('\nTaille de la fenetre trop petite')
			this.exit()
		}
		this.ui.game.showTicTacToe()
		this.ui.game.showLadder(this.ladder)
		this.ui.game.showValueTicTacToe(this.currentGame.getValueGrid())
		this.ui.game.showGameCursor()

		await waitOnceKey(() => {
			return true
		})

		clear()
	}

	/**
	 * Jeu du tictactoe en cours
	 */
	async playGame() {
		let exitMenu = false
		while (!exitMenu) {
			this.ui.menu.showMainScreen()
			const action = await this.controller.waitForMenuSelection()
			switch (action) {
				case "up":
					this.ui.menu.moveUp()
					console.error(new Date().toISOString(),'up')
					break
				case "down":
					this.ui.menu.moveDown()
					break
				case "confirm":
					clear()
					if (this.ui.menu.getMenuOptionSelected() === 0) {
						await this.manualTicTacToe()
					} else { 
						exitMenu = true
					}
			}
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