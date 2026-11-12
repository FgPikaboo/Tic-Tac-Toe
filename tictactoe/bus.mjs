import EventsEmitter from 'node:events'
import { Utils } from '../utils.mjs'

export class Bus extends EventsEmitter {
	constructor() {
		super()
	}

	emit(event, value) {
		const listeners = this.rawListeners(event)
		Utils.log(
			`event: ${event}, nombre: ${listeners.length}`
		)
		for (const listener of listeners) {
			try {
				listener(value)
			} catch (error) {
				Utils.log(error.message)
			}
		}
	}
}