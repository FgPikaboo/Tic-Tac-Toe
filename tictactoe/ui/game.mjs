import { 
	clearColor,
	setForegroundColor,
	drawString,
	getScreenHeight,
	getScreenWidth,
	COLOR
} from "../../terminal-engine.mjs"
import { Utils } from "../../utils.mjs"
import { I18n } from "../constantes/I18n.mjs"
import { Theme } from "../constantes/theme.mjs"

/**
 * @typedef {Object} PosXY
 * @property {number} x - Position on the horizontal axis.
 * @property {number} y - Position on the vertical axis.
 */

/**
 * @typedef {Object} LadderData
 * @property {number} P1 - Score or data for Player 1.
 * @property {number} P2 - Score or data for Player 2.
 */

/**
 * @typedef {Object} BlockGeometry
 * @property {number} x - Starting X-coordinate (pos0) of the block.
 * @property {number} y - Starting Y-coordinate (pos0) of the block.
 * @property {number} width - Width of the block.
 * @property {number} height - Height of the block.
 */

/**
 * @typedef {Object} Blocks
 * @property {BlockGeometry} upperLeft
 * @property {BlockGeometry} upperRight
 * @property {BlockGeometry} lowerLeft
 * @property {BlockGeometry} lowerRight
 */

/**
 * Manages the rendering and user interface (UI) for the terminal-based TicTacToe game.
 */
export class TicTacToe_Game_UI {

	/** 
	 * Game grid dimensions.
	 * @type {{WIDTH: number, HEIGHT: number}} 
	 */
	static TICTACTOE_GRID = {
		WIDTH: 23,
		HEIGHT: 11
	}

	constructor() {
		/**
		 * Index of the currently selected cell (0 to 8).
		 * @type {number} 
		 */
		this.caseSelected = 4
	}

	/**
	 * Retrieves the index of the cell currently selected by the player.
	 * @returns {number} The cell index (0-8).
	 */
	getCaseSelected() {
		return this.caseSelected
	}

	/**
	 * Calculates the top-left origin coordinates for the TicTacToe grid.
	 * The grid is centered within the main rendering area (80% width, 80% height).
	 * @returns {PosXY} X/Y origin position of the grid.
	 */
	getTicTacToePos() {
		const zoneDrawingWidth = Math.ceil(getScreenWidth()*0.8)
		const middleTictactoeGridWidth = zoneDrawingWidth/2
		const tictactoeGridWidthHalf = TicTacToe_Game_UI.TICTACTOE_GRID.WIDTH/2
		const posX = Math.floor(middleTictactoeGridWidth - tictactoeGridWidthHalf)
		const posY = Utils.center(Math.ceil(getScreenHeight()*0.8),TicTacToe_Game_UI.TICTACTOE_GRID.HEIGHT)
		
		// Return Position 0 of TicTacToe_Grid
		return {
			x: posX,
			y: posY
		}
	}

	/**
	 * Computes the layout dimensions and positions for the four terminal grid blocks.
	 * @param {number} [width] - Terminal screen width override (unit testing only).
	 * @param {number} [height] - Terminal screen height override (unit testing only).
	 * @returns {{upperLeft: BlockGeometry, upperRight: BlockGeometry, lowerLeft: BlockGeometry, lowerRight: BlockGeometry}} Object containing geometry for all 4 UI blocks.
	 */
	getBlocks(width, height) { 
		// Math.ceil is prioritized over Math.floor to ensure the main game area maximizes space
		let widthMax = width
		let heightMax = height

		if (!widthMax) {
			widthMax = getScreenWidth()
		}
		if (!heightMax) {
			heightMax = getScreenHeight()
		}

		return {
			upperLeft: {
				// Block origin (pos0)
				x: 0 , 
				y: 0 ,
				// Block dimensions
				width: Math.ceil(widthMax*0.8),
				height: Math.ceil(heightMax*0.8)
			},
			upperRight: { 
				// Block origin (pos0)
				x: Math.ceil(widthMax*0.8) + 2, // (1 cell for border divider + 1 cell to reach index 0)
				y: 0,
				// Block dimensions
				width: Math.floor(widthMax*0.2) - 1, // (1 cell offset for border divider)
				height: Math.ceil(heightMax*0.8)
			},
			lowerLeft: { 
				// Block origin (pos0) 
				x: 0 , 
				y: Math.ceil(heightMax*0.8) + 2 , // (1 cell for border divider + 1 cell to reach index 0)
				// Block dimensions
				width: Math.ceil(widthMax*0.8),
				height: Math.floor(heightMax*0.2) - 1 // (1 cell offset for border divider)
			},
			lowerRight: { 
				// Block origin (pos0)
				x: Math.ceil(widthMax*0.8) + 2 , // (1 cell for border divider + 1 cell to reach index 0)
				y: Math.ceil(heightMax*0.8) + 2 , // (1 cell for border divider + 1 cell to reach index 0)
				// Block dimensions
				width: Math.floor(widthMax*0.2) - 1, // (1 cell offset for border divider)
				height: Math.floor(heightMax*0.2) - 1 // (1 cell offset for border divider)
			}
		}
	}

	/**
	 * Calculates the exact screen coordinates for the cursor based on the selected grid cell.
	 * @returns {PosXY} X/Y screen position for the cursor.
	 */
	getGameCursorPos() {
		const pos = this.getTicTacToePos()
		const pos_copy_x = this.caseSelected % 3
		const pos_copy_y = Math.floor(this.caseSelected/3)

		let pos_x = pos.x + 3 + (8*pos_copy_x)
		let pos_y = pos.y + 2 + (4*pos_copy_y)

		return {
			x: pos_x,
			y: pos_y
		}
	}

	/**
	 * Renders the empty TicTacToe grid borders and separator lines in the terminal.
	 */
	showTicTacToe() {
		const pos = this.getTicTacToePos()
		const TICTACTOE_BORDER = ['-' , '|']
		const line = TicTacToe_Game_UI.TICTACTOE_GRID
		drawString(pos.x , pos.y + (line.HEIGHT/3), TICTACTOE_BORDER[0].repeat(line.WIDTH))
		drawString(pos.x , pos.y + ((line.HEIGHT/3)*2), TICTACTOE_BORDER[0].repeat(line.WIDTH))
		for (let i = 0; i < line.HEIGHT; i++) {
			drawString(pos.x + (line.WIDTH/3), pos.y + i, TICTACTOE_BORDER[1])
			drawString(pos.x + ((line.WIDTH/3)*2), pos.y + i, TICTACTOE_BORDER[1])
		}
	}

	/**
	 * Renders player markers (X, O, or empty) across the 9 slots of the TicTacToe grid.
	 * @param {Array<string>} value_grid - Array representing the current state of all 9 board slots.
	 */
	showValueTicTacToe(value_grid) {
		const pos = this.getTicTacToePos()
		let pos_x = pos.x + 3
		let pos_y = pos.y + 1
		let next_case = 0
		const copy_grid = value_grid.slice()
		for (let i = 0; i < copy_grid.length; i++) {
			if (i % 3 === 0 && i !== 0) {
				pos_x = pos.x + 3
				pos_y += 4
				next_case = 0
			}
			drawString(pos_x + next_case, pos_y, copy_grid[i])
			next_case += 8
		}
	}

	/**
	 * Renders application version and credits within the bottom-left UI container.
	 */
	showCredits() {
		const posCredit = this.getBlocks().lowerRight
		const posY = getScreenHeight() -  Utils.center(this.getBlocks().lowerLeft.height , 1)
		const BAR_SPACING = 3
		drawString(posCredit.x + BAR_SPACING, posY, I18n.VERSION)
	}

	/**
	 * Renders border divider lines delimiting the four main terminal layout sections.
	 */
	showSeparatorBlocksInGame() {
		const blockUpperRight = this.getBlocks().upperRight
		const blockLowerLeft = this.getBlocks().lowerLeft
		const BORDER = [ '-' , '|' ]
		drawString(blockLowerLeft.x, blockUpperRight.height, BORDER[0].repeat(getScreenWidth())) // -1 Pour draw au dessus du block
		for (let i = 0 ; i < getScreenHeight() ; i++) {
			drawString(blockUpperRight.x - 1, blockUpperRight.y + i, BORDER[1])
		}
	}

	/**
	 * Updates selection cursor screen position and clears its prior coordinates if specified.
	 * @param {PosXY} [previous] - Previous cursor coordinates to erase prior to redraw.
	 */
	showGameCursor(previous) {
		const pos = this.getGameCursorPos()
		if (previous !== undefined) {
			drawString(previous.x,previous.y,' ')
		}
		setForegroundColor(Theme.CURSOR_COLOR)
		drawString(pos.x, pos.y, '•')
		clearColor()
	}

	/**
	 * Renders the game-over screen displaying the outcome (victory or draw).
	 * @param {number} winner - Game result indicator: `1` for Player 1, `2` for Player 2, or `3` for a draw.
	 */
	showEndGame(winner) {
		const posY = Math.ceil(getScreenHeight()/2)
		if (winner === 3) {
			Utils.drawStringHCentered(0,posY,getScreenWidth(),I18n.DRAW)
		} else {
			const winnerText = {
				w1: I18n.WIN_1,
				w2: I18n.WIN_2(winner),
				w3: I18n.WIN_3
			}
			const posXString = Utils.center(getScreenWidth(), winnerText.w1.length + winnerText.w2.length + winnerText.w3.length)
			Utils.drawStringAndColor(posXString, posY, winnerText.w1 + winnerText.w2 + winnerText.w3, winnerText.w2, Theme.PLAYER_COLOR)
		}
	}

	/**
	 * Renders current player turn indicator or input error messages in the UI info section.
	 * @param {number} [player] - Active player ID (1 or 2), or undefined if displaying a repeat-input warning.
	 */
	showOrderTurnAndInfo(player) {
		// Height calculation offset ensures text aligns correctly within lower-left block bounds
		// const posY = Math.ceil(this.getBlocks().lowerLeft.y + (this.getBlocks().lowerLeft.height/2))
		const posY = getScreenHeight() - Utils.center(this.getBlocks().lowerLeft.height , 1) // 1 accounts for single-line string height
		const blocWidth = this.getBlocks().lowerLeft.width
		drawString(0, posY, ' '.repeat(blocWidth))
		let PhraseTurnPlayer = ''
		if (player === undefined) {
			PhraseTurnPlayer = I18n.RETRY_SEIZURE
			const posRetry = Utils.drawStringHCentered(0,posY,blocWidth,I18n.RETRY_SEIZURE)
		} else {
			const TurnPlayerN1 = I18n.TURN_PLAYER_1
			const TurnPlayerN2 = I18n.TURN_PLAYER_2(player)
			const posXString = Utils.center(this.getBlocks().lowerLeft.width, TurnPlayerN1.length + TurnPlayerN2.length)
			Utils.drawStringAndColor(posXString, posY, TurnPlayerN1 + TurnPlayerN2, TurnPlayerN2, Theme.PLAYER_COLOR)
			PhraseTurnPlayer = TurnPlayerN1 + TurnPlayerN2
		}

		if (PhraseTurnPlayer.length > this.getBlocks().lowerLeft.width) {
			PhraseTurnPlayer = PhraseTurnPlayer.substring(0, this.getBlocks().lowerLeft.width)
		}
		
	}

	/**
	 * Moves the selection cursor down with vertical column wrapping.
	 * (e.g., moving down from index 8 wraps to index 2).
	 */
	moveDown() {
		const previous_pos = this.getGameCursorPos()
		this.caseSelected = (this.caseSelected + 3) % 9
		this.showGameCursor(previous_pos)
	}

	/**
	 * Moves the selection cursor up with vertical column wrapping.
	 * (e.g., moving up from index 1 wraps to index 7).
	 */
	moveUp() {
		const previous_pos = this.getGameCursorPos()
		if (this.caseSelected >= 3) {
			// 3 = Number of cells per column
			this.caseSelected -= 3
		} else {
			// 6 = Offset required to wrap to the bottom cell of the column
			this.caseSelected += 6
		}
		this.showGameCursor(previous_pos)
	}

	/**
	 * Moves the selection cursor left with horizontal line wrapping.
	 * (e.g., moving left from index 0 wraps to index 8).
	 */
	moveLeft() {
		const previous_pos = this.getGameCursorPos()
		if (this.caseSelected > 0) {
			this.caseSelected -= 1
		} else {
			this.caseSelected += 8
		}
		this.showGameCursor(previous_pos)
	}

	/**
	 * Moves the selection cursor right with horizontal line wrapping.
	 * (e.g., moving right from index 8 wraps to index 0).
	 */
	moveRight() {
		const previous_pos = this.getGameCursorPos()
		this.caseSelected = (this.caseSelected + 1) % 9
		this.showGameCursor(previous_pos)
	}

	/**
	 * Validates whether terminal window dimensions meet minimum display requirements.
	 * @returns {boolean} `true` if current terminal dimensions are sufficient, otherwise `false`.
	 */
	checkSizeTerminal() {
		const HEIGHT_MIN = 16
		const WIDTH_MIN = 95
		if (getScreenHeight() < HEIGHT_MIN || getScreenWidth() < WIDTH_MIN) {
			return false
		}
		return true
	}
}


