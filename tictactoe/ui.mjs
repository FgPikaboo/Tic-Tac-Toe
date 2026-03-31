import { 
	drawString,
	getScreenHeight,
	getScreenWidth
} from "../terminal-engine.mjs"

export class TicTacToe_UI {

	static MAIN_MENU = [
		'Start game',
		'Exit',
		'Plaisir'
	]
	
	constructor() {
		/** @type {number} */
		this.mainMenuOptionSelected = 0
		/** @type {number} */
		this.caseSelected = 4
	}
	
	/**
	 * Obtiens la position du Menu
	 * @returns {{x: number, y: number}} Position du menu
	 */
	getMenuPos() {
		return { 
			x: Math.ceil((getScreenWidth()/2)-(TicTacToe_UI.MAIN_MENU[0].length/2)),
			y: Math.ceil(getScreenHeight()/2)
		}
	}

	/**
	 * Obtiens la position du TicTacToe
	 * @returns {{x: number, y: number}} Position du TicTacToe
	 */
	getTicTacToePos() {
		return { 
			x: Math.ceil(getScreenWidth()/4),
			y: Math.ceil(getScreenHeight()/3)
		}
	}

	/**
	 * Affiche le menu
	 */
	showMainScreen() {
		const pos = this.getMenuPos()

		for (let i = 0; i < TicTacToe_UI.MAIN_MENU.length; i++) {
			drawString(pos.x, pos.y + i, TicTacToe_UI.MAIN_MENU[i])
		}
	}

	/** 
	 * Affiche le curseur dans le menu
	 * Supprime egalement l'ancien curseur
	 */
	showMenuCursor(previous) {
		const pos = this.getMenuPos()
		const y = pos.y + this.mainMenuOptionSelected
		const x = pos.x - 2

		if (previous !== undefined) {
			const prevY = pos.y + previous
			drawString(x, prevY, ' ')
		}
		drawString(x, y, '•')
	}

	/**
	 * Permet de descendre dans le menu du jeu
	 */
	moveDown() {
		const previousMainMenuOptionSelected = this.mainMenuOptionSelected
		this.mainMenuOptionSelected = (this.mainMenuOptionSelected + 1) % TicTacToe_UI.MAIN_MENU.length
		this.showMenuCursor(previousMainMenuOptionSelected)
	}

	/**
	 * Permet de monter dans le menu du jeu
	 */
	moveUp() {
		const previousMainMenuOptionSelected = this.mainMenuOptionSelected
		if (this.mainMenuOptionSelected > 0) {
			this.mainMenuOptionSelected -= 1
		} else {
			this.mainMenuOptionSelected = TicTacToe_UI.MAIN_MENU.length - 1
		}
		this.showMenuCursor(previousMainMenuOptionSelected)
	}

	/**
	 * Affiche le jeu (contenant un TicTacToe)
	 */
	showTicTacToe() {
		const pos = this.getTicTacToePos()
		const TIC_TAC_TOE = ['-' , '|']
		const LINE = 20
		drawString(pos.x, pos.y, TIC_TAC_TOE[0].repeat(LINE))
		drawString(pos.x, pos.y + 3, TIC_TAC_TOE[0].repeat(LINE))
		for (let i = 0; i < 8; i++) {
			drawString(pos.x+(LINE/3), (pos.y-2) + i, TIC_TAC_TOE[1])
			drawString(pos.x+((LINE/3)*2), (pos.y-2) + i, TIC_TAC_TOE[1])
		}
	}

	/**
	 * Affiche le jeu (contenant un TicTacToe)
	 */
	showLadder() { }

	/**
	 * Affiche le curseur dans le jeu
	 */
	showGameCursor() { }

	/**
	 * Affiche l'ecran de fin du jeu (Affichage vainqueur + ladder + press pour continue)
	 */
	showEndGame() { }

	/**
	 * Dessine la case dans le tictactoe
	 * @param {number} idx_case La case choisie
	 */
	setCaseSelected(idx_case) { }
	
	/**
	 * Selectionne la case dans le menu du tictactoe
	 * @param {number} idx_menu L'option choisie
	 */
	setMainMenuOptionSelected(idx_menu) { }
}