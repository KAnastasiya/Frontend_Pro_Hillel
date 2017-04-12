/**
 * Create DOM-element
 * @param  {String}  type    Type of element
 * @param  {Element} parent  Parent of element
 * @param  {Object}  options Options of element
 * @return {Element}
 */
export const createDOMElement = (type, parent, options) => {
  const elem = document.createElement(type);
  for (let prop in options) {
    if(options.hasOwnProperty(prop)) {
      elem[prop] = options[prop];
    }
  }
  parent.appendChild(elem);
  return elem;
};

/**
 * Convert pseudo-array to array
 * @param  {Object} list
 * @return {Array}
 */
export const convertPreudoArrayToArray = list => Array.from(list);
