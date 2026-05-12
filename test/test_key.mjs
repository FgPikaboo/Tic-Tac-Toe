import { waitOnceKey, initKeyboard } from "../terminal-engine.mjs"

const NAME = {
	DOWN: 'down',
	UP: 'up',
	SPACE: 'space'
}

let move

function waitForMenuSelection(key) {
	switch (key.name) {
		case NAME.DOWN:
			move = 'down'
			console.error(new Date().toISOString(),move)
			break
		case NAME.UP:
			move = 'up'
			console.error(new Date().toISOString(),move)
			break
		case NAME.SPACE:
			move = 'space'
			console.error(new Date().toISOString(),move)
			return true
	}
}

async function main() {
	initKeyboard()

	await waitOnceKey(waitForMenuSelection)
	console.error(new Date().toISOString(),move)
	if (move === 'space') {
		console.log('yes')
	}
}

main()