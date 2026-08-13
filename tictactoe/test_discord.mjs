import { envoyerMessage, getUsername, getMessage } from "../bot_discord.mjs"
import { getScreenHeight, getScreenWidth } from "../terminal-engine.mjs"
import { Utils } from "../utils.mjs"
import { I18n } from "./constantes/I18n.mjs"

export class Test_Discord {

	/**
	 * Show in the terminal a bot discord connecting
	 */
	showDiscordTest() {
		const date = new Date().toISOString()
		Utils.drawStringHCentered(0, getScreenHeight() / 2, getScreenWidth(), I18n.TEST_DISCORD_SEIZURE(date))
	}
}