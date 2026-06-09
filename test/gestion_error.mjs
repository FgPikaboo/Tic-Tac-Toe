/**
 * J'utilise la gestion d'erreur pour localiser les errors futur
 */

class gilbert {
	bert(f) {
		// 1.1 --- compare si le parametre f est une fonction ou non 
		// 2.1 --- A une fonction, continue le code
		if (typeof f !== 'function') {
			// 1.2 --- catch vas recuperer l'erreur du throw et s'ejecte de la fonction en cours
			throw new Error('Not Param Function')
			// throw new Error(), execute new Error avant d'etre return par le throw
		}
		// 2.2 --- J'execute le code 
		f()
	}
	err2() {
		// 2.3 --- Je crée une erreur artifitiel pour voir si d'autre erreur surviens
		const s = 'rrr'
		// 2.4 --- L'erreur est crée car c'est une constante qui ne peut pas etre assigner
		s = 's'
	}
	err3() {
		throw new Error('Self Another Error')
	}
	err4() {
		console.log(zzz)
	}
}

const test = new gilbert()

try {
	// 1.0 --- Appelle la fonction avec son parametre
	test.bert() // 2.0 --- si test.bert(err2)
	console.log('e') // 3.0 --- Si aucune erreur est detecter, continue le try pour en trouver, e est afficher
} catch (error) {
	/** 1.3 | 2.5 --- Je documente error pour avoir acces a ses instances
	 * @type {TypeError} Le type est normalement juste une Error, mais pour avoir l'autocompletions, je mets TypeError
	 */
	let error2 = error
	// Grace au nom de l'erreur que j'ai recuperer, je peut comparé ce que j'ai genere
	if (error2.name === 'Error') {
		// 1.4 --- J'ai bien comparé le nom "error" du TypeError
		console.log('Erreur Genere par moi-meme')
	} else {
		// 2.6 --- Gere tout les autres erreur qui m'echappe
		console.log('Erreur interne')
	}
} // Quoi qu'il arrive, a la fin d'un catch, le programme continue