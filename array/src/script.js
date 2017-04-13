import { forEach, map, filter, some, every, reduce } from './methods';

let arr = [1, 2, -3, 4, 5];

const REDUCE_INITIAL_VALUE = 2;

const forEachFn = (item, index, arr)       => console.log(`ForEach ${index}: ${item}`);
const mapFn     = (item, index, arr)       => item * item;
const filterFn  = (item, index, arr)       => item > 3;
const someFn    = (item, index, arr)       => item > 0;
const everyFn   = (item, index, arr)       => item > 0;
const reduceFn  = (prev, item, index, arr) => prev + item;

forEach(arr, forEachFn);
console.log( 'Map: '    , map(arr, mapFn) );                               // [1, 4, 9, 16, 25]
console.log( 'Filter: ' , filter(arr, filterFn) );                         // [4, 5]
console.log( 'Some: '   , some(arr, someFn) );                             // true
console.log( 'Every: '  , every(arr, everyFn) );                           // false
console.log( `Reduce (without initial):` , reduce(arr, reduceFn) );        // 9
console.log( `Reduce (initial = ${REDUCE_INITIAL_VALUE}):` , reduce(arr, reduceFn, REDUCE_INITIAL_VALUE) );  // 11
