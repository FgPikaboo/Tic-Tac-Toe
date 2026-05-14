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
currentGame.playCurrentTurn(0)
try {
	currentGame.playCurrentTurn(0)
	assert(false, 'La meme case a etais joué 2 fois')
} catch (error) {
	assert(true, 'La meme case n\'a pas etais joué 2 fois')
}