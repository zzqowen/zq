import {
  createElement,
  appendNode,
  removeNode,
  domView,
  setClassList,
  getChildNodes
} from "tools/utils/dom";
import genId from "tools/hash/hashSum";
import scrollBar from "./scrollBar";

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


let scroll = (obj) => {
  let dom = initBox(obj);
  setClassList(dom, defaultId);
  let wrapDom = createElement("div");
  setClassList(wrapDom, "zq-scroll-wrap");
  let viewDom = createElement("div");
  setClassList(viewDom, "zq-scroll-view");

  appendNode(wrapDom, scrollBar(true));
  appendNode(wrapDom, scrollBar(false));
  appendNode(wrapDom, getChildNodes(dom));
  appendNode(viewDom, wrapDom);
  appendNode(dom, viewDom);

  if (domView(wrapDom).css('overflowX') == "auto" || domView(wrapDom).css('overflowX') == "scroll") {
    console.log(domView(wrapDom).css("height"), wrapDom.offsetHeight, 'aaaa')
    domView(wrapDom).css({
      "height": parseFloat(wrapDom.offsetHeight) + 34 + 'px'
    })
  }
}

export default scroll;