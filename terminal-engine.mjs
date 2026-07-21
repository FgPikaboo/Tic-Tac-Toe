import console from 'node:console'
import readline from 'node:readline'

/**
 * Terminal Engine
 * - 2D engine, init with initTerminal2DEngine
 * - Keyboard, init with initKeyboard
 * Version: 2.1.0
 */

let _screenHeight = process.stdout.rows
let _screenWidth = process.stdout.columns
/**
 * Graphics buffer
 */
let gfxbuffer = Array(_screenHeight).fill(' '.repeat(_screenWidth))
let bufferchanged = false

// Color encoding: high 2 bits = mode, low 24 bits = payload.
// Mode 0 = DEFAULT (terminal default). Mode 1 = 16-color (payload 0-15). Mode 3 = RGB (R<<16 | G<<8 | B).
const MODE_DEFAULT = 0
const MODE_16 = 1 << 24
const MODE_RGB = 3 << 24

/**
 * Named color constants for setForegroundColor / setBackgroundColor.
 * Basic 8 (BLACK..WHITE) map to ANSI 30-37/40-47, bright variants to 90-97/100-107.
 * DEFAULT falls back to the terminal's own default fg/bg.
 */
export const COLOR = {
	DEFAULT:        MODE_DEFAULT,
	BLACK:          MODE_16 | 0,
	RED:            MODE_16 | 1,
	GREEN:          MODE_16 | 2,
	YELLOW:         MODE_16 | 3,
	BLUE:           MODE_16 | 4,
	MAGENTA:        MODE_16 | 5,
	CYAN:           MODE_16 | 6,
	WHITE:          MODE_16 | 7,
	BRIGHT_BLACK:   MODE_16 | 8,
	BRIGHT_RED:     MODE_16 | 9,
	BRIGHT_GREEN:   MODE_16 | 10,
	BRIGHT_YELLOW:  MODE_16 | 11,
	BRIGHT_BLUE:    MODE_16 | 12,
	BRIGHT_MAGENTA: MODE_16 | 13,
	BRIGHT_CYAN:    MODE_16 | 14,
	BRIGHT_WHITE:   MODE_16 | 15,
}

// Current draw state — persists across drawString calls until the next setX / clearColor.
let _fg = MODE_DEFAULT
let _bg = MODE_DEFAULT

// Per-cell color planes, parallel to gfxbuffer. Zero-initialized = MODE_DEFAULT.
let fgbuffer = Array(_screenHeight).fill(null).map(() => new Int32Array(_screenWidth))
let bgbuffer = Array(_screenHeight).fill(null).map(() => new Int32Array(_screenWidth))

// Decode an encoded color into its ANSI SGR foreground sequence.
function emitFg(enc) {
	const mode = enc >>> 24
	const payload = enc & 0xffffff
	if (mode === 0) return '[39m'
	if (mode === 1) return payload < 8
		? `[${30 + payload}m`
		: `[${90 + payload - 8}m`
	// mode 3 = RGB
	return `[38;2;${(payload >> 16) & 0xff};${(payload >> 8) & 0xff};${payload & 0xff}m`
}

// Decode an encoded color into its ANSI SGR background sequence.
function emitBg(enc) {
	const mode = enc >>> 24
	const payload = enc & 0xffffff
	if (mode === 0) return '[49m'
	if (mode === 1) return payload < 8
		? `[${40 + payload}m`
		: `[${100 + payload - 8}m`
	return `[48;2;${(payload >> 16) & 0xff};${(payload >> 8) & 0xff};${payload & 0xff}m`
}

/**
 * Draw the gfx buffer
 */
function draw(fps) {
	// Schedule next frame so the loop runs at ~fps.
	setTimeout(() => draw(fps), 1000 / fps)

	// Only repaint if something changed in the buffer.
	if (!bufferchanged) return

	console.clear()

	// Walk cells row-by-row. Emit an SGR sequence only when fg/bg differs
	// from the previously written cell — a run of same-color cells costs
	// one sequence + N chars, not N * (sequence + char).
	let out = '[?25l'
	let lastFg = -1
	let lastBg = -1
	const h = gfxbuffer.length
	for (let y = 0; y < h; y++) {
		const line = gfxbuffer[y]
		const fgs = fgbuffer[y]
		const bgs = bgbuffer[y]
		const w = line.length
		for (let x = 0; x < w; x++) {
			const fg = fgs[x]
			const bg = bgs[x]
			if (fg !== lastFg) { out += emitFg(fg); lastFg = fg }
			if (bg !== lastBg) { out += emitBg(bg); lastBg = bg }
			out += line[x]
		}
		if (y < h - 1) out += '\n'
	}
	// Reset colors at the end so subsequent stray output stays clean.
	out += '[0m'

	process.stdout.write(out)
	bufferchanged = false
}

/**
 * To use before exiting the program
 * Reput the cursor and clear the console
 */
export function destroy() {
	console.log('[?25h')
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
 * Clear the screen and remove everything that was draw before.
 * Also wipes the color planes back to DEFAULT. Does NOT reset the current
 * setForegroundColor / setBackgroundColor state — use clearColor() for that.
 */
export function clear() {
	_screenHeight = process.stdout.rows
	_screenWidth = process.stdout.columns
	gfxbuffer = Array(_screenHeight).fill(' '.repeat(_screenWidth))
	fgbuffer = Array(_screenHeight).fill(null).map(() => new Int32Array(_screenWidth))
	bgbuffer = Array(_screenHeight).fill(null).map(() => new Int32Array(_screenWidth))
}

/**
 * Set the current foreground color for the next drawString calls.
 * State persists until the next setForegroundColor or clearColor call.
 * @param {number | {red: number, green: number, blue: number}} c
 *   Either a COLOR.* constant (16 named colors) or an RGB literal object
 *   with red/green/blue channels in the 0-255 range.
 */
export function setForegroundColor(c) {
	if (typeof c === 'object' && c !== null) {
		_fg = MODE_RGB | ((c.red & 0xff) << 16) | ((c.green & 0xff) << 8) | (c.blue & 0xff)
	} else {
		_fg = c
	}
}

/**
 * Set the current background color for the next drawString calls.
 * State persists until the next setBackgroundColor or clearColor call.
 * @param {number | {red: number, green: number, blue: number}} c
 *   Either a COLOR.* constant (16 named colors) or an RGB literal object
 *   with red/green/blue channels in the 0-255 range.
 */
export function setBackgroundColor(c) {
	if (typeof c === 'object' && c !== null) {
		_bg = MODE_RGB | ((c.red & 0xff) << 16) | ((c.green & 0xff) << 8) | (c.blue & 0xff)
	} else {
		_bg = c
	}
}

/**
 * Reset the current fg/bg state to DEFAULT without touching the buffer.
 * Next drawString calls will use the terminal's default colors.
 * Unlike clear(), this does not wipe the screen — only the state variables.
 */
export function clearColor() {
	_fg = MODE_DEFAULT
	_bg = MODE_DEFAULT
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
	if (y < 0 || y >= gfxbuffer.length) return

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

	// Stamp current fg/bg state into the color planes for the exact span written.
	const end = Math.min(x + trimmed.length, fgbuffer[y].length)
	if (end > x) {
		fgbuffer[y].fill(_fg, x, end)
		bgbuffer[y].fill(_bg, x, end)
	}

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
