import EventsEmitter from 'node:events'

export class Bus extends EventsEmitter {
	constructor() {
		super()
	}
}