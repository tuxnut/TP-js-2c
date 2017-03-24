// For the singleton design pattern
let instance = null;

class Deadpool {
  constructor(events) {
    if (!instance) {
      instance = this;
    }
    this.hp = Math.floor(Math.random() * 80) + 20;
    this.tickDegeneration = 3;
    this.degenerate();
    this.nbUnicorn = 0;
    events.on('tickDayTime', dayTime => {
      if (dayTime === 'day') {
        this.tickDegeneration = 3;
      }	else {
        this.tickDegeneration = 8;
      }
    });
		// Singleton
    return instance;
  }

	/** So Deadpool knows its ranch */
  setRanch(ranch) {
    this.ranch = ranch;
  }

  setInformWebEvent(webContents) {
    this.webContents = webContents;
  }

	/** +Energy +odds to transform & +nbUnicorn -odds to transform */
  transformToUnicorn(energy) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (energy > 100 * this.nbUnicorn) {
          this.nbUnicorn++;
          this.webContents.send('transformToUnicornEvent');
          resolve();
        }	else {
          reject();
        }
      }, 1000);
    });
  }

	/** Deadpool fights bad guys. Sometimes, at night, he fights a tough guy and
	loses more health */
  degenerate() {
    const degenerate = setInterval(() => {
      this.hp -= this.tickDegeneration;
      if (this.hp > 28) {
        if (this.tickDegeneration === 8 && Math.random() * 100 > 95) {
          const amount = Math.floor(Math.random() * 30);
          this.webContents.send('fightingEvent', amount);
          this.hp -= amount;
        }
      }	else {
        this.regenerate();
      }
    }, 1000);
    if (this.hp <= 0) {
      clearInterval(degenerate);
      this.webContents.send('deadDeadpoolEvent');
      throw new Error('Deadpool is dead !!');
    }
  }

  regenerate() {
    for (const indice in this.ranch) {
      if (this.ranch[indice].isUnicorn === true) {
        setTimeout(() => {
          this.ranch[indice].setUnicorn(false);
          this.ranch[indice].energy = 0;
          this.ranch[indice].transform();
          this.nbUnicorn--;
          const amount = Math.floor(Math.random() * 20) + 25;
          this.hp += amount;
          this.webContents.send('regenEvent', amount);
        }, 999);
        break;
      }
    }
  }
}

module.exports = {Deadpool};
