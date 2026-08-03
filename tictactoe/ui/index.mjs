import { TicTacToe_Common_UI } from "./common.mjs"
import { TicTacToe_Game_UI } from "./game.mjs"
import { TicTacToe_Menu_UI } from "./menu.mjs"

/**
 * Primary entry point for TicTacToe user interface (UI) controllers.
 * Centralizes and manages instances for active gameplay, menu, and shared UI components.
 */
export class TicTacToe_UI {

	constructor() {
		/** 
		 * UI controller instance dedicated to active gameplay rendering and states.
		 * @type {TicTacToe_Game_UI}
		 */
		this.game = new TicTacToe_Game_UI()

		/**
		 * UI controller instance dedicated to menu rendering and navigation.
		 * @type {TicTacToe_Menu_UI}
		 */
		this.menu = new TicTacToe_Menu_UI()

		/**
		 * Shared UI utility instance providing common rendering methods across sub-modules.
		 * @type {TicTacToe_Common_UI}
		 */
		this.common = new TicTacToe_Common_UI()
	}
}