// Ce sont les outils qu'on a besoin pour le bot
import { Client, GatewayIntentBits } from 'discord.js'
// Le token du bot
import configToken from './config.json' with {type:'json'}
import EventEmitter from 'node:events'

export class Bot_Discord extends EventEmitter {

	constructor() {
		super()
		/**
		 * @type {import('discord.js').Message}
		 */
		this._client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
		this.lastMessage = null
		this.readyBot = false
	}

	onReady(fn) {
		this._client.once('ready', () => {
			fn()
		})
	}

	eventListen() {
		this._client.once('ready', () => {
			console.log('Je suis connecté')
			this.readyBot = true
			this.emit('bot:ready')
		})

		// Quand un message est envoyé
		this._client.on('messageCreate', (message) => {
		// Si c'est notre propre message, on ne fait rien, cela évite le spam à l'infini (et l'au dela)
			if (message.author.id === this._client.user.id) return
			this.lastMessage = message
			this.envoyerMessage(message)
		})
	}

	initBot() {
		const { token } = configToken

		this.eventListen()

		// Login à Discord avec le token du bot
		this._client.login(token)
	}

	envoyerMessage(message) {
		return this.lastMessage && this.lastMessage.channel.send(message)
	}

	getMessage() {
		return this.lastMessage.content
	}

	getUsername() {
		return this.lastMessage && this.lastMessage.author.username
	}
}

