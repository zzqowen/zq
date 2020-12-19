import {
  createElement,
  appendNode,
  removeNode,
  domView,
  setClassList
} from "tools/utils/dom";
import genId from "tools/hash/hashSum";

let index = 0;

let toast = (msg, durtion) => {
  index++;

  //获取当前toast的宽度
  let testDom = createElement("div");
  testDom.innerHTML = msg;
  setClassList(testDom, "zq-toast-box-test zq-toast-box");
  appendNode(document.body, testDom);

  let dom = createElement("div");
  let domContent = createElement("div");
  dom.id = `toast-${index}-${genId(`toast-${index}`)}`;
  setClassList(dom, "zq-toast-box ani-opacity-trans-bottom");
  setClassList(domContent, "zq-toast-content");
  domContent.innerHTML = msg;

  domView(dom).css('width', testDom.offsetWidth + 'px');
  appendNode(dom, domContent);
  appendNode(document.body, dom);
  removeNode(testDom);

  setTimeout(() => {
    setClassList(dom, "opacity-trans-bottom-active");
  }, 1);

  setTimeout(() => {
    setClassList(dom, "opacity-trans-bottom-active", "remove");
    setTimeout(() => {
      removeNode(dom);
    }, 500);
  }, durtion ? durtion : 2000);
}

export default toast;