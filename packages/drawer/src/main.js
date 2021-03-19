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
import DrawerDom from './drawerDom';

let drawer = (el, options) => {
  var paramsAll = initElParams(el, options, defaultOptions);
  console.log(paramsAll);
  let allDrawer = [];
  for (let i = 0, len = paramsAll.el.length; i < len; i++) {
    let elDom = paramsAll.el[i];
    let curSwiper = new DrawerDom(elDom, paramsAll);
    allDrawer.push(curSwiper);
  }
  return allDrawer.length <= 1 ? allDrawer[0] : allDrawer;
}
export default drawer;