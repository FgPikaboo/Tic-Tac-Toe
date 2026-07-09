import { 
	drawString,
	getScreenHeight,
	getScreenWidth
} from "../../terminal-engine.mjs"
import { Utils } from "../../utils.mjs"

/**
 * @typedef {Object} PosXY
 * @property {number} x - Position sur l'axe horizontal.
 * @property {number} y - Position sur l'axe vertical.
 */

/**
 * @typedef {Object} LadderData
 * @property {number} P1 - Score ou données du Joueur 1.
 * @property {number} P2 - Score ou données du Joueur 2.
 */

/**
 * @typedef {Object} BlockGeometry
 * @property {number} x - La position X (pos0) de départ du bloc.
 * @property {number} y - La position Y (pos0) de départ du bloc.
 * @property {number} width - La largeur du bloc.
 * @property {number} height - La hauteur du bloc.
 */

/**
 * @typedef {Object} Blocks
 * @property {BlockGeometry} upperLeft
 * @property {BlockGeometry} upperRight
 * @property {BlockGeometry} lowerLeft
 * @property {BlockGeometry} lowerRight
 */

/**
 * Gère l'affichage et l'interface utilisateur (UI) du jeu TicTacToe dans le terminal.
 */
export class TicTacToe_Game_UI {

	/** 
	 * Dimensions de la grille de jeu.
	 * @type {{WIDTH: number, HEIGHT: number}} 
	 */
	static TICTACTOE_GRID = {
		WIDTH: 23,
		HEIGHT: 11
	}

	/** 
	 * Version actuelle de l'interface.
	 * @type {string} 
	 */
	static VERSION = '@MrPikaboo -- VERSION 0.27'

	constructor() {
		/**
		 * Indice de la case actuellement sélectionnée (0 à 8).
		 * @type {number} 
		 */
		this.caseSelected = 4
	}

	/**
	 * Récupère l'indice de la case sélectionnée par le joueur.
	 * @returns {number} L'indice de la case (0-8).
	 */
	getCaseSelected() {
		return this.caseSelected
	}

	/**
	 * Calcule la position d'origine (top-left) de la grille du TicTacToe.
	 * La grille est centrée dans la zone de dessin (75% de la largeur, 2/3 de la hauteur).
	 * @returns {PosXY} Position X/Y de la grille.
	 */
	getTicTacToePos() {
		const zone_draw_width = Math.ceil(getScreenWidth()*0.8)
		const middle_tictactoe_grid_width = zone_draw_width/2
		const TIC_TAC_TOE_GRID_WIDTH_HALF = TicTacToe_Game_UI.TICTACTOE_GRID.WIDTH/2
		const posX = Math.floor(middle_tictactoe_grid_width - TIC_TAC_TOE_GRID_WIDTH_HALF)
		const posY = Utils.center(Math.ceil(getScreenHeight()*0.8),TicTacToe_Game_UI.TICTACTOE_GRID.HEIGHT)
		
		// Return Position 0 of TicTacToe_Grid
		return {
			x: posX,
			y: posY
		}
	}

	/**
	 * Obtiens la distance de chaque bloc du terminal
	 * @param {number} width Longueur du terminal pour les tests unitaire uniquement
	 * @param {number} height Hauteur du terminal pour les tests unitaire uniquement
	 * @returns {Blocks} Objets anonymes représentant les 4 blocs
	 */
	getBlocks(width, height) { 
		// Je priviligie Math.ceil plutot que Math.floor car le Tictactoe dois prendre le plus de place
		let longueurMax = width
		let hauteurMax = height

		if (!longueurMax) {
			longueurMax = getScreenWidth()
		}
		if (!hauteurMax) {
			hauteurMax = getScreenHeight()
		}

		return {
			upperLeft: {
				// pos0 du bloc est 
				x: 0 , 
				y: 0 ,
				// La longueur du bloc
				width: Math.ceil(longueurMax*0.8),
				height: Math.ceil(hauteurMax*0.8)
			},
			upperRight: { 
				// pos0 du bloc est 
				x: Math.ceil(longueurMax*0.8) + 1 , // (1 pour la barre du tictactoe)
				y: 0,
				// La longueur du bloc
				width: Math.floor(longueurMax*0.2) - 1, // (1 pour la barre du tictactoe)
				height: Math.ceil(hauteurMax*0.8)
			},
			lowerLeft: { 
				// pos0 du bloc est 
				x: 0 , 
				y: Math.ceil(hauteurMax*0.8) + 1 , // (1 pour la barre du tictactoe)
				// La longueur du bloc
				width: Math.ceil(longueurMax*0.8),
				height: Math.floor(hauteurMax*0.2) - 1 // (1 pour la barre du tictactoe)
			},
			lowerRight: { 
				// pos0 du bloc est 
				x: Math.ceil(longueurMax*0.8) + 1 , // (1 pour la barre du tictactoe) , 
				y: Math.ceil(hauteurMax*0.8) + 1 , // (1 pour la barre du tictactoe)
				// La longueur du bloc
				width: Math.floor(longueurMax*0.2) - 1, // (1 pour la barre du tictactoe)
				height: Math.floor(hauteurMax*0.2) - 1 // (1 pour la barre du tictactoe)
			}
		}
	}

	/**
	 * Calcule la position du texte de fin de partie.
	 * Centré par rapport à la zone de dessin principale.
	 * @returns {PosXY} Position X/Y du texte de fin.
	 */
	getPosEndGame() {
	const zone_draw_width = Math.ceil(getScreenWidth()*0.75)
	const zone_draw_height = Math.ceil(getScreenHeight()*(2/3))
	return {
		x: zone_draw_width/2,
		y: zone_draw_height/2
	}
	}

	/**
	 * Calcule la position exacte du curseur à l'écran en fonction de la case sélectionnée.
	 * @returns {PosXY} Position X/Y du curseur.
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
	 * Dessine les lignes de la grille vide du TicTacToe.
	 */
	showTicTacToe() {
		const pos = this.getTicTacToePos()
		const TICTACTOE_BORDER = ['-' , '|']
		const LINE = TicTacToe_Game_UI.TICTACTOE_GRID
		drawString(pos.x , pos.y + (LINE.HEIGHT/3), TICTACTOE_BORDER[0].repeat(LINE.WIDTH))
		drawString(pos.x , pos.y + ((LINE.HEIGHT/3)*2), TICTACTOE_BORDER[0].repeat(LINE.WIDTH))
		for (let i = 0; i < LINE.HEIGHT; i++) {
			drawString(pos.x + (LINE.WIDTH/3), pos.y + i, TICTACTOE_BORDER[1])
			drawString(pos.x + ((LINE.WIDTH/3)*2), pos.y + i, TICTACTOE_BORDER[1])
		}
	}

	/**
	 * Remplit la grille du TicTacToe avec les symboles des joueurs (X, O ou vide).
	 * @param {Array<string>} value_grid - Tableau contenant l'état des 9 cases.
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
	 * Dessine la structure de la section Ladder (scores) sur le côté droit.
	 * @param {LadderData} ladder - Les données de classement des joueurs.
	 */
	showSeparatorBlocks() {
		const posHeightBarrier = this.getBlocks().upperRight
		const posWidthBarrier = this.getBlocks().lowerLeft
		const BORDER = [ '-' , '|' ]
		drawString(posWidthBarrier.x, posWidthBarrier.y - 1, BORDER[0].repeat(getScreenWidth())) // -1 Pour draw au dessus du block
		for (let i = 0 ; i < getScreenHeight() ; i++) {
			drawString(posHeightBarrier.x, posHeightBarrier.y + i, BORDER[1])
		}
		
	}

	/**
	 * Affiche le texte des scores et la version de l'UI à l'intérieur du Ladder.
	 * @param {LadderData} ladder - Les données de classement des joueurs.
	 */
	showLadderInfo(ladder) {
		const posLadder = this.getBlocks().upperRight
		const posCredit = this.getBlocks().lowerRight
		const barSpacing = 3
		let lineBreak = 0

		/** Rank Ladder */
		const rank_ladder = ladder
		const PLAYER = [`Player 1: ${rank_ladder.P1}`,`Player 2: ${rank_ladder.P2}`]
		for (let i = 0 ; i < PLAYER.length ; i++) {
			lineBreak += 2
			drawString(posLadder.x + barSpacing, posLadder.y + lineBreak, PLAYER[i])
		}

		/** Version UI */
		const posY = this.getBlocks().lowerLeft.y + Utils.center(this.getBlocks().lowerLeft.height , 1)
		drawString(posCredit.x + barSpacing, posY, TicTacToe_Game_UI.VERSION)
	}

	/**
	 * Met à jour visuellement la position du curseur de sélection.
	 * Efface l'ancienne position si elle est fournie.
	 * @param {PosXY} [previous] - L'ancienne position du curseur à effacer.
	 */
	showGameCursor(previous) {
		const pos = this.getGameCursorPos()

		if (previous !== undefined) {
			drawString(previous.x,previous.y,' ')
		}
		drawString(pos.x, pos.y, '•')
	}

	/**
	 * Affichage de l'écran de fin avec le résultat de la partie.
	 * @param {number} winner - `1` pour Joueur 1, `2` pour Joueur 2, `3` pour un match nul.
	 */
	showEndGame(winner) { 
		const pos = this.getPosEndGame()
		if (winner === 1) {
			drawString(pos.x,pos.y,`Le joueur 1 a gagné !!!`)
		} else if (winner === 2) {
			drawString(pos.x,pos.y,`Le joueur 2 a gagné !!!`)
		} else if (winner === 3) {
			drawString(pos.x,pos.y,`Personne n\'a gagné, c\'est TRISTE, on romet !!`)
		} 
	}

	/**
	 * Affiche l'ordre des tours.
	 * @param {number|undefined} player Le joueur actuel ou erreur double saisie
	 */
	showOrderTurnAndInfo(player) {
		// La globalité du calcul te donne 31 alors que la totaliter du block fait 30, voila pourquoi ca marche pas
		// const posY = Math.ceil(this.getBlocks().lowerLeft.y + (this.getBlocks().lowerLeft.height/2))
		const posY = this.getBlocks().lowerLeft.y + Utils.center(this.getBlocks().lowerLeft.height , 1) // 1 car la hauteur de la string est de 1
		const blocWidth = this.getBlocks().lowerLeft.width
		drawString(0, posY, ' '.repeat(blocWidth))
		let showTurnPlayer = ''
		if (player === undefined) {
			showTurnPlayer = `La valeur a deja etais saisie, veuillez recommencer`
		} else {
			showTurnPlayer = `Au tour du joueur ${player}`
		}
		const drawMiddleBoxScreen = Utils.drawStringHCentered(0,posY,blocWidth,showTurnPlayer)
	}

	/**
	 * Déplace le curseur vers le bas avec un bouclage vertical par ligne.
	 * (ex: de la case 8, passe à la case 1).
	 */
	moveDown() {
		const previous_pos = this.getGameCursorPos()
		this.caseSelected = (this.caseSelected + 3) % 9
		this.showGameCursor(previous_pos)
	}

	/**
	 * Déplace le curseur vers le haut avec un bouclage vertical par ligne.
	 * (ex: de la case 1, passe à la case 8).
	 */
	moveUp() {
		const previous_pos = this.getGameCursorPos()
		if (this.caseSelected >= 3) {
			// 3 = Nbs de case dans la colonne
			this.caseSelected -= 3
		} else {
			// 6 = Nbs de case a parcourir pour atteindre la derniere case de la colonne
			this.caseSelected += 6
		}
		this.showGameCursor(previous_pos)
	}

	/**
	 * Déplace le curseur vers la gauche avec un bouclage horizontal par ligne.
	 * (ex: de la case 3, passe à la case 5).
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
	 * Déplace le curseur vers la droite avec un bouclage horizontal par ligne.
	 * (ex: de la case 5, passe à la case 3).
	 */
	moveRight() {
		const previous_pos = this.getGameCursorPos()
		this.caseSelected = (this.caseSelected + 1) % 9
		this.showGameCursor(previous_pos)
	}

	/**
	 * Valide si les dimensions du terminal sont suffisantes pour afficher l'interface.
	 * @returns {boolean} `true` si la taille est correcte, sinon `false`.
	 */
	checkSizeTerminal() {
		const pos = this.getTicTacToePos()
		if (pos.y < 0) {
			return false
		}
		return true
	}

	/**
	 * Enregistre de force l'index de la case sélectionnée (Non implémenté).
	 * @param {number} idx_case - L'index de la case choisie (0-8).
	 */
	setCaseSelected(idx_case) {
		// À implémenter
	}
}


