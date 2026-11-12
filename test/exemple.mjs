const greetings = [
    () => { throw new Error('oups') },
    () => console.log('Salut'),
]

for (const greet of greetings) {
	try { greet() 
	} catch (error) { console.log('attrapé :', error.message)
	}
}