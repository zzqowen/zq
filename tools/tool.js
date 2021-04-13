import {
  requestAnimationFrame
} from "./compatibility";

export const isIE = function () {
  return !isNaN(Number(document.documentMode));
};

export const isEdge = function () {
  return window.navigator.userAgent.indexOf('Edge') > -1;
};

export const isFirefox = function () {
  return !!window.navigator.userAgent.match(/firefox/i);
};

export const likeArrToArr = (likeArr) => {
  if (Array.prototype.slice) {
    return Array.prototype.slice.call(likeArr);
  } else {
    let arr = [];
    for (let j = 0; j < likeArr.length; j++) {
      arr.push(likeArr[j])
    };
    return arr;
  }
};

export const isUndefined = function (obj) {
  return typeof obj == 'undefined';
};

export const isBoolean = function (obj) {
  return typeof obj == 'boolean';
};

export const isFunction = function (obj) {
  return typeof obj == 'function';
};

export const isNumber = function (obj) {
  return typeof obj == 'number';
};

export const isString = function (obj) {
  return typeof obj == 'string';
};

export const isObject = function (obj) {
  return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
};

export const isArray = function (obj) {
  return Array.isArray(obj);
};

export const isEmpty = function (val) {
  // null or undefined
  if (val == null) return true;

  if (typeof val === 'boolean') return false;

  if (typeof val === 'number') return !val;

  if (val instanceof Error) return val.message === '';

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length;

      // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size;
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length;
    }
  }

  return false;
};

export const rafThrottle = (fn) => {
  let locked = false;
  return function (...args) {
    if (locked) return;
    locked = true;
    requestAnimationFrame(_ => {
      fn.apply(this, args);
      locked = false;
    });
  };
};