import {clearLRSpace} from './regexp';

export const getStyle = (ele, attr) => {
  if (ele.currentStyle) {
    return ele.currentStyle[attr];
  } else {
    return getComputedStyle(ele, false)[attr];
  }
}

export const addEventListener = (ele, ev, fun, bool) => {
  if (ele.addEventListener) {
    ele.addEventListener(ev, fun, !!bool);
  } else if (ele.attachEvent) {
    ele.attachEvent(`on${ev}`, fun);
  }
}

export const removeEventListener = (ele, ev, fun) => {
  if (ele.removeEventListener) {
    ele.removeEventListener(ev, fun, false);
  } else if (ele.attachEvent) {
    ele.detachEvent(`on${ev}`, fun);
  }
}

export const preventDefault = (e) => {
  let ev = e || window.event;
  if (ev.preventDefault) {
    ev.preventDefault();
  } else {
    ev.returnValue = false;
  }
}

export const requestAnimationFrame = (e) => {
  let id;
  if (!window.requestAnimationFrame) id = setTimeout(e, 17)
  else id = window.requestAnimationFrame(e);
  return id;
}

export const cancelAnimationFrame = (id) => {
  if (!window.cancelAnimationFrame) clearTimeout(id)
  else window.cancelAnimationFrame(id)
}

export const ZObject = {
  assign: function() {
    // console.log(arguments)
    let _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply({}, arguments);
  }
}

export const trim = (str) => {
  if (String.prototype.trim) {
    return str.trim()
  } else {
    return str.replace(clearLRSpace, '')
  }
}