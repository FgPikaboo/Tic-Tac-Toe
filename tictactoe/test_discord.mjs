import { Bot_Discord } from "../bot_discord.mjs"

export class Test_Discord {

	constructor() {
		this.botDiscord = new Bot_Discord()
	}

	launcherBot() {
		console.error(new Date().toISOString(), 'Avant initBot')
		this.botDiscord.initBot()
		console.error(new Date().toISOString(), 'Apres initBot')

		this.botDiscord.once('bot:ready', () => {
			console.log('Je suis pret a envoyer un message') 
			console.error(new Date().toISOString(),'Je suis pret a envoyer un message')
		})

		/* 2eme facon de faire
		this.botDiscord.onReady(() => {
			console.log('Je suis pret a envoyer un message') 
			console.error(new Date().toISOString(),'Je suis pret a envoyer un message')
		}) 
		*/
	}
}





console.error(new Date().toISOString(), 'Avant T')
const t = new Test_Discord()
console.error(new Date().toISOString(), 'Apres T')
console.error(new Date().toISOString(), 'Avant T.launch')
t.launcherBot()
console.error(new Date().toISOString(), 'Apres T.launch')