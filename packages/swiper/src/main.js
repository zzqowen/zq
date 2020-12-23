import {
  createElement,
  appendNode,
  removeNode,
  domView,
  setClassList,
  addEvent
} from "tools/utils/dom";
import {
  isEmpty
} from "tools/tool";
import {
  initElParams
} from "tools/common";
import {
  ZObject
} from 'tools/compatibility';

import genId from "tools/hash/hashSum";
import defaultOptions from "./options";
import SwiperDom from './swiperDom';

let swiper = (el, options) => {
  // console.log(el, options, defaultOptions, ZObject.assign(defaultOptions, options));
  var paramsAll = initElParams(el, ZObject.assign(defaultOptions, options));

  let allSwiper = [];
  for (let i = 0, len = paramsAll.el.length; i < len; i++) {
    let elDom = paramsAll.el[i];
    let curSwiper = new SwiperDom(elDom, paramsAll);
    allSwiper.push(curSwiper);
  }
  return allSwiper.length <= 1 ? allSwiper[0] : allSwiper;
}

export default swiper;