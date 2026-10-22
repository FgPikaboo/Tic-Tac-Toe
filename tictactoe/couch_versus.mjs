import { onkey, waitOnceKey } from "../terminal-engine.mjs"
import EventEmitter from 'node:events'

/**
 * @typedef {'up' | 'down' | 'left' | 'right' | 'confirm'} GameAction
 * @typedef {'up' | 'down' | 'confirm'} MenuAction
 */

/**
 * Raw key object structure emitted by terminal-engine.
 * @typedef {Object} TerminalKey
 * @property {string} name - Physical name identifier of the key (e.g., 'return', 'space', 'up').
 */

/**
 * Manages keyboard input mapping to handle user interactions within menus and active gameplay.
 */
export class TicTacToe_CouchVersus extends EventEmitter {

	/**
	 * Key identifier mappings for terminal-engine input events.
	 * @enum {string}
	 */
	static KEY_NAME = {
		DOWN: 'down',
		UP: 'up',
		LEFT: 'left',
		RIGHT: 'right',
		SPACE: 'space',
		ENTER: 'return'
	}

	constructor() {
		super()
		/**
		 * Stores the most recent validated action performed by the user.
		 * @type {GameAction | MenuAction | undefined}
		*/
		this.selectedAction
	}

	_keyToAction(key) {
		switch (key.name) {
			case TicTacToe_CouchVersus.KEY_NAME.DOWN:
				return 'down'
			case TicTacToe_CouchVersus.KEY_NAME.UP:
				return 'up'
			case TicTacToe_CouchVersus.KEY_NAME.LEFT:
				return 'left'
			case TicTacToe_CouchVersus.KEY_NAME.RIGHT:
				return 'right'
			case TicTacToe_CouchVersus.KEY_NAME.SPACE:
			case TicTacToe_CouchVersus.KEY_NAME.ENTER:
				return 'confirm'
		}
	}

	listen() {
		onkey((key) => {
			const action = this._keyToAction(key)
			if (action) {
				this.emit('action', action)
			} else { return }
		})
	}

	/**
	 * Intercepts raw key events and maps them to in-game directional movements and actions.
	 * @param {TerminalKey} key - Key event object captured by the terminal engine.
	 * @returns {boolean|undefined} `true` if a valid action was mapped, otherwise `undefined`.
	 * @private
	 */
	_waitForPlayerChoice(key) { // faire cette fonction en controlleur general, a besoin de recevoir un emit pour savoir sil est dans le menu ou non
		const action = this._keyToAction(key)
		if (action) {
			this.selectedAction = action
			return true
		}
	}

	/**
	 * Halts execution asynchronously until a player makes an in-game movement or action confirmation.
	 * @returns {Promise<GameAction>} Resolved in-game action.
	 */
	async waitMoveInGame() {
		// Arrow function preserves lexical 'this' binding from the surrounding context
		await waitOnceKey((key) => {
			return this._waitForPlayerChoice(key)
		})

		/* Traditional function expression binds 'this' dynamically to its execution caller:
		await waitOnceKey(function(key) {
			return this._waitForPlayerChoice(key)
		}) */

		/* Direct method reference loses its class instance context ('this'):
		const f = this._waitForPlayerChoice
		f() // Invoked as a free function without context, causing runtime scope failure */

		/* Passing method reference directly works only if it does not access 'this' internally; 
		otherwise, calling this._waitForPlayerChoice inside will throw a TypeError:
		await waitOnceKey(this._waitForPlayerChoice)
		*/
		
		return this.selectedAction
	}
}