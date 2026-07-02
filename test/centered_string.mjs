import { drawString, initKeyboard, initTerminal2DEngine,getScreenHeight,getScreenWidth } from "../terminal-engine.mjs"

initTerminal2DEngine()
initKeyboard()

function getTurnAndInfoMiddlePos() {
	return {
		x: 0,
		y: Math.ceil(((getScreenHeight()/10)*8)-1)
	}
}

function getLimiteTurnAndInfoMiddlePos() {
	return {
		x: Math.ceil(((getScreenWidth()/10)*8)/2),
		y: Math.ceil((((getScreenHeight()/10)*8)-1) + (getScreenHeight()/10))
	}
}

const pos0 = getTurnAndInfoMiddlePos() // position 0 XY de la case
const posMS = getLimiteTurnAndInfoMiddlePos()
console.error(new Date().toISOString(),pos0)
console.error(new Date().toISOString(),posMS)
console.error(new Date().toISOString(),Math.ceil(((getScreenWidth()/10)*8)))


const string = 'rrrrrrrrr'

const ifBlocPair = Math.ceil(((getScreenWidth()/10)*8)) % 2 === 0
const ifStringPair = string.length % 2 === 0
let diff_x = Math.ceil(posMS.x - (string.length/2))

if (ifBlocPair && ifStringPair) {
	console.error(new Date().toISOString(),'Pair & Pair')
	drawString(diff_x ,posMS.y,string)
} else if (ifBlocPair && !ifStringPair) {
	console.error(new Date().toISOString(),'Pair & Impair')
	drawString(diff_x ,posMS.y,string)
} else if (!ifBlocPair && ifStringPair) {
	console.error(new Date().toISOString(),'Impair & Pair')
	drawString(diff_x ,posMS.y,string)
} else if (!ifBlocPair && !ifStringPair) {
	console.error(new Date().toISOString(),'Impair & Impair')
	drawString(diff_x ,posMS.y,string)
}

drawString(pos0.x,pos0.y,'0') // Pos 0 visuellement marqué
drawString(posMS.x,posMS.y,'0') // Pos MS (MiddleString) Visuellement marqué