import { waitOnceKey } from "../terminal-engine.mjs"

/**
 * @typedef {'up' | 'down' | 'left' | 'right' | 'confirm'} GameAction
 * @typedef {'up' | 'down' | 'confirm'} MenuAction
 */

/**
 * Object contenant la structure brute d'une touche renvoyée par le terminal-engine.
 * @typedef {Object} TerminalKey
 * @property {string} name - Le nom physique de la touche (ex: 'return', 'space', 'up').
 */

/**
 * Gère les entrées clavier pour permettre aux joueurs d'interagir avec les menus et le jeu.
 */
export class TicTacToe_CouchVersus {

	/**
	 * Mappage des identifiants de touches du terminal-engine.
	 * @enum {string}
	 */
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
		 * Stocke la dernière action validée par l'utilisateur.
		 * @type {GameAction | MenuAction | undefined}
		 */
		this.selectedAction
	}

	/**
	 * Intercepte et traduit les touches du clavier en actions pour le menu.
	 * @param {TerminalKey} key - La touche capturée par le moteur de terminal.
	 * @returns {boolean|undefined} `true` si une action valide a été traitée, sinon `undefined`.
	 * @private
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
	 * Bloque l'exécution en attendant que l'utilisateur sélectionne une option dans le menu.
	 * @returns {Promise<MenuAction>} L'action de menu validée.
	 */
	async waitForMenuSelection() {
		await waitOnceKey((key) => {
			return this._waitMoveInMenu(key)
		})
		return this.selectedAction
	}

	/**
	 * Intercepte et traduit les touches du clavier en mouvements/actions de jeu.
	 * @param {TerminalKey} key - La touche capturée par le moteur de terminal.
	 * @returns {boolean|undefined} `true` si une action valide a été traitée, sinon `undefined`.
	 * @private
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
	 * Bloque l'exécution en attendant qu'un joueur effectue un déplacement ou valide son choix en jeu.
	 * @returns {Promise<GameAction>} L'action de jeu validée.
	 */
	async waitMoveInGame() {
		// La premiere facon d'ecrire une fonction anomyme, c'est que le this ignore le contexte de l'interieur de la fonction
		await waitOnceKey((key) => {
			return this._waitForPlayerChoice(key)
		})

		/* La Deuxieme facon c'est que this depent du contexte donnée (donc a l'interieur de la fonction)
		await waitOnceKey(function(key) {
			return this._waitForPlayerChoice(key)
		})
		*/
		
		await waitOnceKey(function(key) {
			return this._waitForPlayerChoice(key)
		})
		
		return this.selectedAction
	}

	/**
	 * Bloque l'exécution en attendant qu'un joueur effectue une saisie
	 */
	async waitDoubleConfirm() {
		await waitOnceKey(() => true)
	}
}