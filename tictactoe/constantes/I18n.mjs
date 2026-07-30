/**
 * This class contains static strings for various texts used throughout the application.
 */
export class I18n {
	// UI_GAME
	static VERSION = '@MrPikaboo -- VERSION 0.27'
	// showOrderTurnAndInfo(player)
	static TURN_PLAYER_1 = 'Au tour du '
	static TURN_PLAYER_2 = (player) => `joueur ${player}`
	static RETRY_SEIZURE = `La valeur a deja etais saisie, veuillez recommencer`
	// showEndGame(winner)
	static WIN_1 = 'Le '
	static WIN_2 = (winner) => `joueur ${winner} `
	static WIN_3 = 'a gagné !!!'
	static DRAW = `Personne n\'a gagné, c\'est TRISTE, on romet !!`
	// showLadderInfo(ladder)
	static LADDER_1 = 'Joueur '
	static LADDER_2_PLAYER = (player) => `${player}: `
	static LADDER_3_SCORE = (score) => `${score} ` // /!\ Attention a bien garder l'espace /!\

	// UI_MENU
	static START_GAME = 'Start game'
	static RULES = 'Rules'
	static EXIT = 'Exit'
	static RULES_EXPLAIN_1 = 'Les regles sont simple...'
	static RULES_EXPLAIN_2 = 'Sort de ta grotte et vas rechercher sur Google !!!'

	// GAME
	static ERROR_IDX = (idx) => `idx:(${idx}) dois etre entre 0 et 8`
	static ERROR_SAME_SEIZURE = `La valeur a deja etais saisie, veuillez recommencer`

	// INDEX
	static ERROR_TERMINAL_TOO_SMALL = '\nTaille de la fenetre trop petite'
}