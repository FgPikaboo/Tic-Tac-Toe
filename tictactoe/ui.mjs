import { 
	drawString,
	getScreenHeight,
	getScreenWidth
} from "../terminal-engine.mjs"

export class TicTacToe_UI {

	static MAIN_MENU = [
		'Start game',
		'Exit',
		'Plaisir'
	]

	static TICTACTOE_GRID = {
		WIDTH: 23,
		HEIGHT: 11
	}

	static VERSION = '@MrPikaboo -- VERSION 0.4'
	
	constructor() {
		/** @type {number} */
		this.mainMenuOptionSelected = 0
		/** @type {number} */
		this.caseSelected = 4
	}
	
	/**
	 * Obtiens la position du Menu
	 * @returns {{x: number, y: number}} Position du menu
	 */
	getMenuPos() {
		return { 
			x: Math.ceil((getScreenWidth()/2)-(TicTacToe_UI.MAIN_MENU[0].length/2)),
			y: Math.ceil(getScreenHeight()/2)
		}
	}

	/**
	 * Obtiens la position du TicTacToe
	 * @returns {{x: number, y: number}} Position du TicTacToe
	 */
	getTicTacToePos() {
		const zone_draw_width = Math.ceil(getScreenWidth()*0.75)
		const zone_draw_height = Math.ceil(getScreenHeight()*(2/3))
		const middle_tictactoe_grid = {
			width: zone_draw_width/2,
			height: zone_draw_height/2
		}
		const TIC_TAC_TOE_GRID_WIDTH_HALF = TicTacToe_UI.TICTACTOE_GRID.WIDTH/2
		const TIC_TAC_TOE_GRID_HEIGHT_HALF = TicTacToe_UI.TICTACTOE_GRID.HEIGHT/2
		const middle_half_grid_width = Math.ceil(middle_tictactoe_grid.width - TIC_TAC_TOE_GRID_WIDTH_HALF)
		const middle_half_grid_height = Math.ceil(middle_tictactoe_grid.height - TIC_TAC_TOE_GRID_HEIGHT_HALF)
		/** Return Position 0 of TicTacToe_Grid */
		return {
			x: middle_half_grid_width,
			y: middle_half_grid_height
		}
	}

	/**
	 * Obtiens la position du Ladder
	 * @returns {{x: number, y: number}} Position du Ladder
	 */
	getLadderPos() {
		return { 
			x: Math.ceil((getScreenWidth()/10)*8),
			y: 0
		}
	}

	getGameCursorPos() { } /** Dessine le curseur ingame */

	/**
	 * Affiche le menu
	 */
	showMainScreen() {
		const pos = this.getMenuPos()

		for (let i = 0; i < TicTacToe_UI.MAIN_MENU.length; i++) {
			drawString(pos.x, pos.y + i, TicTacToe_UI.MAIN_MENU[i])
		}
	}

	/** 
	 * Affiche le curseur dans le menu
	 * Supprime egalement l'ancien curseur
	 */
	showMenuCursor(previous) {
		const pos = this.getMenuPos()
		const y = pos.y + this.mainMenuOptionSelected
		const x = pos.x - 2

		if (previous !== undefined) {
			const prevY = pos.y + previous
			drawString(x, prevY, ' ')
		}
		drawString(x, y, '•')
	}

	/**
	 * Permet de descendre dans le menu du jeu
	 */
	moveDown() {
		const previousMainMenuOptionSelected = this.mainMenuOptionSelected
		this.mainMenuOptionSelected = (this.mainMenuOptionSelected + 1) % TicTacToe_UI.MAIN_MENU.length
		this.showMenuCursor(previousMainMenuOptionSelected)
	}

	/**
	 * Permet de monter dans le menu du jeu
	 */
	moveUp() {
		const previousMainMenuOptionSelected = this.mainMenuOptionSelected
		if (this.mainMenuOptionSelected > 0) {
			this.mainMenuOptionSelected -= 1
		} else {
			this.mainMenuOptionSelected = TicTacToe_UI.MAIN_MENU.length - 1
		}
		this.showMenuCursor(previousMainMenuOptionSelected)
	}

	/**
	 * Affiche le jeu (contenant un TicTacToe)
	 */
	showTicTacToe() {
		const pos = this.getTicTacToePos()
		const TIC_TAC_TOE = ['-' , '|']
		const LINE = TicTacToe_UI.TICTACTOE_GRID
		drawString(pos.x , pos.y + (LINE.HEIGHT/3), TIC_TAC_TOE[0].repeat(LINE.WIDTH))
		drawString(pos.x , pos.y + ((LINE.HEIGHT/3)*2), TIC_TAC_TOE[0].repeat(LINE.WIDTH))
		for (let i = 0; i < LINE.HEIGHT; i++) {
			drawString(pos.x + (LINE.WIDTH/3), pos.y + i, TIC_TAC_TOE[1])
			drawString(pos.x + ((LINE.WIDTH/3)*2), pos.y + i, TIC_TAC_TOE[1])
		}
	}

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
	 * Verifie si le terminal a une bonne taille pour eviter le crash
	 * @returns {boolean} Bonne taille ou non
	 */
	checkSizeTerminal() {
		const pos = this.getTicTacToePos()
		if (pos.y < 0) {
			return false
		}
		return true
	}

	/**
	 * Affiche le Ladder
	 */
	showLadder(ladder) {
		const pos = this.getLadderPos()
		const height_y = getScreenHeight()
		const half_to_half_height_y = height_y/4
		const BORDER = ['-', '|']
		drawString(pos.x, pos.y + (half_to_half_height_y*3), BORDER[0].repeat(pos.x))
		for (let i = 0; i < height_y; i++) {
			drawString(pos.x, pos.y + i, BORDER[1])
		}
		this.showLadderInfo(ladder)
	}

	/** 
	 * Affiche les valeurs/données/infos du ladder
	 */
	showLadderInfo(ladder) {
		const pos = this.getLadderPos()
		const height_y = getScreenHeight()
		const half_to_half_height_y = height_y/4

		/** Rank Ladder */
		const rank_ladder = ladder
		const PLAYER = [`Player 1: ${rank_ladder.P1}`,`Player 2: ${rank_ladder.P2}`]
		drawString(pos.x+3, pos.y+2, PLAYER[0])
		drawString(pos.x+3, pos.y+4, PLAYER[1])

		/** Version UI */
		drawString(pos.x+3, height_y-(half_to_half_height_y/2), TicTacToe_UI.VERSION)
	}

	/**
	 * Affiche le curseur dans le jeu
	 */
	showGameCursor() {
		this.getGameCursorPos()
	}

	/**
	 * Affiche l'ecran de fin du jeu (Affichage vainqueur + ladder + press pour continue)
	 */
	showEndGame() { }

	/**
	 * Confirme la case selectionner pour pouvoir le dessiner plus tard
	 * @param {number} idx_case La case choisie
	 */
	setCaseSelected(idx_case) {

	}
	
	/**
	 * Selectionne la case dans le menu du tictactoe
	 * @param {number} idx_menu L'option choisie
	 */
	setMainMenuOptionSelected(idx_menu) { }
}