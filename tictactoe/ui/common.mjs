import { I18n } from "../constantes/I18n.mjs"
import { Utils } from "../../utils.mjs"
import { clearColor, drawString } from "../../terminal-engine.mjs"
import { Theme } from "../constantes/theme.mjs"

/**
 * Base UI class regrouping shared rendering methods used by UI sub-modules (UIGame and UIMenu).
 */
export class TicTacToe_Common_UI {

	/**
	 * Renders leaderboard scores and game version information inside the ladder component.
	 * @param {LadderData} ladder - Leaderboard data object containing player scores.
	 * @param {number} posLadderX - X-axis coordinate for ladder positioning.
	 * @param {number} posLadderY - Y-axis coordinate for ladder positioning.
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
			// Trailing space in string ensures accurate target string targeting 
			// during color rendering to avoid accidental index matches (e.g., Player 1 vs score 1).
			Utils.drawStringAndColor(
				posX + barSpacing, 
				posY + lineBreak, 
				startTextLadder + whoDrawingLadder + rankPlayer[i],
				rankPlayer[i], 
				Theme.NUMBER_LADDER
			)
		}
	}
}