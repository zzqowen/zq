import {
  createElement,
  appendNode,
  removeNode,
  domView,
  setClassList,
  addEvent,
  delEvent
} from "tools/utils/dom";

import {
  barMap
} from "./util";

let scrollBar = function (type) {
  var map = barMap[type ? 'vertical' : 'horizontal']
  var bar = createElement("div");
  setClassList(bar, 'zq-scrollbar__bar ' + 'zq-scrollbar__' + map.key)
  var thumb = createElement('div');
  setClassList(thumb, 'zq-scrollbar__thumb ' + 'zq-scrollbar-thumb__' + map.key)
  appendNode(bar, thumb);
  return bar;
}

export default scrollBar;