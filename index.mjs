import { initKeyboard, initTerminal2DEngine } from "./terminal-engine.mjs"
import { TicTacToe } from "./tictactoe/index.mjs"

async function main() {
	initTerminal2DEngine()
	initKeyboard()
	const start_program = new TicTacToe()
	start_program.playGame()
}

main()