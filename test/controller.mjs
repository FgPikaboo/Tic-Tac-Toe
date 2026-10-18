import { TicTacToe_CouchVersus } from "../tictactoe/couch_versus.mjs"
import EventsEmitter from 'node:events'
import { Utils } from "../utils.mjs"
import { initKeyboard } from "../terminal-engine.mjs"

class Controller extends EventsEmitter {
	constructor() {
		super()
		this.input = new TicTacToe_CouchVersus()
	}

	testInput() {
		initKeyboard()
		this.input.on('action', (action) => {
			switch (action) {
				case "up":
					Utils.log(action + ' is up')
					break
				case "down":
					Utils.log(action + ' is down ?')
					break
				case "left":
					Utils.log(action + ' is left')
					break
				case "right":
					Utils.log(action + ' is right ?')
					break
				case "confirm":
					Utils.log(action + ' is confirm ?')
					break
			}
		})
		this.input.listen()
	}
}

const test = new Controller()
test.testInput()