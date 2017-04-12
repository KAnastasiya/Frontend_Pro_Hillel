/**
 * Получение случайного целого неравномерно распределенного числа между min (включительно) и max (не включая max)
 * @param  {Number} min Минимальное значение параметра
 * @param  {Number} max Максимальное значение параметра
 * @return {Number}
 */
export const getRandomParam = (min, max) => {
  let res;
  // Цикл do while исключает получение нуля
  do {
    res = Math.floor((Math.random() * (max - min)) + min);
  } while (!res);
  return res;
};

/**
 * Вычисление времени прохождения некоторой дистанции с заданной скоростью
 * @param  {Number} distance Дистанция
 * @param  {Number} speed    Скорость
 * @return {Number}          Время
 */
export const getTimeByDistanceAndSpeed = (distance, speed) => Math.floor(distance / speed);
