import { EventEmitter } from 'node:events'

class Bus extends EventEmitter {
	constructor() {
		super()
	}
}

const bus = new Bus()
bus.on('ping', () => console.log('pong'))
bus.emit('ping')