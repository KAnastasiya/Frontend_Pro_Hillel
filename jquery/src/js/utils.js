export const isString = val => typeof val === 'string';

export const isFunc = val => typeof val === 'function';

export const isObject = val => typeof val === 'object';

export const result = (prop, ...args) => isFunc(prop) ? prop.apply(null, args) : prop;

export const generateId = str => str.replace(/[xy]/g, c => {
  let r = Math.random() * 16 | 0;
  return (c === 'x' ? r : (r & 0x3 | 0x8 )).toString(16);
});
