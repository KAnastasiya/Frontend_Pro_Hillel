import BasicRace from './BasicRace';

const MAX_BUILD_COUNT = 3;
const MAX_HEALTH = 110;

const countMap = new WeakMap();

export default class Human extends BasicRace {
  health = 80;
  power = 30;
  damage = 10;

  constructor(name) {
    super(name);
    countMap.set(this, MAX_BUILD_COUNT);
  }

  get race() {
    return 'human';
  }

  get buildCount() {
    return countMap.get(this);
  }

  build() {
    if (this.buildCount === 0) {
      throw new Error(`${this.name} (${this.race}) can not build more`);
    }
    countMap.set(this, this.buildCount - 1);
    const canStillBuilld = (this.buildCount > 0) ? `he can build still ${this.buildCount} times` : 'he can not build more!!!';
    console.info(`${this.name} (${this.race}) built (${canStillBuilld})`);
    this.updateHealth();
  }

  updateHealth(delta = 10) {
    const prevHealth = this.health;
    this.health = Math.min((this.health + delta), MAX_HEALTH);
    console.log(`${this.name} (${this.race}) new health = ${this.health} (${prevHealth} + ${delta})`);
  }
}
