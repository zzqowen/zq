import {
  createElement,
  appendNode,
  removeNode,
  getChildNodes,
  getChildNodesNodeTypeList,
  domView,
  newDom,
  setClassList,
  addEvent,
  getElement,
  getScreenInfo
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

export default (ele, params) => {
  // console.log(el, params)
  let el = domView(ele);

  let {
    title,
    text,
    direction,
    trigger,
    status,
    trangleStatus
  } = params;

  let popoverEl = null;

  title = el.getAttribute('title') || title;
  text = el.getAttribute('text') || text;

  let initDom = () => {
    setClassList(el, 'zq-popover-btn');
    let elChild = getChildNodes(el);
    let referenceEle;
    for (var i = 0, len = elChild.childNodes.length; i < len; i++) {
      var cNode = elChild.childNodes[i];
      if (cNode && cNode.getAttribute && cNode.getAttribute('slot') == 'reference') {
        cNode.removeAttribute('slot');
        if (isEmpty(referenceEle)) referenceEle = cNode;
        elChild.removeChild(cNode)
        continue;
      }
    }
    return {
      reference: referenceEle,
      child: elChild
    }
  }

  let popoverHide = (popoverDom) => {
    status = false;
    popoverDom.css({
      display: 'none',
      top: '-9999px',
      left: 0
    });
  }

  let popoverShow = (popoverDom) => {
    status = true;
    if (!(popoverDom.css('display') == 'none')) {
      popoverHide(popoverDom)
    } else {
      popoverDom.css({
        display: 'block'
      });
      resetPopoverPosition(popoverDom)
    }
  }

  let initMethod = (popoverDom) => {
    if (trigger == 'click') {
      addEvent(el, 'click', function (e) {
        popoverShow(popoverDom)
      }, 'stop');
      addEvent(popoverDom, 'click', function () {

      }, 'stop');
      addEvent(document.body, 'click', function (e) {
        popoverHide(popoverDom)
      })
    }
    if (trigger == 'hover') {
      addEvent(el, 'mouseover', function () {
        popoverShow(popoverDom)
      }, 'stop');
      addEvent(popoverDom, 'mouseover', function () {
        popoverShow(popoverDom)
      }, 'stop');
      addEvent(el, 'mouseout', function () {
        popoverHide(popoverDom)
      }, 'stop');
      addEvent(popoverDom, 'mouseout', function () {
        popoverHide(popoverDom)
      }, 'stop');
    }

    addEvent(window, 'scroll', function () {
      // popoverHide(popoverDom)
      if (status) resetPopoverPosition(popoverDom)
    }, true)
  }

  let resetPopoverPosition = (domEl) => {
    let dom = domEl || popoverEl;

    let screenInfo = getScreenInfo();
    let elInfo = el.offset();
    let selfInfo = dom.offset();
    // console.log(screenInfo, elInfo, selfInfo);

    let drt = direction.split('-')[0];
    let placePos = direction.split('-')[1];

    let trangleSize = 12;

    let topHeight = elInfo.top;
    let bottomHeight = screenInfo.height - elInfo.top - elInfo.height;
    let curHeight = selfInfo.height + trangleSize;

    let leftWidth = elInfo.left;
    let rightWidth = screenInfo.width - elInfo.left - elInfo.width;
    let curWidth = selfInfo.width + trangleSize;

    switch (drt) {
      case 'top':
        if (bottomHeight >= curHeight && topHeight < curHeight) drt = 'bottom';
        break;
      case 'bottom':
        if (topHeight >= curHeight && bottomHeight < curHeight) drt = 'top';
        break;
      case 'left':
        if (rightWidth >= curWidth && leftWidth < curWidth) drt = 'right';
        break;
      case 'right':
        if (leftWidth >= curWidth && rightWidth < curWidth) drt = 'left';
        break;
    }

    let realTop, realLeft;
    switch (drt) {
      case 'top':
        realTop = elInfo.top - curHeight;
        realLeft = elInfo.left - (selfInfo.width - elInfo.width) / 2;
        break;
      case 'bottom':
        realTop = elInfo.top + elInfo.height + trangleSize;
        realLeft = elInfo.left - (selfInfo.width - elInfo.width) / 2;

        break;
      case 'left':
        realTop = elInfo.top - (selfInfo.height - elInfo.height) / 2;
        realLeft = elInfo.left - curWidth;
        break;
      case 'right':
        realTop = elInfo.top - (selfInfo.height - elInfo.height) / 2;
        realLeft = elInfo.left + elInfo.width + trangleSize;
        break;
    }

    if (drt == 'top' || drt == 'bottom') {
      if (placePos == 'start') realLeft = elInfo.left;
      if (placePos == 'end') realLeft = elInfo.left - (selfInfo.width - elInfo.width);
    }

    if (drt == 'left' || drt == 'right') {
      if (placePos == 'start') realTop = elInfo.top;
      if (placePos == 'end') realTop = elInfo.top - (selfInfo.height - elInfo.height);
    }

    // console.log(drt, placePos)

    let removeDrt = drt;
    if (drt == 'left') removeDrt = 'right';
    if (drt == 'right') removeDrt = 'left';
    if (drt == 'top') removeDrt = 'bottom';
    if (drt == 'bottom') removeDrt = 'top';

    setClassList(dom, `zq-popover-${removeDrt} zq-popover-${removeDrt}${placePos ? '-' + placePos : ''}`, 'remove')
    setClassList(dom, `zq-popover-${drt} zq-popover-${drt}${placePos ? '-' + placePos : ''} zq-popover-trangle`);

    dom.css({
      top: realTop + 'px',
      left: realLeft + 'px'
    });
  }

  let popoverPopup = (child) => {
    var popoverBox = newDom('div', 'zq-popover');
    if (child.childNodes.length == 0) {
      popoverBox.innerHTML = `<div class="zq-popover-title">${title}</div>`;
      if (el.getAttribute('title')) el.removeAttribute('title')
    } else appendNode(popoverBox, child);
    return popoverBox;
  }




  let popoverDom = () => {
    let initData = initDom();
    if (!isEmpty(initData.reference)) {
      appendNode(el, initData.reference);
    } else {
      el.innerHTML = text || '';
    }
    let popoverD = popoverPopup(initData.child);
    setClassList(popoverD, !trangleStatus ? `zq-popover-trangle-hidden` : '');
    appendNode(document.body, popoverD);
    popoverEl = popoverD;
    initMethod(popoverD);
    if (status) popoverShow(popoverD)
    return el;
  }

  el.reset = resetPopoverPosition;

  return popoverDom();
}