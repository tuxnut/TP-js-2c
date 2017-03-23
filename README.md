# TP-js-2c

Rendu du TP javascript

## Contexte

Voici le repository contenant le rendu du TP javascript. On y trouvera notamment 9 fichiers :
 - `.gitignore` : listes des fichiers ignorés par les commit git
 - `deadpool.js` : contient la classe Deadpool
 - `event-handler.js` : permet la liaison entre le main process et le rederer process (pour electron)
 - `index.html` : fichier html ultra basique permettant l'output du rendu
 - `main.js` : point de lancement de l'application
 - `package.json` : permet l'installation des dépendances via `yarn`. La config xo y est aussi renseignée
 - `poney.js` : contient la classe Poneys
 - `spider-man.js` : contient la classe SpiderMan
 - `yarn.lock` : renseigne sur les versions des dépendances utilisées à travers l'application

 ## Installation

Voici les étapes permettant le lancement de l'application :
 - Créez un nouveau dossier :
```sh
mkdir MonNomDeDossier
```
 - Accédez au nouveau dossier créé :
```sh
cd MonNomDeDossier
```
 - Clonez le contenu du repo :
```sh
git clone https://github.com/tuxnut/TP-js-2c
```
 - Accédez au dossier de l'application :
```sh
cd TP-js-2c
```
 - Installez les dépendances de l'application (bluebird et electron) :
```sh
yarn
```
 - Lancez l'application :
```sh
./node_modules/.bin/electron .
```

## Précisions

On détaillera ici les réponses que nous propososn vis-à-vis des 'améliorations' indiquées au sein du sujet du TP :

 - Les poneys gagnent plus d’énergie la nuit : `poney.js : l.11`
 ```js
 if (dayTime === 'day') {
        this.tickEnergy = 5;
      }	else {
        this.tickEnergy = 10;
      }
    });
```
- Deadpool accorde son aide plus facilement, de façon inversement proportionelle au nombre de licornes actuelles  &  Les chances de succès de la transformation en licorne augmentent en corrélation avec le nombre d’énergie emagasinée par le poney  : `deadpool.js : l.37`
 ```js
if (energy > 100 * this.nbUnicorn) {
  this.nbUnicorn++;
```
- L’énergie retombe à 0 lors d’une transformation quelque soit l’issue : `poney.js : l.26 & spider-man.js : l.18`
 ```js
this.isUnicorn = true;
this.energy = 0;
```
```js
this.bff.ranch[poney].setUnicorn(false);
this.bff.ranch[poney].energy = 0;
```
- Si SpiderMan utilise un poney alors ce dernier ne peut pas demander de transformation : `spider-man.js : l.18`
 ```js
this.bff.ranch[poney].setUnicorn(false);
```
- Toute action prend du temps, pensez à utiliser les promises : `deadpool.js : l.37`
 ```js
return new Promise((resolve, reject) => {
```
- SpiderMan et Deadpool sont uniques : `deadpool.js & spider-man.js`
 ```js
let instance = null;
class Deadpool {
  constructor(events) {
    if (!instance) {
      instance = this;
    }
		// Singleton
    return instance;
  }
}
```
- La nuit les gens pas gentils sont plus actifs donc Deadpool a besoin de se régénérer d’autant plus, il faut être prévoyant ! `deadpool.js : l.14 & l.54`
 ```js
 if (dayTime === 'day') {
      this.tickDegeneration = 3;
    }	else {
      this.tickDegeneration = 8;
    }
```
```js
if (this.tickDegeneration === 8 && Math.random() * 100 > 95) {
          const amount = Math.floor(Math.random() * 30);
          this.webContents.send('fightingEvent', amount);
          this.hp -= amount;
```

<h1 style="text-align: center;"> GG & WP </h1>
