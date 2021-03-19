import {
  createElement,
  appendNode,
  removeNode,
  getChildNodes,
  getChildNodesNodeTypeList,
  domView,
  newDom,
  setClassList,
  addEvent
} from "tools/utils/dom";
import {
  isEmpty
} from "tools/tool";
import {
  now
} from "tools/time";
import animation from "tools/animation";
import {
  ZObject,
  preventDefault,
  getStyle
} from 'tools/compatibility';
import {
  getElement
} from "../../../tools/utils/dom";

export default (el, params) => {
  console.log(el, params)
  var {
    maskClose,
    direction,
    onCallBack,
  } = params;

  function closeDialog(bodyDom, maskDom) {
    setClassList(maskDom, "ani-opacity-active", 'remove');
    setClassList(bodyDom, "ani-drawer-"+ direction +"-active", 'remove');
    setTimeout(() => {
      removeNode(el);
      onCallBack('hide');
    }, 300);
  }

  let initMethods = (bodyDom, maskDom) => {
    el.show = function () {
      appendNode(document.body, el);
      setTimeout(function () {
        setClassList(maskDom, "ani-opacity-active");
        setClassList(bodyDom, "ani-drawer-"+ direction +"-active");
        onCallBack('show');
      }, 1)
    }

    el.hide = function () {
      closeDialog(bodyDom, maskDom);
    }
  }




  let drawerDom = () => {
    // console.log(el);
    let drawerBodyDom = newDom('div', 'zq-drawer-body ani-drawer-' + direction + ' zq-drawer-body-' + params.direction);
    let drawerMaskDom = newDom('div', 'zq-dialog-mask ani-opacity');
    appendNode(drawerBodyDom, getChildNodes(el));
    appendNode(el, drawerMaskDom);
    appendNode(el, drawerBodyDom);
    setClassList(el, 'zq-drawer-container-block'); //默认隐藏 初始化显示
    // removeNode(el);
    onCallBack('init');
    initMethods(drawerBodyDom, drawerMaskDom);

    if (maskClose) {
      addEvent(drawerMaskDom, "click", (e) => {
        closeDialog(drawerBodyDom, drawerMaskDom);
      }, "self");
    }

    return el;
  }

  return drawerDom();
}