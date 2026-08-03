import { 
	clearColor,
	setForegroundColor,
	drawString,
	getScreenHeight,
	getScreenWidth
} from "../../terminal-engine.mjs"
import { Utils } from "../../utils.mjs"
import { I18n } from "../constantes/I18n.mjs"
import { Theme } from "../constantes/theme.mjs"

/**
 * @typedef {Object} PosXY
 * @property {number} x - Position on the horizontal axis.
 * @property {number} y - Position on the vertical axis.
 */

/**
 * Manages rendering and user interface (UI) interactions for the TicTacToe menu system.
 */
export class TicTacToe_Menu_UI {

	/**
	 * Textual options for the main menu.
	 * @type {Array<string>}
	 */
	static MAIN_MENU = [
		I18n.START_GAME,
		I18n.RULES,
		I18n.EXIT
	]

	constructor() {
		/** 
		 * Index of the currently selected menu option (0 to 2).
		 * @type {number}
		 */
		this.mainMenuOptionSelected = 0
	}

	/**
	 * Retrieves the index of the menu option currently selected by the player.
	 * @returns {number} The zero-based index of the selected option.
	 */
	getMenuOptionSelected() {
		return this.mainMenuOptionSelected
	}

	/**
	 * Calculates the top-left origin position to center the menu within the terminal window.
	 * @returns {PosXY} X/Y screen coordinates for the menu origin.
	 */
	getMenuPos() {
		return {
			x: Utils.center(getScreenWidth(), 1),
			y: Utils.center(getScreenHeight(), 1)
		}
	}

	/**
	 * Renders game rules explanation centered on the terminal screen.
	 */
	showRules() {
		Utils.drawStringHCentered(0, getScreenHeight() / 2, getScreenWidth(), I18n.RULES_EXPLAIN_1)
		Utils.drawStringHCentered(0, (getScreenHeight() / 2) + 1, getScreenWidth(), I18n.RULES_EXPLAIN_2)
	}

	/**
	 * Renders the main menu options centered on the terminal screen and displays the initial selection cursor.
	 */
	showMainScreen() {
		const pos = this.getMenuPos()
		for (let i = 0; i < TicTacToe_Menu_UI.MAIN_MENU.length; i++) {
			drawString(pos.x, pos.y + i, TicTacToe_Menu_UI.MAIN_MENU[i])
		}
		this.showMenuCursor()
	}

	/** 
	 * Visually updates selection cursor position in the menu and clears its previous position if specified.
	 * @param {number} [previous] - Index of the previously selected menu option to erase.
	 */
	showMenuCursor(previous) {
		const pos = this.getMenuPos()
		const y = pos.y + this.mainMenuOptionSelected
		const x = pos.x - 2

		if (previous !== undefined) {
			const prevY = pos.y + previous
			drawString(x, prevY, ' ')
		}
		setForegroundColor(Theme.CURSOR_COLOR)
		drawString(x, y, '•')
		clearColor()
	}

	/**
	 * Moves the selection cursor down with menu cyclic wrapping.
	 * (e.g., moving down from the last item wraps back to index 0).
	 */
	moveDown() {
		const previousMainMenuOptionSelected = this.mainMenuOptionSelected
		this.mainMenuOptionSelected = (this.mainMenuOptionSelected + 1) % TicTacToe_Menu_UI.MAIN_MENU.length
		this.showMenuCursor(previousMainMenuOptionSelected)
	}

	/**
	 * Moves the selection cursor up with menu cyclic wrapping.
	 * (e.g., moving up from index 0 wraps to the last item).
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
}