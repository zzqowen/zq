import {
  getStyle,
  addEventListener,
  removeEventListener
} from "../compatibility";
import {
  isUndefined,
  likeArrToArr
} from "../tool";

export const getElement = (el, context) => {
  let dom = null;
  if (el instanceof Object && el.nodeType === 1) {
    dom = el;
  } else if (typeof el == 'string') {
    dom = isUndefined(context) || !context.querySelectorAll ? document.querySelectorAll(el) : context.querySelectorAll(el);
  }
  if (!dom || dom.length == 0) throw new Error("节点不存在");
  return dom
}

export const createElement = (tag) => {
  return document.createElement(tag);
}

export const appendNode = (parentNode, childNode) => {
  parentNode.appendChild(childNode);
}

export const removeNode = (childNode, parent) => {
  if (childNode.parentNode) childNode.parentNode.removeChild(childNode);
  else parent.removeChild(childNode)
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

export const newDom = (type, classStr, text) => {
  let domNode = createElement(type || 'div');
  setClassList(domNode, classStr);
  domNode.innerHTML = text || ' ';
  return domView(domNode);
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

  ele.offset = () => {
    let el = ele;
    let box = el.getBoundingClientRect();
    let offsetObj = {
      top: box.top,
      left: box.left,
      width: box.width || el.offsetWidth,
      height: box.height || el.offsetHeight
    }
    return offsetObj;
  }

  return ele;
}

export const addEvent = (ele, ev, fun, modifiers) => {

  let evListen = (e) => {
    let eve = e || window.event;
    switch (modifiers) {
      case "self":
        if (eve.target == ele) fun.call(ele, eve);;
        break;
      case "once":
        delEvent(ele, ev, evListen);
        fun.call(ele, eve);
        break;
      case "prevent":
        eve.preventDefault(); //阻止默认事件
        fun.call(ele, eve);
        break;
      case "stop":
        console.log(e, '阻止冒泡');
        eve.stopPropagation(); //阻止冒泡
        fun.call(ele, eve);
        break;
      default:
        fun.call(ele, eve);
        break;
    }
    return ele;
  };

  addEventListener(ele, ev, evListen);
}

export const delEvent = (ele, ev, fun) => {
  removeEventListener(ele, ev, function (e) {
    fun.call(ele, e)
  });
}

export const getChildNodes = (parent) => {
  let fragment = document.createDocumentFragment();
  let arr = likeArrToArr(parent.childNodes);
  for (var j = 0; j < arr.length; j++) {
    fragment.appendChild(arr[j])
  };
  return fragment;
}


export const getChildNodesNodeTypeList = (parent, type) => {
  let nodeType = type || 1;
  let nodeTypeList = [];
  let arr = likeArrToArr(parent.childNodes);
  for (var j = 0; j < arr.length; j++) {
    let item = arr[j];
    if (item.nodeType == nodeType) {
      nodeTypeList.push(item)
    }
  };
  return nodeTypeList;
}