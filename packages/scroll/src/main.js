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
  rafThrottle
} from "tools/tool";
import genId from "tools/hash/hashSum";
import barUtil from "./scrollBar";
import animation from "tools/animation";
const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel';

const defaultId = "zq-scroll-box";

let initBox = (obj) => {
  let dom = null;
  if (obj instanceof Object) {
    if (obj.nodeType === 1) {
      dom = obj;
    };
    !!dom.id && (dom = document.getElementById(id));
  } else if (typeof obj == 'string') {
    let id = obj.split('#').pop();
    dom = document.getElementById(id);
  } else {
    dom = document.getElementById(defaultId);
  };
  if (!dom) throw new Error("节点不存在");
  return dom
}

let updateBar = (barBox, scrollDom) => {
  let {
    thumb,
    map
  } = barBox;
  let move = scrollDom[map.scroll] * 100 / scrollDom[map.scrollSize] + '%'
  let size = scrollDom[map.clientSize] * 100 / scrollDom[map.scrollSize] + "%";
  barUtil.updateBar(thumb, map, move, size == '100%' ? 0 : size);
}

let _mouseWheelHandler = rafThrottle(e => {
  let wrapDom = scroll.wrap;
  const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
  // console.log(delta);
  if (delta > 0) {
    wrapDom.scrollLeft += delta;
  } else {
    wrapDom.scrollLeft += delta;
  }
})

let wheel = (view) => {
  let dom = view || scroll.dom;
  addEvent(dom, mousewheelEventName, _mouseWheelHandler)
}


let scroll = (obj) => {
  let dom = initBox(obj);
  setClassList(dom, defaultId);
  let wrapDom = createElement("div");
  setClassList(wrapDom, "zq-scroll-wrap");
  let viewDom = createElement("div");
  setClassList(viewDom, "zq-scroll-view");
  appendNode(wrapDom, getChildNodes(dom));
  appendNode(viewDom, wrapDom);
  appendNode(dom, viewDom);

  let barBox = barUtil.scrollBar(wrapDom, true);
  let barBoxH = barUtil.scrollBar(wrapDom, false);
  appendNode(dom, barBox.bar);
  appendNode(dom, barBoxH.bar);
  addEvent(wrapDom, 'scroll', (e) => {
    updateBar(barBox, wrapDom);
    updateBar(barBoxH, wrapDom);
  })
  scroll.dom = dom;
  scroll.wrap = wrapDom;
  scroll.viewDom = viewDom;
  scroll.barBox = barBox;
  scroll.barBoxH = barBoxH;

  scroll.update()
  wheel();

  return scroll;
}

scroll.update = () => {
  let viewDom = scroll.viewDom;
  let wrapDom = scroll.wrap;
  let barBox = scroll.barBox;
  let barBoxH = scroll.barBoxH;

  setTimeout(() => {
    updateBar(barBox, wrapDom);
    updateBar(barBoxH, wrapDom);
  })

  if (domView(wrapDom).css('overflowX') == "auto" || domView(wrapDom).css('overflowX') == "scroll") {
    domView(wrapDom).css({
      "height": parseFloat(viewDom.offsetHeight) + 17 + 'px'
    })
  }
}

scroll.scrollTo = (params) => {
  let type = params.type;
  let from = scroll.wrap[type == 'x' ? "scrollLeft" : "scrollTop"];
  let to = params.value;
  animation(from, to, "Quad.easeInOut", (val) => {
    scroll.wrap[type == 'x' ? "scrollLeft" : "scrollTop"] = val
  })
}

export default scroll;