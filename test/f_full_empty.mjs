const array_full = [ 
	'1', '1', '1',
	'3', '1', '5',
	'1', '1', '1'
]

const array_half = [ 
	'2', '', '',
	'', '2', '',
	'', '', '1'
]

const array_empty = [ 
	'', '', '',
	'', '', '',
	'', '', ''
]

function isFull(array) {
	// .some compare les index si c'est une chaine vide, si y'en a un, renvoie true
	// ajout d'un ! pour renvoyer un true car j'ai voulu parcourir tout le array_full pour verifier si c'est bien tout remplie
	// peut etre ecrit d'une ligne par une fonction anonyme ->
	// const isFull = (array) => !array.some((element) => element === '')
	return !array.some(
		(element) => element === ''
	)
}

// true, false
console.log('Le tableau est remplie' , isFull(array_full))
// false, true
console.log('Le tableau est a moitié remplie' , isFull(array_half))
// false, true
console.log('Le tableau est vide' , isFull(array_empty))