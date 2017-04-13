// Returns a copy of the array without all falsy values (false, null, 0, "", undefined and NaN).
export const compact = (arr) => arr.filter(item => item);

// Extracting a list of property values.
export const pluck = (list, fn) => list.map(item => fn(item));

// Returns the first index where the predicate truth test passes; otherwise returns -1.
export const findIndex = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      return i;
    }
  }
  return -1;
}

// Returns the maximum value in list
export const max = (list, fn) => {
  if (list.length > 0) {
    return list.reduce((result, item) => fn(item, result));
  }
  return -Infinity;
}

// Returns a list of integers from start (inclusive) to stop (exclusive), incremented (or decremented) by step, exclusive.
export const range = (start, stop, step = 1) => {
  let result = [];
  if (stop == undefined) {
    stop = start;
    start = 0;
  }
  let current = start;
  while(current !== stop) {
    result.push(current)
    current += step;
  }
  return result;
}
