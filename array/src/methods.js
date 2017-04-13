export const forEach = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) {
    fn(arr[i], i, arr);
  }
}

export const map = (arr, fn) => {
  let result = [];
  forEach(arr, (item, i, arr) => result.push(fn(item, i, arr)));
  return result;
}

export const filter = (arr, fn) => {
  let result = [];
  forEach(arr, (item, i, arr) => {
    if (fn(item, i, arr)) {
      result.push(item)
    }
  });
  return result;
}

export const some = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i], i, arr)) {
      return true;
    }
  }
  return false;
}

export const every = (arr, fn) => {
  const fnNegate = (item, i, arr) => !fn(arr[i], i, arr);
  return !some(arr, fnNegate);
}

export const reduce = (arr, fn, initialValue) => {
  const array = [...arr];
  let result = (initialValue == undefined) ? array.shift() : initialValue;
  const callback = (item, i, arr) => (result = fn(result, arr[i], i, arr));
  forEach(array, callback);
  return result;
}
