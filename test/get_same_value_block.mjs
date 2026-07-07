import { getScreenHeight, getScreenWidth } from "../terminal-engine.mjs"
import { TicTacToe_Game_UI } from "../tictactoe/ui/game.mjs"

const gameUi = new TicTacToe_Game_UI()

function assert(condition, message) {
	const green = "\x1b[32m"
	const red = "\x1b[31m"
	const reset = "\x1b[0m"
	console.log(condition ? `${green}✔ ${message}${reset}` : `${red}✖ ${message}${reset}`)
}

console.log('First block')
const valueBlock1 = gameUi.getBlock(73,20)
assert(valueBlock1.upperLeft.width === 59, 'La longueur du bloc upperLeft correspond')
assert(valueBlock1.upperLeft.height === 16, 'La hauteur du bloc upperLeft correspond')
assert(valueBlock1.upperRight.width === 13, 'La longueur du bloc upperRight correspond')
assert(valueBlock1.lowerRight.height === 3, 'La hauteur du bloc lowerRight correspond')

console.log('Second block')
const valueBlock2 = gameUi.getBlock(50,16)

assert(valueBlock2.upperLeft.width === 40, 'La longueur du bloc upperLeft correspond')
assert(valueBlock2.upperLeft.height === 13, 'La hauteur du bloc upperLeft correspond')
assert(valueBlock2.upperRight.width === 9, 'La longueur du bloc upperRight correspond')
assert(valueBlock2.lowerRight.height === 2, 'La hauteur du bloc lowerRight correspond')

console.log('Third block')
const valueBlock3 = gameUi.getBlock(100,55)

assert(valueBlock3.upperLeft.width === 80, 'La longueur du bloc upperLeft correspond')
assert(valueBlock3.upperLeft.height === 44, 'La hauteur du bloc upperLeft correspond')
assert(valueBlock3.upperRight.width === 19, 'La longueur du bloc upperRight correspond')
assert(valueBlock3.lowerRight.height === 10, 'La hauteur du bloc lowerRight correspond')

console.log('Pos0 upperLeft')
const pos0_1 = gameUi.getBlock(0,0) 
assert(pos0_1.upperLeft.x === 0, 'La position X est bien placé')
assert(pos0_1.upperLeft.y === 0, 'La position Y est bien placé')

console.log('Pos0 upperRight')
const pos0_2 = gameUi.getBlock(73,0)
assert(pos0_2.upperRight.x === 61, 'La position X est bien placé')
assert(pos0_2.upperRight.y === 0, 'La position Y est bien placé')

console.log('Pos0 lowerLeft')
const pos0_3 = gameUi.getBlock(0,16)
assert(pos0_3.lowerLeft.x === 0, 'La position X est bien placé')
assert(pos0_3.lowerLeft.y === 15, 'La position Y est bien placé')

console.log('Pos0 lowerRight')
const pos0_4 = gameUi.getBlock(73,16)
assert(pos0_4.lowerRight.x === 61, 'La position X est bien placé')
assert(pos0_4.lowerRight.y === 15, 'La position Y est bien placé')

console.log('Pos0')
const pos0_5 = gameUi.getBlock(80,55)
assert(pos0_5.lowerRight.x === 66, 'La position X est bien placé')
assert(pos0_5.lowerRight.y === 46, 'La position Y est bien placé')