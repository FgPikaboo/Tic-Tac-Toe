const array = [ 
	'', '', '',
	'3', '', '5',
	'', '', ''
]

const array2 = [ 
	'', '', '',
	'', '', '',
	'', '', ''
]

const isEmpty = (array) => array.some((element) => element !== '') === false

/**
 * Permet de savoir si un tableau est entierement vide ou s'il y a un element remplie
 * @param {array} array Le tableau a verifier
 * @returns {boolean} Si le tableau est vide ou non
 */
function isEmpty2(array) {
	return !array.some(
		(element) => element !== ''
	)
}

console.log('Le tableau est pleine ' , isEmpty2(array))
console.log('Le tableau est vide ' , isEmpty2(array2))