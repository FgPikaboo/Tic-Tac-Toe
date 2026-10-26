import { onkey } from "../terminal-engine.mjs"
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
}