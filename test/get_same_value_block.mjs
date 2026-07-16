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
const valueBlock1 = gameUi.getBlocks(73,20)

assert(valueBlock1.upperLeft.width === 59, 'La longueur du bloc upperLeft correspond')
assert(valueBlock1.upperLeft.height === 16, 'La hauteur du bloc upperLeft correspond')
assert(valueBlock1.upperRight.width === 13, 'La longueur du bloc upperRight correspond')
assert(valueBlock1.lowerRight.height === 3, 'La hauteur du bloc lowerRight correspond')

console.log('Second block')
const valueBlock2 = gameUi.getBlocks(50,16)

assert(valueBlock2.upperLeft.width === 40, 'La longueur du bloc upperLeft correspond')
assert(valueBlock2.upperLeft.height === 13, 'La hauteur du bloc upperLeft correspond')
assert(valueBlock2.upperRight.width === 9, 'La longueur du bloc upperRight correspond')
assert(valueBlock2.lowerRight.height === 2, 'La hauteur du bloc lowerRight correspond')

console.log('Third block')
const valueBlock3 = gameUi.getBlocks(100,55)

assert(valueBlock3.upperLeft.width === 80, 'La longueur du bloc upperLeft correspond')
assert(valueBlock3.upperLeft.height === 44, 'La hauteur du bloc upperLeft correspond')
assert(valueBlock3.upperRight.width === 19, 'La longueur du bloc upperRight correspond')
assert(valueBlock3.lowerRight.height === 10, 'La hauteur du bloc lowerRight correspond')

console.log('Fourth block')
const valueBlock4 = gameUi.getBlocks(193,31)

assert(valueBlock4.upperLeft.width === 155, 'La longueur du bloc upperLeft.width correspond')
assert(valueBlock4.upperLeft.height === 25, 'La hauteur du bloc upperLeft.height correspond')
assert(valueBlock4.upperRight.width === 37, 'La longueur du bloc upperRight.width correspond')
assert(valueBlock4.upperRight.height === 25, 'La longueur du bloc upperRight.height correspond')
assert(valueBlock4.lowerLeft.width === 155, 'La longueur du bloc lowerLeft.width correspond')
assert(valueBlock4.lowerLeft.height === 5, 'La longueur du bloc lowerLeft.height correspond')
assert(valueBlock4.lowerRight.width === 37, 'La longueur du bloc lowerRight.width correspond')
assert(valueBlock4.lowerRight.height === 5, 'La longueur du bloc lowerRight.height correspond')

console.log('Pos0 - 1th: Each Block') // Faire marché
assert(valueBlock4.upperRight.x === 157, 'La Pos0 du upperRight.x est correct')
assert(valueBlock4.upperRight.y === 0, 'La Pos0 du upperRight.y est correct')
assert(valueBlock4.lowerLeft.x === 0, 'La Pos0 du lowerLeft.x est correct')
assert(valueBlock4.lowerLeft.y === 27, 'La Pos0 du lowerLeft.y est correct')
assert(valueBlock4.lowerRight.x === 157, 'La Pos0 du lowerRight.x est correct')
assert(valueBlock4.lowerRight.y === 27, 'La Pos0 du lowerRight.y est correct')

console.log('Pos0 - 2th: Each Block')
const valueBlock5 = gameUi.getBlocks(91,20)

assert(valueBlock5.upperRight.x === 75, 'La Pos0 du upperRight.x est correct')
assert(valueBlock5.upperRight.y === 0, 'La Pos0 du upperRight.y est correct')
assert(valueBlock5.lowerLeft.x === 0, 'La Pos0 du lowerLeft.x est correct')
assert(valueBlock5.lowerLeft.y === 18, 'La Pos0 du lowerLeft.y est correct')
assert(valueBlock5.lowerRight.x === 75, 'La Pos0 du lowerRight.x est correct')
assert(valueBlock5.lowerRight.y === 18, 'La Pos0 du lowerRight.y est correct')
