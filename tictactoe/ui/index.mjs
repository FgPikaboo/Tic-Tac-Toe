import { TicTacToe_Common_UI } from "./common.mjs"
import { TicTacToe_Game_UI } from "./game.mjs"
import { TicTacToe_Menu_UI } from "./menu.mjs"

/**
 * Point d'entrée principal des interfaces utilisateur (UI) du TicTacToe.
 * Centralise et gère les instances du menu et du jeu.
 */
export class TicTacToe_UI {

	constructor() {
		/**
		 * Interface utilisateur dédiée à la gestion des parties en cours.
		 * @type {TicTacToe_Game_UI}
		 */
		this.game = new TicTacToe_Game_UI()
		/**
		 * Interface utilisateur dédiée au menu.
		 * @type {TicTacToe_Menu_UI}
		 */
		this.menu = new TicTacToe_Menu_UI()
		/**
		 * Fonction identique aux 2 instances
		 * @type {TicTacToe_Common_UI}
		 */
		this.common = new TicTacToe_Common_UI()
	}
}