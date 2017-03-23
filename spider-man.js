let instance = null;

class SpiderMan {
  constructor(deadpool) {
    if (!instance) {
      instance = this;
    }
    this.bff = deadpool;
    this.ridePoney();
    return instance;
  }

  ridePoney() {
    setInterval(() => {
      const poney = Math.floor(Math.random() * this.bff.ranch.length);
      if (this.bff.ranch[poney].isUnicorn === true) {
        this.bff.webContents.send('ridingEvent');
        this.bff.ranch[poney].setUnicorn(false);
        this.bff.ranch[poney].energy = 0;
        this.bff.nbUnicorn--;
        setTimeout(() => {
          this.bff.ranch[poney].transform();
        }, 2500);
      }	else if (this.bff.ranch[poney].energy >= 30) {
        this.bff.ranch[poney].energy -= 30;
      } else {
        this.bff.ranch[poney].energy = 0;
      }
    }, Math.floor(Math.random() * 1000) + 3000);
  }
}

module.exports = {SpiderMan};
