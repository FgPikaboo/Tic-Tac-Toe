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

let recupCase
currentGame.on('refused', (refuse) => {
	recupCase = refuse
})

currentGame.playCurrentTurn(3)
console.log(recupCase)

currentGame.playCurrentTurn(3)
console.log(recupCase)

assert(recupCase === 3, 'Il reconnais bien la double saisie') 