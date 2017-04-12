import BasicRace from './BasicRace';

const MAX_ARROWS_COUNT = 10;
const HUMAN_HP_DECREASE_FOR_ARROW = 5;
const HUMAN_HP_DECREASE_FOR_UNIT_OF_DISTANCE = 0.1;
const MAX_SHOOT_DISTANCE = 90;

const countMap = new WeakMap();

export default class Elf extends BasicRace {
  health = 70;
  power = 20;
  damage = 40;

  constructor(name) {
    super(name);
    countMap.set(this, MAX_ARROWS_COUNT);
  }

  get race() {
    return 'elf';
  }

  get arrowCount() {
    return countMap.get(this);
  }

  shoot(enemy, arrows, distance) {
    if (this.arrowCount === 0) {
      throw new Error(`${this.name} (${this.race}) can not shoot more`);
    } else if ((this.arrowCount - arrows) < 0) {
      console.error(`${this.name} (${this.race}) try to shoot ${arrows} arrows, but can shoot only ${this.arrowCount} arrows. Move does not count towards :(`);
      return;
    } else if (distance > MAX_SHOOT_DISTANCE) {
      console.error(`${this.name} (${this.race}) try to shoot on ${distance} meters, but can shoot only on ${MAX_SHOOT_DISTANCE}. Move does not count towards :(`);
      return;
    }
    countMap.set(this, this.arrowCount - arrows);
    const canStillShootArrows = (this.arrowCount > 0) ? `he can shoot still ${this.arrowCount} arrows` : 'he can not shoot more!!!';
    console.info(`${this.name} (${this.race}) shot ${arrows} arrows on ${distance} (${canStillShootArrows}`);
    enemy.updateHealth(-(Math.floor((arrows * HUMAN_HP_DECREASE_FOR_ARROW) + (distance * HUMAN_HP_DECREASE_FOR_UNIT_OF_DISTANCE))));
  }
}
