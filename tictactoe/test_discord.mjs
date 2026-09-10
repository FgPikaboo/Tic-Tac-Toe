import { Bot_Discord } from "../bot_discord.mjs"

export class Test_Discord {

	constructor() {
		this.botDiscord = new Bot_Discord()
	}

	launcherBot() {
		this.botDiscord.initBot()

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

const t = new Test_Discord()
t.launcherBot()