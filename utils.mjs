import { clearColor, drawString, getScreenHeight, getScreenWidth, setForegroundColor } from "./terminal-engine.mjs"

/**
 * Regroupe les methodes de class utile dans la plupart des programmes
 */
export class Utils {
	/**
	 * Permet de centré un texte dans un bloc donner
	 * @param {number} xBlock Position 0 du bloc
	 * @param {number} y Position hauteur du string
	 * @param {number} blockWidth La longueur total du bloc
	 * @param {string} str Le texte a affiché
	 */
	static drawStringHCentered(xBlock, y, blockWidth, str) {
		const startXString = this.center(blockWidth, str.length)
		drawString(xBlock + startXString, y, str)
	}

	/**
	 * Permet de centré un element dans un block defini
	 * @param {number} blockLength La taille du block
	 * @param {number} elementLength La taille de l'element
	 * @returns La position centré de l'element
	 */
	static center(blockLength, elementLength) {
		const isBlocPair = blockLength % 2 === 0
		const isElementLengthPair = elementLength % 2 === 0
		let ajustDiff = 0

		if (!isBlocPair && isElementLengthPair) {
			ajustDiff += 1
		}
		
		const startPosElement = Math.floor(blockLength/2) - Math.floor(elementLength/2) + ajustDiff
		return startPosElement
	}

	/**
	 * Met la couleur sur la premiere occurance de substr_a_colorie en affichant un drawString
	 * @param {number} posX La position X de la string
	 * @param {number} posY La position Y de la string
	 * @param {string} str La string en entier à afficher
	 * @param {string} substr_a_colorier La partie de string à changer de couleur
	 * @param {any} substr_a_colorier La couleur du foreground
	 */
	static drawStringAndColor(posX, posY, str, substr_a_colorier, couleur) {
		const indexWordFindStart = str.indexOf(substr_a_colorier)
		if (indexWordFindStart < 0) {
			drawString(posX, posY, str)
			return
		}
		const startString = str.substring(0, indexWordFindStart)
		const coloredWord = str.substring(indexWordFindStart, indexWordFindStart + substr_a_colorier.length)
		const endString = str.substring(indexWordFindStart + substr_a_colorier.length)
		drawString(posX, posY, startString)
		setForegroundColor(couleur)
		drawString(posX + startString.length, posY, coloredWord)
		clearColor()
		drawString(posX + startString.length + coloredWord.length, posY, endString)
	}
}