import { TicTacToe_Game } from "../../tictactoe/game.mjs"

// Ce fichier s'appelle un test unitaire

function assert(condition, message) {
	const green = "\x1b[32m"
	const red = "\x1b[31m"
	const reset = "\x1b[0m"
	console.log(condition ? `${green}✔ ${message}${reset}` : `${red}✖ ${message}${reset}`)
}

const currentGame = new TicTacToe_Game()
currentGame.startGame()
try {
	currentGame.playCurrentTurn(9)
	assert(false, '9 est une valeur autorisée')
} catch (error) {
	assert(true, `9 n\'est pas une valeur autorisée`)
}
try {
	currentGame.playCurrentTurn(-1)
	assert(false, '-1 est une valeur autorisée')
} catch (error) {
	assert(true, `-1 n\'est pas une valeur autorisée`)
}
try {
	currentGame.playCurrentTurn(4)
	assert(true, '4 est une valeur autorisée')
} catch (error) {
	assert(false, `4 n\'est pas une valeur autorisée`)
}