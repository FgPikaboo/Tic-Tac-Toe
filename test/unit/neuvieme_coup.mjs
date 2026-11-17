import { TicTacToe_Game } from "../../tictactoe/game.mjs"
import { Utils } from "../../utils.mjs"

function assert(condition, message) {
	const green = "\x1b[32m"
	const red = "\x1b[31m"
	const reset = "\x1b[0m"
	Utils.log(condition ? `${green}✔ ${message}${reset}` : `${red}✖ ${message}${reset}`)
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

const currentGame = new TicTacToe_Game()
currentGame.startGame()
const firstPlayer = currentGame.getStatus()
Utils.log(`Le joueur ${statusToString(firstPlayer)} commence`)
currentGame.playCurrentTurn(0)
currentGame.playCurrentTurn(1)
currentGame.playCurrentTurn(2)
currentGame.playCurrentTurn(5)
currentGame.playCurrentTurn(8)
currentGame.playCurrentTurn(7)
currentGame.playCurrentTurn(6)
currentGame.playCurrentTurn(3)
currentGame.playCurrentTurn(4)

const winner = currentGame.getWinner()
assert(winner === 1 || winner === 2, 'Trouver un gagnant')

/* Facon mieux faites, a reviser

// X joue 0, 2, 3, 7, puis 6 au 9ᵉ coup : colonne de gauche (0, 3, 6), grille pleine
// O joue 1, 4, 5, 8
// X O X
// X O O
// X X O
const game = new TicTacToe_Game()
game.setFirstPlayer(TicTacToe_Game.WINNER.P2) // le perdant de la « partie d'avant » : X (P1) commence
let winner
game.on('end', (w) => {
	winner = w
})
for (const idx of [0, 1, 2, 4, 3, 5, 7, 8, 6]) {
	game.playCurrentTurn(idx)
}
if (winner === TicTacToe_Game.WINNER.P1) {
	console.log('OK   le 9e coup gagnant donne la victoire à P1')
} else {
	console.log('FAIL le 9e coup gagnant donne :', winner, '(attendu :', TicTacToe_Game.WINNER.P1, ')')
	process.exitCode = 1
}

*/
