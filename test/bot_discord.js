// Ce sont les outils qu'on a besoin pour le bot
const { Client, GatewayIntentBits } = require('discord.js')
// Le token du bot
const { token } = require(__dirname + '/../config.json')

function $require(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
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
	$require('./test_discord.js')
})

// Login à Discord avec le token du bot
client.login(token)

module.exports = {
	/**
	 * @type {import('discord.js').Message}
	 */
	get message() { return lastMessage.content },
	envoyerMessage: (m) => {
		return lastMessage && lastMessage.channel.send(m)
	},
	get username() {
		return lastMessage && lastMessage.author.username
	}
}