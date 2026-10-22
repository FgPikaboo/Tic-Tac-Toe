import EventEmitter from 'node:events'
import { Utils } from '../utils.mjs'

export class Bus extends EventEmitter {
	constructor() {
		super()
	}
}