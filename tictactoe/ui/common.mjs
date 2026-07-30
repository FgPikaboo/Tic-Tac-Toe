import { I18n } from "../constantes/I18n.mjs"
import { Utils } from "../../utils.mjs"
import { clearColor, drawString } from "../../terminal-engine.mjs"
import { Theme } from "../constantes/theme.mjs"

/**
 * Une class de UI qui regroupe toutes les methodes qui sont utiliser au 2 autres class UI (UIGame et UIMenu)
 */
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

		const startTextLadder = I18n.LADDER_1
		const rankPlayer = [
			I18n.LADDER_3_SCORE(rank_ladder.P1),
			I18n.LADDER_3_SCORE(rank_ladder.P2)
		]

		for (let i = 0; i < 2; i++) {
			const whoDrawingLadder = I18n.LADDER_2_PLAYER(i+1)
			lineBreak += 2
			Utils.drawStringAndColor(
				posX + barSpacing, 
				posY + lineBreak, 
				startTextLadder + whoDrawingLadder + rankPlayer[i], 
				rankPlayer[i], 
				Theme.NUMBER_LADDER
			)
		}
		/**
		const PLAYER = [I18n.LADDER_1(rank_ladder.P1),I18n.LADDER_2(rank_ladder.P2)]
		
		for (let i = 0 ; i < PLAYER.length ; i++) {
			lineBreak += 2
			
			drawString(posX + barSpacing, posY + lineBreak, PLAYER[i])
		}
		*/
	}
}