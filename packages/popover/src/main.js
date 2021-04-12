import {
  createElement,
  appendNode,
  removeNode,
  domView,
  setClassList,
  getChildNodes,
  addEvent,
  delEvent
} from "tools/utils/dom";
import {
  isFirefox,
  rafThrottle,
  isEmpty
} from "tools/tool";
import {
  ZObject
} from 'tools/compatibility';
import {
  initElParams
} from "tools/common";
import genId from "tools/hash/hashSum";
import animation from "tools/animation";
import defaultOptions from "./options";
import popoverDom from './popoverDom';

let popover = (el, options) => {
  var paramsAll = initElParams(el, options, defaultOptions);
  // console.log(paramsAll);
  let allPopover = [];
  for (let i = 0, len = paramsAll.el.length; i < len; i++) {
    let elDom = paramsAll.el[i];
    let curPopover = new popoverDom(elDom, paramsAll);
    allPopover.push(curPopover);
  }
  return allPopover.length <= 1 ? allPopover[0] : allPopover;
}
export default popover;