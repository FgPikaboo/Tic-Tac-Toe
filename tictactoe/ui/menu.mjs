import { 
	drawString,
	getScreenHeight,
	getScreenWidth
} from "../../terminal-engine.mjs"
import { Utils } from "../../utils.mjs"
import { I18n } from "../constantes/I18n.mjs"

/**
 * @typedef {Object} PosXY
 * @property {number} x - Position sur l'axe horizontal.
 * @property {number} y - Position sur l'axe vertical.
 */

/**
 * Gère l'affichage et l'interface utilisateur (UI) du menu TicTacToe
 */
export class TicTacToe_Menu_UI {

	/**
	 * Options textuelles du menu principal.
	 * @type {Array<string>}
	 */
	static MAIN_MENU = [
		I18n.START_GAME,
		I18n.RULES,
		I18n.EXIT
	]
	
	constructor() {
		/** 
		 * Indice de l'option actuellement selectionnée (0 à 2)
		 * @type {number}
		 */
		this.mainMenuOptionSelected = 0
	}

	/**
	 * Récupère l'indice de l'option sélectionnée par le joueur.
	 * @returns {number} L'index de l'option (0 pour le premier élément).
	 */
	getMenuOptionSelected() {
		return this.mainMenuOptionSelected
	}
	
	/**
	 * Calcule la position d'origine (top-left) pour centrer le menu dans le terminal.
	 * @returns {PosXY} Position X/Y du coin supérieur gauche du menu.
	 */
	getMenuPos() {
		return {
			x: Utils.center(getScreenWidth(), 1),
			y: Utils.center(getScreenHeight(), 1)
		}
	}

	/**
	 * Dessine sur le terminal les regles du jeu
	 */
	showRules() {
		Utils.drawStringHCentered(0,getScreenHeight()/2,getScreenWidth(),I18n.RULES_EXPLAIN_1)
		Utils.drawStringHCentered(0,(getScreenHeight()/2)+1,getScreenWidth(),I18n.RULES_EXPLAIN_2)
	}

	/**
	 * Dessine le menu principal au centre du terminal
	 */
	showMainScreen() {
		const pos = this.getMenuPos()
		for (let i = 0; i < TicTacToe_Menu_UI.MAIN_MENU.length; i++) {
			drawString(pos.x, pos.y + i, TicTacToe_Menu_UI.MAIN_MENU[i])
		}
		this.showMenuCursor()
	}

	/** 
	 * Met à jour visuellement la position du curseur dans le menu.
	 * Efface l'ancienne position du curseur si elle est spécifiée.
	 * @param {number} [previous] - L'index de l'ancienne option sélectionnée à effacer.
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
	 * Déplace le curseur vers le bas avec un bouclage vertical par ligne.
	 * (ex: de la case 1, passe à la case 0).
	 */
	moveDown() {
		const previousMainMenuOptionSelected = this.mainMenuOptionSelected
		this.mainMenuOptionSelected = (this.mainMenuOptionSelected + 1) % TicTacToe_Menu_UI.MAIN_MENU.length
		this.showMenuCursor(previousMainMenuOptionSelected)
	}

	/**
	 * Déplace le curseur vers le haut avec un bouclage vertical par ligne.
	 * (ex: de la case 0, passe à la case 1).
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