import { initTerminal2DEngine, initKeyboard, drawString, getScreenWidth, getScreenHeight } from "../terminal-engine.mjs"
import { TicTacToe_Game } from "../tictactoe/game.mjs"

const currentGame = new TicTacToe_Game()

function getPosEndGame() {
	const zone_draw_width = Math.ceil(getScreenWidth()*0.75)
	const zone_draw_height = Math.ceil(getScreenHeight()*(2/3))
	return {
		x: zone_draw_width/2,
		y: zone_draw_height/2
	}
}

let value_grid_emply = [ 
	'e', 'e', 'e',
	'e', 'a', 'e',
	'e', 'a', 'e'
]

let value_grid = [ 
	'', '', '',
	'', '', '',
	'', '', ''
]

let grid_emply = false
let count_grid = 0

for(let i = 0; i < value_grid.length; i++) {
	if (value_grid[i]) {
		count_grid += 1
		console.log(count_grid)
	}
}

if (count_grid === value_grid.length) {
	grid_emply = true
	console.log('La grille est remplie')
} else { console.log('pas remplie') }

count_grid = 0

for(let j = 0; j < value_grid_emply.length; j++) {
	if (value_grid_emply[j]) {
		count_grid += 1
		console.log(count_grid)
	}
}

if (count_grid === value_grid_emply.length) {
	grid_emply = true
	console.log('La grille est remplie')
} else { console.log('pas remplie') }

if(grid_emply) {
	console.log('la grille est remplie, match nul')
}

// .some