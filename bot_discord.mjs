// Ce sont les outils qu'on a besoin pour le bot
import { Client, GatewayIntentBits } from 'discord.js'
// Le token du bot
import configToken from './config.json' with {type:'json'}

const { token } = configToken

function $require(module) {
    import(module + '?' + Date.now()) 
}

// Création du client du bot
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })


/**
 * @type {import('discord.js').Message}
 */
let lastMessage = null

// Quand le client est prêt et connecté à Discord
client.once('ready', () => {
	console.log('[Nano] Je suis prêt !')
	console.log('[Nano] Pour m\'inviter sur ton serveur, copie-colle cette URL:')
	console.log(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=277025516630&scope=bot`)
})

// Quand un message est envoyé
client.on('messageCreate', (message) => {
	// Si c'est notre propre message, on ne fait rien, cela évite le spam à l'infini (et l'au dela)
	if (message.author.id === client.user.id) return
	lastMessage = message
	$require('file:///' + import.meta.dirname + '/tictactoe/' + 'test_discord.mjs')
})

// Login à Discord avec le token du bot
client.login(token)

export function envoyerMessage(message) {
	return lastMessage && lastMessage.channel.send(message)
}

export function getMessage() {
	return lastMessage.content
}

export function getUsername() {
	return lastMessage && lastMessage.author.username
}