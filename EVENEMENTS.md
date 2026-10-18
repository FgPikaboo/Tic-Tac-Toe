| Qui émet   | Événement         | Ce qu'il envoie                         | Qui écoute | Ce que l'écouteur fait                          |
|------------|-------------------|-----------------------------------------|------------|-------------------------------------------------|
| Controller | 'move:menu:input' | 'up', 'down', 'confirm'                 | Main       | fait bouger le menu, ou valide le choix         |
| Controller | 'move:game:input' | 'up', 'down', 'left', 'right', 'confirm'| Main       | fait bouger le curseur de la grille, ou joue    |
| Controller | 'double:confirm'  | rien                                    | Main       | quitte les règles / l'écran de fin              |
| UI menu    | 'menu:option'     | 'start', 'rules', 'exit'                | Main       | lance la partie / affiche les règles / quitte   |
| UI grille  | 'window:work'     | rien                                    | Main       | (rien d'utile : voir ci-dessous)                |
| UI grille  | 'case:chosen'     | l'index de la case (0 à 8)              | Main       | joue le coup dans Game                          |
| Game       | 'turn'            | { grid, nextPlayer }                    | Main       | fait redessiner la grille et « Turn for … »     |
| Game       | 'refused'         | l'index de la case                      | Main       | fait afficher « case déjà jouée »               |
| Game       | 'end'             | le gagnant                              | Main       | ladder, écran de fin, prévient le bot           |
