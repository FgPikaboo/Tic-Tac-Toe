export class TicTacToe_Menu_UI {

	static MAIN_MENU = [
		'Start game',
		'Exit',
		'Plaisir'
	]
	
	constructor() {
		/** @type {number} */
		this.mainMenuOptionSelected = 0
	}
	
	/**
	 * Obtiens la position du Menu
	 * @returns {{x: number, y: number}} Position du menu
	 */
	getMenuPos() {
		return { 
			x: Math.ceil((getScreenWidth()/2)-(TicTacToe_Menu_UI.MAIN_MENU[0].length/2)),
			y: Math.ceil(getScreenHeight()/2)
		}
	}

	/**
	 * Affiche le menu
	 */
	showMainScreen() {
		const pos = this.getMenuPos()

		for (let i = 0; i < TicTacToe_Menu_UI.MAIN_MENU.length; i++) {
			drawString(pos.x, pos.y + i, TicTacToe_Menu_UI.MAIN_MENU[i])
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
		drawString(x, y, '')
	}

	/**
	 * Permet de descendre dans le menu du jeu
	 */
	moveDown() {
		const previousMainMenuOptionSelected = this.mainMenuOptionSelected
		this.mainMenuOptionSelected = (this.mainMenuOptionSelected + 1) % TicTacToe_Menu_UI.MAIN_MENU.length
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
			this.mainMenuOptionSelected = TicTacToe_Menu_UI.MAIN_MENU.length - 1
		}
		this.showMenuCursor(previousMainMenuOptionSelected)
	}

	/**
	 * Selectionne la case dans le menu du tictactoe
	 * @param {number} idx_menu L'option choisie
	 */
	setMainMenuOptionSelected(idx_menu) { }
}