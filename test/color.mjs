import {
	initTerminal2DEngine,
	initKeyboard,
	drawString,
	setForegroundColor,
	setBackgroundColor,
	clearColor,
	clear,
	destroy,
	COLOR,
	getScreenHeight,
	getScreenWidth,
} from '../terminal-engine.mjs'
import { Theme } from '../tictactoe/constantes/theme.mjs'
import { I18n } from '../tictactoe/constantes/I18n.mjs'
import { Utils } from '../utils.mjs'

initTerminal2DEngine()

const player_1 = I18n.TURN_PLAYER_1
const player_2 = I18n.TURN_PLAYER_2(1)
const posXString = Utils.center(getScreenWidth(),player_1.length + player_2.length)
drawString(posXString, getScreenHeight()/2, player_1)
setForegroundColor(Theme.PLAYER_COLOR)
drawString(posXString + player_1.length, getScreenHeight()/2, player_2)
clearColor()

/**
let string = 'salut bg aaa'
let a = string.slice(0,6)
let b = string.slice(6,9)
let c = string.slice(9)

const posXString = Utils.center(getScreenWidth(),string.length)

drawString(posXString, 10, a)

setForegroundColor(Theme.PLAYER_COLOR)
drawString(posXString + a.length, 10, b)
clearColor()

drawString(posXString + a.length + b.length, 10, c)
*/