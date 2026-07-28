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
import { Utils } from '../utils.mjs'

initTerminal2DEngine()

const string = 'Salut, comment VOUS allez ?'

Utils.drawStringAndColor(getScreenWidth()/2, getScreenHeight()/2, string,'VOUS',Theme.PLAYER_COLOR)