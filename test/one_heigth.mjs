import { Utils } from "../utils.mjs"

function assert(condition, message) {
	const green = "\x1b[32m"
	const red = "\x1b[31m"
	const reset = "\x1b[0m"
	console.log(condition ? `${green}✔ ${message}${reset}` : `${red}✖ ${message}${reset}`)
}

const onePerOne = Utils.center(1,1)
assert(onePerOne === 0,'Est a la premiere ligne')