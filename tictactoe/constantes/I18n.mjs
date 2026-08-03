/**
 * Internationalization (i18n) class providing localized strings and dynamic message formatters for the application UI and game engine.
 */
export class I18n {
	// UI_GAME
	static VERSION = '@MrPikaboo -- VERSION 1.0.1'

	// showOrderTurnAndInfo(player)
	static TURN_PLAYER_1 = 'Turn for '
	static TURN_PLAYER_2 = (player) => `player ${player}`
	static RETRY_SEIZURE = 'This position has already been played. Please try again.'

	// showEndGame(winner)
	static WIN_1 = ''
	static WIN_2 = (winner) => `Player ${winner} `
	static WIN_3 = 'won!'
	static DRAW = "It's a draw! Nobody won, let's remaking!"

	// showLadderInfo(ladder)
	static LADDER_1 = 'Player '
	static LADDER_2_PLAYER = (player) => `${player}: `
	static LADDER_3_SCORE = (score) => `${score} ` // Keep trailing space intact

	// UI_MENU
	static START_GAME = 'Start game'
	static RULES = 'Rules'
	static EXIT = 'Exit'
	static RULES_EXPLAIN_1 = 'Rules are simple...'
	static RULES_EXPLAIN_2 = 'Come out of your cave and search on Google!'

	// GAME
	static ERROR_IDX = (idx) => `idx:(${idx}) must be between 0 and 8`
	static ERROR_SAME_SEIZURE = 'This position has already been played. Please try again.'

	// INDEX
	static ERROR_TERMINAL_TOO_SMALL = '\nTerminal window size is too small'
}