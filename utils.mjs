import { drawString } from "./terminal-engine.mjs"

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
		
		const startXElement = Math.floor(blockLength/2) - Math.floor(elementLength/2) + ajustDiff
		return startXElement
	}
}