import Human from './components/Human';
import Orc from './components/Orc';
import Elf from './components/Elf';
import { getRandomParam } from './utils';

/**
 * Номер текущего хода
 * @type {Number}
 */
let turnNumber;

/**
 * Создание бойца
 * @param  {String} race Тип бойца (его раса)
 * @param  {String} name Имя бойца
 * @return {Object}
 */
const createFighter = (race, name) => {
  switch (race) {
    case 'human':
      return new Human(name);
    case 'orc':
      return new Orc(name);
    case 'elf':
      return new Elf(name);
    default:
      console.error(`It is impossible to create a fighter. Unknown race <${race}>`);
  }
};

/**
 * Делаем ход
 * @param  {Object} fighter Боец, который делает ход
 * @param  {Object} enemy   Противник, который противостоит бойцу
 */
const makeMove = (fighter, enemy) => {
  switch (fighter.race) {
    case 'human':
      fighter.build();
      break;
    case 'orc':
      fighter.attack(enemy);
      break;
    case 'elf':
      fighter.shoot(enemy, getRandomParam(5, 1), getRandomParam(100, 1));
      break;
    default:
      console.error('It is impossible to make a move');
  }
};

/**
 * Определяем победителя
 * @param  {Object} fighter1 1-й боец
 * @param  {Object} fighter2 2-й боец
 * @return {Object}          Победитель боя
 */
const getWinner = (fighter1, fighter2) => (fighter1.health > fighter2.health) ? fighter1 : fighter2;

/**
 * Запуск боя
 * @param  {String} fighterRace1 Тип 1-ого бойца
 * @param  {String} fighterName1 Имя 1-ого бойца
 * @param  {String} fighterRace2 Тип 2-ого бойца
 * @param  {String} fighterName2 Имя 2-ого бойца
 */
const battle = (fighterRace1, fighterName1, fighterRace2, fighterName2) => {
  turnNumber = 100;
  const fighter1 = createFighter(fighterRace1, fighterName1);
  const fighter2 = createFighter(fighterRace2, fighterName2);

  if (fighter1 && fighter2) {
    if (fighter1.race !== fighter2.race) {
      if ((fighter1.race !== 'human') && (fighter2.race !== 'human')) {
        console.error(`Battle between ${fighter1.race} and ${fighter2.race} is impossible. One of the fighters must be a human`);
      } else {
        console.warn('Battle started');
        while (turnNumber > 0) {
          try {
            if (turnNumber % 2) {
              makeMove(fighter2, fighter1);
            } else {
              makeMove(fighter1, fighter2);
            }
            turnNumber -= 1;
          } catch (err) {
            turnNumber = 0;
            console.warn(`Battle stopped. ${err.message}`);
            const winnerIs = getWinner(fighter2, fighter1);
            console.warn(`${winnerIs.name} (${winnerIs.race}) is winner (his health = ${winnerIs.health})!`);
          }
        }
      }
    } else {
      console.error('Battle between two fighters of one race is impossible');
    }
  }
};

/* ----------------------------------------------------- */
battle('elf', 'Argon', 'human', 'Bob');
console.log('*******************************************');
battle('human', 'Bony', 'orc', 'Bolg');
console.log('*******************************************');
battle('orc', 'Bolg', 'elf', 'Argon');     // Battle between orc and elf is impossible. One of the fighters must be a human
console.log('*******************************************');
battle('human', 'Alex', 'human', 'Nick');  // Battle between two fighters of one race is impossible
console.log('*******************************************');
battle('orc', 'Bolg', 'ninja', 'Katty');   // It is impossible to create a fighter. Unknown race <ninja>
