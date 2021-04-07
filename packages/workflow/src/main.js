import {
  initElParams
} from "tools/common";
import {
  createElement,
  appendNode,
  removeNode,
  domView,
  setClassList,
  addEvent
} from "tools/utils/dom";
import defaultOptions from "./options";
import flowDom from './flowDom';

let flowEl = (el) => {
  appendNode(el, new flowDom());
}


export default function (el, options) {
  let paramsAll = initElParams(el, options, defaultOptions);
  for (let i = 0, len = paramsAll.el.length; i < len; i++) {
    let elItem = paramsAll.el[i];
    flowEl(elItem)
  }


  console.log(paramsAll.el);
}