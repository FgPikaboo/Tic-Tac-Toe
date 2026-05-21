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