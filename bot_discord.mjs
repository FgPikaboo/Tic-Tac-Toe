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
			console.error(new Date().toISOString(),'Je suis connecté')
			console.error(new Date().toISOString(),this.readyBot + ' Avant readyBot')
			this.readyBot = true
			console.error(new Date().toISOString(),this.readyBot + ' Apres readyBot')
			this.emit('bot:ready')
		})

		// Quand un message est envoyé
		this._client.on('messageCreate', (message) => {
			console.error(new Date().toISOString(), 'Condition check ?')
		// Si c'est notre propre message, on ne fait rien, cela évite le spam à l'infini (et l'au dela)
			if (message.author.id === this._client.user.id) return
			console.error(new Date().toISOString(), message + ' Valeur de messageCreate')
			this.lastMessage = message
			console.error(new Date().toISOString(), 'Avant envoyerMessage')
			this.envoyerMessage(message)
			console.error(new Date().toISOString(), 'Apres envoyerMessage')
		})
	}

	initBot() {
		const { token } = configToken

		console.error(new Date().toISOString(), 'Avant eventListen')
		this.eventListen()
		console.error(new Date().toISOString(), 'Apres eventListen')

		// Login à Discord avec le token du bot
		console.error(new Date().toISOString(), 'Avant clientLogin')
		this._client.login(token)
		console.error(new Date().toISOString(), 'Apres clientLogin')

		
	
	}

	envoyerMessage(message) {
		console.error(new Date().toISOString(), this.lastMessage + ' Valeur de last message')
		console.error(new Date().toISOString(), message + ' Valeur de message')
		return this.lastMessage && this.lastMessage.channel.send(message)
	}

	getMessage() {
		return this.lastMessage.content
	}

	getUsername() {
		return this.lastMessage && this.lastMessage.author.username
	}
}

