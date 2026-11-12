import EventsEmitter from 'node:events'
import { Utils } from '../utils.mjs'

export class Bus extends EventsEmitter {
	constructor() {
		super()
	}

	/**
	 * Emetteur d'evenement avec une gestion d'erreur
	 * @param {string} event nom de l'evenement
	 * @param {any} value valeur de l'evenement
	 */
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