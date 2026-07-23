import { I18n } from "../constantes/I18n.mjs"
import { Utils } from "../../utils.mjs"
import { clearColor, drawString } from "../../terminal-engine.mjs"

export class TicTacToe_Common_UI {

	/**
	 * Affiche le texte des scores et la version de l'UI à l'intérieur du Ladder.
	 * @param {LadderData} ladder - Les données de classement des joueurs.
	 * @param posLadderX - Position X du Ladder
	 * @param posLadderY - Position Y du Ladder
	 */
	showLadderInfo(ladder, posLadderX, posLadderY) {
		const posX = posLadderX
		const posY = posLadderY
		const barSpacing = 3
		let lineBreak = 0
		const rank_ladder = ladder
		const PLAYER = [I18n.LADDER_P1(rank_ladder.P1),I18n.LADDER_P2(rank_ladder.P2)]
		
		for (let i = 0 ; i < PLAYER.length ; i++) {
			lineBreak += 2
			drawString(posX + barSpacing, posY + lineBreak, PLAYER[i])
		}
	}
}