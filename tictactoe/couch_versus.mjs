import { waitOnceKey } from "../terminal-engine.mjs"

export class TicTacToe_CouchVersus {

	static KEY_NAME = {
		DOWN: 'down',
		UP: 'up',
		LEFT: 'left',
		RIGHT: 'right',
		SPACE: 'space',
		ENTER: 'return',
		ESCAPE: 'escape'
	}

	constructor() {
		/**
		 * @type {string} Sauvegarde le mouvement du joueur
		 */
		this.selectedAction
	}

	/**
	 * Détection des entrées pour le menu de sélection
	 * - Haut/Bas pour naviguer
	 * - Espace/Entrée pour valider
	 * @param {{name: string}} key Le nom de la touche du clavier 
	 * @returns {Promise<'up'|'down'|'confirm'>}
	 */
	_waitMoveInMenu(key) {
		let action
		switch (key.name) {
			case TicTacToe_CouchVersus.KEY_NAME.DOWN:
				action = 'down'
				break
			case TicTacToe_CouchVersus.KEY_NAME.UP:
				action = 'up'
				break
			case TicTacToe_CouchVersus.KEY_NAME.SPACE:
			case TicTacToe_CouchVersus.KEY_NAME.ENTER:
				action = 'confirm'
				break
		}
		if (action) {
			this.selectedAction = action
			return true
		}
	}

	async waitForMenuSelection() {
		await waitOnceKey((key) => {
			return this._waitMoveInMenu(key)
		})
		return this.selectedAction
	}

	/** 
	 * Attend le choix du joueur
	 * @type {number} 
	 * @returns {number} Renvoie le choix
	 */
	waitForPlayerChoice() {}

	/** 
	 * Attend une double saisie pour aller la suite
	 * @type {boolean} 
	 * @returns {boolean} Renvoie la confirmation de la saisie
	 */
	waitForNext() {}
}