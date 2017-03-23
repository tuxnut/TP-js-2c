class Poneys {
	/** Set up every poney as a listener of time */
  constructor(deadpool, time) {
    this.energy = Math.floor(Math.random() * 100);
    this.isUnicorn = false;
    this.manager = deadpool;
    this.tickEnergy = 5;
    this.transform();
    this.gainEnergy();
    time.on('tickDayTime', dayTime => {
      if (dayTime === 'day') {
        this.tickEnergy = 5;
      }	else {
        this.tickEnergy = 10;
      }
    });
  }

	/** Every poney will ask to transform every now and then
	*** the issue depends on the energy of the poney and the number of unicorn */
  transform() {
    const tryTransform = setInterval(() => {
      if (this.isUnicorn === false) {
        this.manager.transformUnicorn(this.energy)
				.then(() => {
  this.isUnicorn = true;
  this.energy = 0;
			// If the poney is now an unicorn, no need to keep on asking to transform
  clearInterval(tryTransform);
}, () => {
  this.energy -= 10; // It still exhausts the poney to try to transform
});
      }	else {
				// Should be already cleared
        clearInterval(tryTransform);
      }
    }, Math.floor(Math.random() * 1000) + 3000);
  }

	/** Every poney gains energy. Sometimes, one eats (in the day) a special
  grass that gives it much energy */
  gainEnergy() {
    setInterval(() => {
      this.energy += this.tickEnergy;
      const rand = Math.random() * 100;
      if (rand > 97 && this.tickEnergy === 5) {
        this.energy += 20;
      }
    }, 750);
  }

  getPoneyState() {
    return this.isUnicorn;
  }

  setUnicorn(state) {
    this.isUnicorn = state;
  }
}

module.exports = {Poneys};
