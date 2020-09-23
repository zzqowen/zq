const getStyle = (ele, attr) => {
  if (ele.currentStyle) {
    return ele.currentStyle[attr];
  } else {
    return getComputedStyle(ele, false)[attr];
  }
}

const addEventListener = (ele, ev, fun) => {
  if (ele.addEventListener) {
    ele.addEventListener(ev, fun, false);
  } else if (ele.attachEvent) {
    ele.attachEvent(`on${ev}`, fun);
  }
}

const removeEventListener = (ele, ev, fun) => {
  if (ele.removeEventListener) {
    ele.removeEventListener(ev, fun, false);
  } else if (ele.attachEvent) {
    ele.detachEvent(`on${ev}`, fun);
  }
}

export {
  getStyle,
  addEventListener,
  removeEventListener
}