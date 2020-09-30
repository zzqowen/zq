import {
  getStyle,
  addEventListener,
  removeEventListener
} from "../compatibility";
import {
  isUndefined,
  likeArrToArr
} from "../tool";

export const createElement = (tag) => {
  return document.createElement(tag);
}

export const appendNode = (parentNode, childNode) => {
  parentNode.appendChild(childNode);
}

export const removeNode = (parentNode, childNode) => {
  parentNode.removeChild(childNode);
}

export const setClassList = (node, classStr, type) => {
  if (type === "replace") {
    node.setAttribute("class", classStr);
  } else if (type === "remove") {
    let str = node.getAttribute("class").split(" ").filter((item, index) => item != classStr).join(" ");
    node.setAttribute("class", str);
  } else {
    node.setAttribute("class", (node.getAttribute("class") ? node.getAttribute("class") + " " : "") + classStr);
  }
}

export const domView = (ele) => {
  ele.css = (attr, val) => {
    if (val) {
      ele.style[attr] = val;
    } else {
      if (attr instanceof Object) {
        for (var i in attr) {
          ele.style[i] = attr[i];
        }
      } else {
        return getStyle(ele, attr);
      }
    }
  }
  return ele;
}

export const addEvent = (ele, ev, fun, modifiers) => {

  let evListen = (e) => {
    let eve = e || window.event;
    switch (modifiers) {
      case "self":
        if (eve.target == ele) fun(eve);
        break;
      case "once":
        delEvent(ele, ev, evListen);
        fun(eve);
        break;
      case "prevent":
        eve.preventDefault(); //阻止默认事件
        fun(eve);
        break;
      case "stop":
        eve.stopPropagation(); //阻止冒泡
        fun(eve);
        break;
      default:
        fun(eve)
        break;
    }
  };
  addEventListener(ele, ev, evListen);
}

export const delEvent = (ele, ev, fun) => {
  removeEventListener(ele, ev, fun)
}

export const getChildNodes = (parent) => {
  let fragment = document.createDocumentFragment();
  let arr = likeArrToArr(parent.childNodes);
  for (var j = 0; j < arr.length; j++) {
    fragment.appendChild(arr[j])
  };
  return fragment;
}