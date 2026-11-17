import EventsEmitter from 'node:events'
import { Utils } from '../utils.mjs'

export class Bus extends EventsEmitter {
	constructor() {
		super()
	}

	/**
	 * Emetteur d'evenement avec une gestion d'erreur
	 * @param {string} name nom de l'evenement
	 * @param {...any} args valeur de l'evenement
	 */
	emit(name, ...args) {
		const listeners = this.rawListeners(name)
		for (const listener of listeners) {
			try {
				listener.apply(this, args)
			} catch (error) {
				Utils.log(`[bus] l'écouteur de '${name}' a planté :`, error.message)
			}
		}
		return listeners.length > 0
	}
}