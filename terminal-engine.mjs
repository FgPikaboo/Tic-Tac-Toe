import console from 'node:console'
import readline from 'node:readline'

/**
 * Terminal Engine
 * - 2D engine, init with initTerminal2DEngine
 * - Keyboard, init with initKeyboard
 * Version: 2.0.0
 */

let _screenHeight = process.stdout.rows
let _screenWidth = process.stdout.columns
/**
 * Graphics buffer
 */
let gfxbuffer = Array(_screenHeight).fill(' '.repeat(_screenWidth))
let bufferchanged = false

/**
 * Draw the gfx buffer
 */
function draw(fps) {
	// Execute la fonction draw une prochaine fois dans X ms, pour afficher une frame tout les Xms, et simuler donc les X FPS
	setTimeout(draw, 1000 / fps)

	// On redessine uniquement si la valeur a changée
	if (bufferchanged) {
		console.clear()
		// '\u001B[?25l' indique à la console qu'on veut cacher le curseur
		process.stdout.write('\u001B[?25l' + gfxbuffer.join('\n'))
		bufferchanged = false
	}
}

/**
 * To use before exiting the program
 * Reput the cursor and clear the console
 */
export function destroy() {
	console.log('\u001B[?25h')
	console.clear()
}

/**
 * Init the Terminal 2D engine with a specific FPS
 * Must be called only once at the start of the program
 * @param {number} fps From 1 to 60 (can be more, but not useful)
 */
export function initTerminal2DEngine(fps) {
	// When we want to exit, we re-show the cursor, we clear the console again, and we exit
	process.on('SIGINT', () => {
		destroy()
		process.exit()
	})
	process.on('SIGWINCH', () => {
		clear()
	})
	draw(fps)
}

/**
 * Clear the screen and remove everything that was draw before
 */
export function clear() {
	_screenHeight = process.stdout.rows
	_screenWidth = process.stdout.columns
	gfxbuffer = Array(_screenHeight).fill(' '.repeat(_screenWidth))
}

/**
 * Init the keyboard input
 * You need to use onkey(fn) to get the controls
 * @param {boolean} [exitOnCtrlC=true] exit the program if Ctrl+C is used
 */
export function initKeyboard(exitOnCtrlC) {
	if (exitOnCtrlC === undefined) exitOnCtrlC = true

	readline.emitKeypressEvents(process.stdin)

	if (process.stdin.isTTY) process.stdin.setRawMode(true)

	if (exitOnCtrlC) {
		process.stdin.on('keypress', (_, key) => {
			if (exitOnCtrlC && key.name === 'c' && key.ctrl) {
				destroy()
				process.exit()
			}
		})
	}
}

/**
 * Execute the function when a key is pressed
 * @param {Function} f Function that will be executed, with its 1st parameter as the key
 */
export function onkey(f) {
	process.stdin.on('keypress', (_, key) => {
		f(key)
	})
}

/**
 * Wait for a specific key, that will be checked inside function
 * @param {Function} f Function that will be executed, with its 1st parameter as the key, should return a boolean true/false
 */
export async function waitOnceKey(f) {
	let _resolve
	const callback = async (_, key) => {
		const resolved = await f(key)
		if (resolved && _resolve) {
			// To prevent calling twice resolve
			_resolve()
			_resolve = null
		}
	}
	const pr = new Promise(resolve => {
		_resolve = resolve
	})
	process.stdin.on('keypress', callback)
	await pr
	process.stdin.off('keypress', callback)
}


/**
 * Draw a string at a specific point in the console
 * @param {number} x 
 * @param {number} y 
 * @param {String} str 
 */
export function drawString(x, y, str) {
	// Rounding
	x = parseInt(x)
	y = parseInt(y)
	if (y >= gfxbuffer.length) return

	// On obtient la ligne précise voulue
	let line = gfxbuffer[y]
	
	// Longueur maximum possible à partir du point voulu
	const max = line.length - x
	// On supprime le restant pour éviter un affichage cassé
	// On remplace aussi les caractères correspondant à un espace par un espace classique (pour éviter les saut de ligne et autre)
	const trimmed = str.substring(0, max).replace(/\s/g, ' ')
	// On place la string voulue dans la ligne, en prenant ce qu'il y avant, puis ce qu'il y a après
	// Cela simule un "remplacement" des caractères
	line = line.substring(0, x) + trimmed.substring(0, max) + line.substring(x + trimmed.length)
	// On la remplace dans le buffer, en faisant attention de ne pas excéder la longueur déjà présente
	gfxbuffer[y] = line.substring(0, gfxbuffer[y].length)
	bufferchanged = true
}

/**
 * Get the current screen height
 * @returns {number} the screen height (in number of characters)
 */
export function getScreenHeight() {
	return _screenHeight
}

/**
 * Get the current screen width
 * @returns {number} the screen width (in number of characters)
 */
export function getScreenWidth() {
	return _screenWidth
}