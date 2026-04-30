import { TicTacToe_Game } from "../tictactoe/game.mjs"
import { initKeyboard, initTerminal2DEngine } from "../terminal-engine.mjs"

// Derouler une parti avec des choix defini et confirmer la win ou non

let currentGame = new TicTacToe_Game()

function main() {
	currentGame.startGame()
}

main()