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
