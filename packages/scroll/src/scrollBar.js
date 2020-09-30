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

let initBar = (map) => {
  let bar = createElement("div");
  setClassList(bar, 'zq-scrollbar__bar ' + 'zq-scrollbar__' + map.key)
  let thumb = createElement('div');
  setClassList(thumb, 'zq-scrollbar__thumb ' + 'zq-scrollbar-thumb__' + map.key)
  appendNode(bar, thumb);
  return [bar, thumb];
}

let updateBar = (thumb, map, move, size) => {
  let dom = domView(thumb);
  dom.css(map.size, size);
  dom.css(map.direction, move);
}

let eventThumb = (wrapDom, bar, thumb, map) => {
  let cursorDown = false;

  let pre = 0;
  addEvent(thumb, "mousedown", (e) => {
    e.stopImmediatePropagation();
    cursorDown = true;
    pre = e[map.client] - thumb[map.offset];
    document.onselectstart = () => false;

    addEvent(document, "mousemove", (e) => {
      let barSize = bar[map.offsetSize];
      let thumbSize = thumb[map.offsetSize];
      if (cursorDown) {
        let dis = e[map.client] - pre;
        let percentSize = dis < 0 ? 0 : Math.min(dis, (barSize - thumbSize)) * 100 / barSize;
        updateBar(thumb, map, percentSize + '%');
        wrapDom[map.scroll] = percentSize == 0 ? 0 : wrapDom[map.scrollSize] * (percentSize / 100);
      }
    });
    addEvent(document, "mouseup", (e) => {
      cursorDown = false;
      document.onselectstart = null;
    });
  });
}

let scrollBar = function (wrapDom, type) {
  var map = barMap[type ? 'vertical' : 'horizontal'];
  let barArr = initBar(map);
  let bar = barArr[0];
  let thumb = barArr[1];
  eventThumb(wrapDom, bar, thumb, map);
  return {
    bar,
    thumb,
    map
  };
}

export default {
  scrollBar,
  updateBar
};