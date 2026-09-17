// Ce sont les outils qu'on a besoin pour le bot
import { Client, GatewayIntentBits } from 'discord.js'
// Le token du bot
import configToken from './config.json' with {type:'json'}
import EventEmitter from 'node:events'

export class Bot_Discord extends EventEmitter {

	static CHANNEL = '919535676750442506'

	constructor() {
		super()
		/**
		 * @type {import('discord.js').Message}
		 */
		this._client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
		this.lastMessage = null
		this.channel = null
	}

	/* 2eme facon de faire
	onReady(fn) {
		this._client.once('ready', () => {
			fn()
		})
	}
	*/

	/**
	 * Permet de verifié si le bot a bien etais connecter dans le channel discord
	 */
	debugBot() {
		this._client.once('ready', () => {
			try {
				// Récupération de l'instance du salon textuel
				if (this.channel && this.channel.isTextBased()) {
					this.channel.send('Le bot est désormais en ligne !')
				}
			} catch (error) {
				console.error('Erreur lors de l\'envoi du message de connexion : ', error)
			}
		})
	}

	/**
	 * Launcher 'du bot discord'
	 */
	initBot() {
		const { token } = configToken
		this._client.once('ready', async () => {
			this.channel = await this._client.channels.fetch(Bot_Discord.CHANNEL)
		})
		// Quand un message est envoyé
		this._client.on('messageCreate', (message) => {
		// Si c'est notre propre message, on ne fait rien, cela évite le spam à l'infini (et l'au dela)
			if (message.author.id === this._client.user.id) return
			this.lastMessage = message
			this.envoyerMessage(message)
		})

		// Login à Discord avec le token du bot
		this._client.login(token)
	}

	/**
	 * Send a message in the channel discord
	 * @param {string} msg message discord
	 */
	sendMessage(msg) {
		try {
			if (this.channel && this.channel.isTextBased()) {
				this.channel.send(msg)
			}
		} catch (error) {
			console.error('Erreur lors de l\'envoi du message de connexion : ', error)
		}
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

