import { getTimeByDistanceAndSpeed } from '../utils';

export default class BasicRace {
  health = 100;
  power = 50;
  damage = 15;
  walkingSpeed = 5;
  runningSpeed = 15;

  constructor(name) {
    this.name = name;
  }

  walk(distance) {
    const time = getTimeByDistanceAndSpeed(distance, this.walkingSpeed);
    console.log(`${this.name} walk ${distance}km with speed ${this.walkingSpeed}km/h (time - ${time}h)`);
  }

  run(distance) {
    const time = getTimeByDistanceAndSpeed(distance, this.runningSpeed);
    console.log(`${this.name} run ${distance}km with speed ${this.runningSpeed}km/h (time - ${time}h)`);
  }
}
