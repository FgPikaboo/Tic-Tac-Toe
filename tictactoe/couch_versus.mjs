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
	 * @param {{name: 'up'|'down'|'confirm'}} key Le nom de la touche du clavier 
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

	/**
	 * La super fonction de _waitMoveInMenu
	 * @returns {Promise<'up'|'down'|'confirm'>}
	 */
	async waitForMenuSelection() {
		await waitOnceKey((key) => {
			return this._waitMoveInMenu(key)
		})
		return this.selectedAction
	}

	/**
	 * Détection des entrées pour le menu de sélection
	 * - Haut/Bas pour naviguer
	 * - Espace/Entrée pour valider
	 * @param {{name: 'up'|'down'|'right'|'left'|'confirm'}} key Le nom de la touche du clavier 
	 */
	_waitForPlayerChoice(key) {
		let action
		switch (key.name) {
			case TicTacToe_CouchVersus.KEY_NAME.DOWN:
				action = 'down'
				break
			case TicTacToe_CouchVersus.KEY_NAME.UP:
				action = 'up'
				break
			case TicTacToe_CouchVersus.KEY_NAME.RIGHT:
				action = 'right'
				break
			case TicTacToe_CouchVersus.KEY_NAME.LEFT:
				action = 'left'
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

	/**
	 * La super fonction de _waitMoveInMenu
	 * @returns {Promise<'up'|'down'|'right'|'left'|'confirm'>}
	 */
	async waitMoveInGame() {
		await waitOnceKey((key) => {
			return this._waitForPlayerChoice(key)
		})
		return this.selectedAction
	}

	/** 
	 * Attend une double saisie pour aller la suite
	 * @type {boolean} 
	 * @returns {boolean} Renvoie la confirmation de la saisie
	 */
	waitForNext() {}
}