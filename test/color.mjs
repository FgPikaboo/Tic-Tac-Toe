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
} from '../terminal-engine.mjs'

initTerminal2DEngine()
setForegroundColor(COLOR.RED)
drawString(0, 0, 'COLOR.RED on default bg')
setForegroundColor(COLOR.BRIGHT_YELLOW)
drawString(0, 2, 'COLOR.RED on default bg')

setForegroundColor({ red: 220, green: 0, blue: 0 })
drawString(0, 4, 'COLOR.RED on default bg')