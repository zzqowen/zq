import {
  getStyle,
  addEventListener,
  removeEventListener
} from "../compatibility";
import {likeArrToArr} from "../tool";

const createElement = (tag) => {
  return document.createElement(tag);
}

const appendNode = (parentNode, childNode) => {
  parentNode.appendChild(childNode);
}

const removeNode = (parentNode, childNode) => {
  parentNode.removeChild(childNode);
}

const setClassList = (node, classStr, type) => {
  if (type === "replace") {
    node.setAttribute("class", classStr);
  } else if (type === "remove") {
    let str = node.getAttribute("class").split(" ").filter((item, index) => item != classStr).join(" ");
    node.setAttribute("class", str);
  } else {
    node.setAttribute("class", (node.getAttribute("class") ? node.getAttribute("class") + " " : "") + classStr);
  }
}

const domView = (ele) => {
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

const addEvent = (ele, ev, fun) => {
  addEventListener(ele, ev, fun)
}

const delEvent = (ele, ev, fun) => {
  removeEventListener(ele, ev, fun)
}

const getChildNodes = (parent) => {
  let fragment = document.createDocumentFragment();
  let arr = likeArrToArr(parent.childNodes);
  for (var j = 0; j < arr.length; j++) {
    fragment.appendChild(arr[j])
  };
  return fragment;
}

export {
  createElement,
  appendNode,
  removeNode,
  domView,
  setClassList,
  addEvent,
  delEvent,
  getChildNodes
}