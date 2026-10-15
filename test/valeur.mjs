import { I18n } from '../tictactoe/constantes/I18n.mjs'

let salutation = 'salut'
salutation = 'bonjour?'

function afficher(info) {
	console.log(info)
}

afficher(5)                                    // 5                    // le number 5                                          // VRAI
afficher(salutation)                           // 'bonjour?'           // une variable qui contient une string                 // VRAI
afficher({ who: 1, caseSelected: 4 })          // { 1, 4 }             // un objet anonyme qui affiche les valeurs             // FAUX -- { who: 1, caseSelected: 4 }
afficher([1, 4])                               // [ 1, 4 ]             // un tableau avec les valeurs qui sont afficher        // VRAI
afficher(() => { return })                     //                      // l'interieur de la fonction anonyme qui est executer  // FAUX -- [Function (anonymous)] // n'est pas un tableau, c'est juste l'affichage
afficher(I18n.WIN_2('2'))                      // 'joueur 2'           // simplement la string avec l'ajout d'un contexte      // VRAI