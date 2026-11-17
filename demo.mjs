// La démo du bilan : une IA joue deux parties dans ton TicTacToe, sous tes yeux.
// Elle n'appuie sur aucune touche : elle émet 'action', comme ton Controller.
// Lance-la à la racine du projet, comme ton jeu :
//   node demo.mjs 2> log.txt
// Tu n'as rien à changer dans ton code : ce fichier est le seul ajout.
import { register } from 'node:module'
import EventEmitter from 'node:events'
import { initKeyboard, initTerminal2DEngine, drawString, getScreenHeight } from './terminal-engine.mjs'

// Sans « 2> log.txt », les logs du Bus s'écriraient par-dessus le jeu
if (process.stderr.isTTY) {
	console.log('Lance la démo avec : node demo.mjs 2> log.txt')
	process.exit(1)
}

// Le bot Discord est remplacé par un faux, juste pour la démo : il ne se
// connecte pas et ne lit pas config.json. Il garde ce qu'il aurait posté.
// (Ce bloc dit à Node : « quand on importe bot_discord.mjs, donne ce faux ».)
const FAKE_BOT = `import EventEmitter from 'node:events'
export class Bot_Discord extends EventEmitter {
	initBot() {}
	sendMessage(msg) { globalThis.demoBotMessages.push(msg) }
}`
const HOOKS = `export async function resolve(specifier, context, next) {
	if (specifier.endsWith('bot_discord.mjs')) {
		return { url: 'data:text/javascript,' + encodeURIComponent(${JSON.stringify(FAKE_BOT)}), shortCircuit: true }
	}
	return next(specifier, context)
}`
register('data:text/javascript,' + encodeURIComponent(HOOKS))
globalThis.demoBotMessages = []
const { TicTacToe } = await import('./tictactoe/index.mjs')

const PAUSE = 350 // entre deux actions, en millisecondes : le temps de suivre
const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * L'IA : un émetteur de plus. Elle annonce des actions, elle ne sait pas
 * qui les écoute.
 */
class AI extends EventEmitter {

	/**
	 * La case que l'IA joue : une case qui gagne s'il y en a une, sinon une case libre au hasard.
	 * @param {string[]} grid
	 * @param {string} symbol 'X' ou 'O'
	 * @returns {number}
	 */
	chooseCase(grid, symbol) {
		for (const line of LINES) {
			const mine = line.filter((idx) => grid[idx] === symbol)
			const free = line.filter((idx) => grid[idx] === '')
			if (mine.length === 2 && free.length === 1) {
				return free[0]
			}
		}
		const free = []
		for (let idx = 0; idx < 9; idx++) {
			if (grid[idx] === '') {
				free.push(idx)
			}
		}
		return free[Math.floor(Math.random() * free.length)]
	}

	/**
	 * Attend un peu (le temps de suivre), puis émet l'action.
	 * @param {'up'|'down'|'left'|'right'|'confirm'} action
	 */
	async act(action) {
		await wait(PAUSE)
		this.emit('action', action)
	}
}

initTerminal2DEngine()
initKeyboard()
const game = new TicTacToe()
const ai = new AI()

// LA ligne de la démo : Main renvoie les actions du Controller sur le Bus,
// on fait pareil avec celles de l'IA. Le menu et la grille ne voient pas la différence.
ai.on('action', (action) => game.bus.emit('action', action))

// Une ligne en bas de l'écran pour dire ce que fait l'IA. Le jeu efface
// l'écran quand il change d'écran : on la redessine après chaque action.
let info = ''
const say = (text) => {
	info = text
	drawString(1, getScreenHeight() - 1, ' '.repeat(60))
	drawString(1, getScreenHeight() - 1, info)
}
ai.on('action', () => say(info))

let gameOver = false
game.bus.on('game:end', () => {
	gameOver = true
})

game.start()

for (let round = 1; round <= 2; round++) {
	say(`Démo : l'IA va lancer la partie ${round} sur 2`)
	await wait(1500)
	while (game.ui.menu.getMenuOptionSelected() !== 0) {
		await ai.act('up')
	}
	await ai.act('confirm') // Start

	gameOver = false
	while (!gameOver) {
		const symbol = game.currentGame.getStatus() === 1 ? 'X' : 'O'
		say(`Démo : l'IA joue pour ${symbol}`)
		const target = ai.chooseCase(game.currentGame.getValueGrid(), symbol)
		// D'abord la colonne (gauche / droite), puis la ligne (haut / bas)
		while (game.ui.game.getCaseSelected() % 3 < target % 3) {
			await ai.act('right')
		}
		while (game.ui.game.getCaseSelected() % 3 > target % 3) {
			await ai.act('left')
		}
		while (game.ui.game.getCaseSelected() < target) {
			await ai.act('down')
		}
		while (game.ui.game.getCaseSelected() > target) {
			await ai.act('up')
		}
		await ai.act('confirm')
	}

	say('Démo : écran de fin, une action ramène au menu')
	await wait(2500)
	await ai.act('confirm')
}

say('Démo : fini, l\'IA choisit Exit')
await wait(1500)
process.on('exit', () => {
	console.log('Démo finie : 2 parties jouées par une IA qui émet \'action\', sans toucher au clavier.')
	for (const msg of globalThis.demoBotMessages) {
		console.log(`Le bot Discord aurait posté : ${msg}`)
	}
	console.log('Ouvre log.txt : chaque action de l\'IA est passée par le Bus, comme les tiennes.')
})
while (game.ui.menu.getMenuOptionSelected() !== 2) {
	await ai.act('down')
}
await ai.act('confirm') // Exit : ton jeu quitte, comme d'habitude
