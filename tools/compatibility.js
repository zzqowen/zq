export const getStyle = (ele, attr) => {
  if (ele.currentStyle) {
    return ele.currentStyle[attr];
  } else {
    return getComputedStyle(ele, false)[attr];
  }
}

export const addEventListener = (ele, ev, fun) => {
  if (ele.addEventListener) {
    ele.addEventListener(ev, fun, false);
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