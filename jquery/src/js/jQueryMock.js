import { isString, isFunc, isObject, result, generateId } from './utils';

export const $ = (selector) => new jQueryMock(selector);
$.listeners = [];

class jQueryMock {
  constructor(selector) {
    if ( isString(selector) ) {
      this._ctx = Array.from(document.querySelectorAll(selector));
    } else {
      this._ctx = [selector];
    }

    return this;
  }

  find(selector) {
    if ( isString(selector) ) {
      this._ctx = this._ctx.reduce((arr, item) =>
        [...arr, ...Array.from(item.querySelectorAll(selector))], []
      );
    } else {
      this._ctx = selector._ctx.filter(item =>
        this._ctx.some(parent => parent.contains(item))
      );
    }

    return this;
  }

  each(fn) {
    this._ctx.forEach((item, index) => fn(index, item));
    return this;
  }

  attr(attributeName, value) {
    return this._ctx.reduce((memo, item, index) => {
      if (value === undefined) {
        if ( isObject(attributeName) ) {
          for (let attr in attributeName) {
            item[attr] = attributeName[attr];
          }
        } else {
          return memo || item.getAttribute(attributeName);
        }
      } else if (value === null) {
        item.removeAttribute(attributeName);
      } else {
        item[attributeName] = result(value, index);
      }
    }, null) || this;
  }

  hasClass(className) {
    return this._ctx[0].classList.contains(className);
  }

  toggleClass(className, state) {
    const toggle = (item, classes) => item.classList.toggle(classes, state);
    this._ctx.forEach((item, index, arr) => toggle(item, result(className, index, index, arr)));
    return this;
  }

  addClass(className) {
    return this.toggleClass(className, true);
  }

  removeClass(className) {
    return this.toggleClass(className, false);
  }

  // Not implemented if (!selector && data)
  on(events, selector, data, handler) {
    if (handler === undefined) {
      handler = selector;
      selector = null;
    }

    if (selector) {
      this._ctx.forEach(item => {
        item.addEventListener(events, (event) => {
          const items = Array.from(item.querySelectorAll(selector));
          if (items.includes(event.target)) {
            if (data) {
              event.data = data;
            }
            handler(event);
          }
        });

        this._saveEventListener(item, events, handler);
      });
    } else {
      this._ctx.forEach(item => {
        item.addEventListener(events, handler);
        this._saveEventListener(item, events, handler);
      });
    }

    return this;
  }

  // Not implemented if (selector)
  off(events, handler) {
    let predicate;

    if (!events) {
      predicate = (listener, item) =>
        listener.elemId === item.dataset.id;
    } else if (handler) {
      predicate = (listener, item) =>
        listener.elemId === item.dataset.id && listener.events === events && listener.handler === handler;
    } else {
      predicate = (listener, item) =>
        listener.elemId === item.dataset.id && listener.events === events;
    }

    this._ctx.forEach((item) => {
      for (let i = $.listeners.length - 1; i >= 0; i--) {
        if (predicate($.listeners[i], item)) {
          item.removeEventListener($.listeners[i].events, $.listeners[i].handler);
          $.listeners.splice(i, 1);
        }
      }
    });

    return this;
  }

  _saveEventListener(elem, events, handler) {
    let elemId = elem.dataset.id;
    if (!elemId) {
      elemId = generateId('xxxxxx');
      elem.dataset.id = elemId;
    }

    const elemHasListener = $.listeners.some(item =>
      item.elemId === elemId && item.events === events && item.handler === handler
    );

    if (!elemHasListener) {
      $.listeners.push({ elemId, events, handler });
    }
  }
}
