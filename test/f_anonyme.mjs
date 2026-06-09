// This est undefined car il n'y a tout simplement pas d'instance
function abc() {
	console.log('abc',this)
}

// this a pour valeur l'integrale du constructeur (proprieter d'instance) ainsi que le nom de la class lié
class Lettres {

	constructor() {
		this.igloo = 'pingouin'
		this.grenouille = 'croa'
	}

	abc() {
		console.log('abc2',this)
	}
}

// Si this est dans une methode de class, il a pour valeur la class ou il est actuellement
class Lettres2 {
	static abc() {
		console.log('abc3',this)
	}
}

abc()

const frigo = new Lettres()
frigo.abc()
Lettres2.abc()
// .apply applique une instance a une methode d'instance, qui est la methode d'instance frigo
abc.apply(frigo)
// C'est juste la valeur d'un this dans le constructor
console.log(frigo.igloo)