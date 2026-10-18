import { TicTacToe_CouchVersus } from "../tictactoe/couch_versus.mjs"
import EventsEmitter from 'node:events'
import { Utils } from "../utils.mjs"

class Controller extends EventsEmitter {
	constructor() {
		super()
		this.input = new TicTacToe_CouchVersus()
	}

	initKeyboard() {
		this.input.on('action', (action) => {
			switch (action) {
				case "up":
					Utils.log(action + ' is up (playgame)')
					break
				case "down":
					Utils.log(action + ' is down ? (playgame)')
					break
				case "left":
					Utils.log(action + ' is left (playgame)')
					break
				case "right":
					Utils.log(action + ' is right ? (playgame)')
					break
				case "confirm":
					Utils.log(action + ' is confirm ? (playgame)')
					break
			}
		})
		this.input.listen()
	}
}

