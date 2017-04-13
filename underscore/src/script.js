import { compact, pluck, findIndex, max, range } from './methods';

const arr = [1, 0, false, 2, '', 3, null, undefined, NaN];

const list = [{
  name: 'moe',
  age: 40
}, {
  name: 'larry',
  age: 50
}, {
  name: 'curly',
  age: 60
}, {
  name: 'jonny',
  age: 'test'
}];

const pluckFn     = (item) => item.age;
const findIndexFn = (item) => !item;

const maxFn = (item, max) => {
  if (item.age > max.age) {
    return item;
  }
  return max;
}

console.log('Compact: '             , compact(arr));                      // [1, 2, 3]
console.log('Pluck: '               , pluck(list, pluckFn));              // [40, 50, 60, "test"]
console.log('FindIndex: '           , findIndex(arr, findIndexFn));       // 1
console.log('FindIndex (nothing): ' , findIndex([1, 3, 4], findIndexFn)); // -1
console.log('Max: '                 , max(list, maxFn));                  // {name: 'curly', age: 60}
console.log('Max (empty array): '   , max([], maxFn));                    // -Infinity
console.log('Range (0, 30, 5): '    , range(0, 30, 5));                   // [0, 5, 10, 15, 20, 25]
console.log('Range (0, -10, -1): '  , range(0, -10, -1));                 // [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
console.log('Range (1, 11): '       , range(1, 11));                      // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log('Range (10): '          , range(10));                         // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log('Range (0): '           , range(0));                          // []