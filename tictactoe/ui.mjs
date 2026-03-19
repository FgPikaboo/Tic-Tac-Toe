export class TicTacToe_UI {

	static MAIN_MENU_OPTION = {
		START: 'Start game',
		EXIT: 'Exit'
	}
	
	constructor() {
		/** @type {number} */
		this.mainMenuOptionSelected = 0
		/** @type {number} */
		this.caseSelected = 4
	}
	
	/**
	 * Affiche le menu du tictactoe
	 */
	showMainScreen() {

	}

	/** 
	 * Affiche le curseur dans le menu
	 */
	showMenuCursor() { }

	/**
	 * Affiche le jeu (contenant un TicTacToe et le ladder)
	 */
	showGame() { }

	/**
	 * Affiche le curseur dans le jeu
	 */
	showGameCursor() { }

	/**
	 * Affiche l'ecran de fin du jeu (Affichage vainqueur + ladder + press pour continue)
	 */
	showEndGame() { }

	/**
	 * Dessine la case dans le tictactoe
	 * @param {number} idx_case La case choisie
	 */
	setCaseSelected(idx_case) { }
	
	/**
	 * Selectionne la case dans le menu du tictactoe
	 * @param {number} idx_menu L'option choisie
	 */
	setMainMenuOptionSelected(idx_menu) { }
}