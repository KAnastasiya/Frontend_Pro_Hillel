import BasicRace from './BasicRace';

const MAX_ATTACKS = 5;
const HUMAN_HP_DECREASE = 0.2;

const countMap = new WeakMap();

export default class Orc extends BasicRace {
  health = 40;
  power = 80;
  damage = 130;

  constructor(name) {
    super(name);
    countMap.set(this, MAX_ATTACKS);
  }

  get race() {
    return 'orc';
  }

  get attackCount() {
    return countMap.get(this);
  }

  attack(enemy) {
    if (this.attackCount === 0) {
      throw new Error(`${this.name} (${this.race}) can not attack more`);
    }
    countMap.set(this, this.attackCount - 1);
    const canStillAttack = (this.attackCount > 0) ? `he can attack still ${this.attackCount} times` : 'he can not attack more!!!';
    console.info(`${this.name} (${this.race}) attacked (${canStillAttack})`);
    this.updatePower();
    enemy.updateHealth(-Math.floor(this.power * HUMAN_HP_DECREASE));
  }

  updatePower(delta = 10) {
    const prevPower = this.power;
    this.power += delta;
    console.info(`${this.name} (${this.race}) new power = ${this.power} (${prevPower} + ${delta})`);
  }
}
