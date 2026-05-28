function abc() {
	console.log('abc',this)
}

class Lettres {

	constructor() {
		this.igloo = 'pingouin'
	}

	abc() {
		console.log('abc2',this)
	}
}

class Lettres2 {
	static abc() {
		console.log('abc3',this)
	}
}

abc()

const frigo = new Lettres()
frigo.abc()
Lettres2.abc()
abc.apply(frigo)
console.log(frigo.igloo)