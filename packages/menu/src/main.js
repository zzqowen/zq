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
import animation from "tools/animation";
const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel';

const defaultId = "zq-menu";

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

let menu = (obj) => {
  let dom = initBox(obj);
}
export default menu;