import { TicTacToe_Game } from "../../tictactoe/game.mjs"

// Ce fichier s'appelle un test unitaire

// Derouler une parti avec des choix defini et confirmer la win ou non

function assert(condition, message) {
	const green = "\x1b[32m"
	const red = "\x1b[31m"
	const reset = "\x1b[0m"
	console.log(condition ? `${green}✔ ${message}${reset}` : `${red}✖ ${message}${reset}`)
}

function statusToString(status) {
	let status_str
	if (status === TicTacToe_Game.STATUS.P1) {
		status_str = 'P1'
	} else if (status === TicTacToe_Game.STATUS.P2) {
		status_str = 'P2'
	}
	return status_str
}

// Crée une nouvelle partie, et recupere le premier joueur (car aleatoire)
const currentGame = new TicTacToe_Game()
currentGame.startGame()
const firstPlayer = currentGame.getStatus()
console.log(`Le joueur ${statusToString(firstPlayer)} commence`)

// Test du premier tour: Le prochain joueur doit etre different du precedent (le premier)
// X • •
// • • •
// • • •
currentGame.playCurrentTurn(0)
const nextPlayer = firstPlayer === TicTacToe_Game.STATUS.P1 ? TicTacToe_Game.STATUS.P2 : TicTacToe_Game.STATUS.P1
assert(nextPlayer === currentGame.getStatus(), `C'est le tour de ${statusToString(nextPlayer)}`)

// Test des prochains tours avec victoire du premier joueur
// X O O
// X • •
// X • •
currentGame.playCurrentTurn(2)
currentGame.playCurrentTurn(3)
currentGame.playCurrentTurn(1)
currentGame.playCurrentTurn(6) // <-- Victoire, faire le test
const winner = currentGame.checkWinCondition()
assert(typeof(winner) === 'number', 'La condition de victoire est bien remplie')
assert(firstPlayer === winner, `Le joueur qui a commencer la parti qui est: ${statusToString(winner)} a gagné`)