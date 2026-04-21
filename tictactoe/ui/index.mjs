import { TicTacToe_Game_UI } from "./game.mjs"
import { TicTacToe_Menu_UI } from "./menu.mjs"

export class TicTacToe_UI {

	constructor() {
		this.game = new TicTacToe_Game_UI()
		this.menu = new TicTacToe_Menu_UI()
	}
}