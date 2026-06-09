export class TicTacToe_Game {
	
	/**
	 * Énumération des états possibles de la partie.
	 * @enum {number}
	 */
	static STATUS = {
		P1: 1,
		P2: 2,
		ENDED: 3
	}

	/**
	 * Énumération des issues possibles d'une partie (Vainqueurs / Match nul).
	 * @enum {number}
	 */
	static WINNER = {
		P1: 1,
		P2: 2,
		DRAW: 3
	}

	/**
	 * Énumération des symboles textuels des joueurs.
	 * @enum {string}
	 */
	static SYMBOLE_PLAYER = {
		P1: 'X',
		P2: 'O'
	}

	constructor() {
		/**
		 * L'état actuel de la partie (En cours pour P1, P2 ou terminée).
		 * @type {number}
		 */
		this.status

		/**
		 * Le résultat ou vainqueur de la partie.
		 * @type {number}
		 */
		this.winner = null

		/**
		 * Tableau représentant l'état des 9 cases de la grille du TicTacToe.
		 * @type {Array<string>}
		 */
		this.value_grid = [ 
			'', '', '',
			'', '', '',
			'', '', ''
		]
	}

	/**
	 * Retourne une copie de sécurité de la grille de jeu actuelle pour éviter les mutations directes.
	 * @returns {string[]} Une copie du tableau des cases.
	 */
	getValueGrid() { 
		return [...this.value_grid] 
	}

	/**
	 * Récupère l'état actuel de la partie.
	 * @returns {number}
	 */
	getStatus() {
		return this.status
	}

	/**
	 * Récupère le vainqueur de la partie.
	 * @returns {number|null}
	 */
	getWinner() {
		return this.winner
	}

	/**
	 * Réinitialise l'état de la grille en vidant toutes les cases.
	 */
	resetValueGrid() {
		this.value_grid.fill('')
	}

	/**
	 * Initialise et lance une nouvelle partie.
	 */
	startGame() {
		this.setFirstPlayer()
	}

	/**
	 * Détermine quel joueur commence la partie.
	 * Si un joueur précédent a gagné, la main passe à son adversaire, sinon le choix est aléatoire.
	 * @param {number|null} [winner] - Le vainqueur de la partie précédente (optionnel).
	 */
	setFirstPlayer(winner) {
		if (winner === TicTacToe_Game.STATUS.P1) {
			this.status = TicTacToe_Game.STATUS.P2
		} else if (winner === TicTacToe_Game.STATUS.P2) {
			this.status = TicTacToe_Game.STATUS.P1
		} else {
			this.status = Math.random() > 0.50 ? TicTacToe_Game.STATUS.P1 : TicTacToe_Game.STATUS.P2
		}
	}

	/**
	 * Applique le coup du joueur actuel sur la case demandée et passe au tour suivant.
	 * @param {number} idx - L'index de la case ciblée (0 à 8).
	 * @throws {Error} Si l'index est hors limites ou si la case est déjà occupée.
	 */
	playCurrentTurn(idx) {
		if (idx > 8 || idx < 0) {
			throw new Error(`idx:(${idx}) dois etre entre 0 et 8`)
		}
		if (this.value_grid[idx] !== '') {
			throw new Error(`La valeur a deja etais saisie, veuillez recommencer`)
		}
		if (this.status === TicTacToe_Game.STATUS.P1) {
			this.value_grid[idx] = TicTacToe_Game.SYMBOLE_PLAYER.P1
		} else {
			this.value_grid[idx] = TicTacToe_Game.SYMBOLE_PLAYER.P2
		}
		this._checkWinCondition()
		if (!(this.status === TicTacToe_Game.STATUS.ENDED)) {
			if (this.status === TicTacToe_Game.STATUS.P1) {
				this.status = TicTacToe_Game.STATUS.P2
			} else {
				this.status = TicTacToe_Game.STATUS.P1
			}
		}
	}

	/**
	 * Analyse la grille pour valider s'il y a un vainqueur ou un match nul.
	 * Modifie directement le statut et le vainqueur de l'instance.
	 * @private
	 */
	_checkWinCondition() {
		const isFull = (array) => !array.some((element) => element === '')
		if (isFull(this.value_grid)) {
			this.winner = TicTacToe_Game.WINNER.DRAW
			this.status = TicTacToe_Game.STATUS.ENDED
			return
		}
		const isDiagonalWin = (this.value_grid[0] === this.value_grid[4]) &&
			(this.value_grid[0] === this.value_grid[8]) && 
			this.value_grid[0] !== ''
		const isOtherDiagonalWin = (this.value_grid[2] === this.value_grid[4]) && 
			(this.value_grid[2] === this.value_grid[6]) && 
			this.value_grid[2] !== ''
		if (isDiagonalWin || isOtherDiagonalWin) {
			this.winner = this.status
			this.status = TicTacToe_Game.STATUS.ENDED
			return
		} 
		for (let n = 0; n < this.value_grid.length; n++) {
			const isHorizontalWin = (n < this.value_grid.length - 2) && 
				(n % 3 === 0) && 
				(this.value_grid[n] === this.value_grid[n + 1]) && 
				(this.value_grid[n] === this.value_grid[n + 2]) &&
				this.value_grid[n] !== ''
			const isVerticalWin = (n < this.value_grid.length - 6) && 
				(n % 3 === n) && 
				(this.value_grid[n] === this.value_grid[n + 3]) && 
				(this.value_grid[n] === this.value_grid[n + 6]) &&
				this.value_grid[n] !== ''
			if (isHorizontalWin || isVerticalWin) {
				this.winner = this.status
				this.status = TicTacToe_Game.STATUS.ENDED
				return
			}
		}
	}
}