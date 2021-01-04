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


export default (paramsE, paramsP) => {

  let globalData = {
    activeIndex: 0,
    swiperDirection: 'next',
    defaultTransalte: 0,
    childLength: 0,
    wrapperEl: null
  }

  var touches = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    diff: 0
  };

  var touchEventsData = {
    isTouched: undefined,
    isMoved: undefined,
    allowTouchCallbacks: undefined,
    touchStartTime: undefined,
    isScrolling: undefined,
    currentTranslate: undefined,
    startTranslate: undefined,
    allowThresholdMove: undefined,
    // Form elements to match
    formElements: 'input, select, option, textarea, button, video, label',
    // Last click time
    lastClickTime: now(),
    clickTimeout: undefined,
    // Velocities
    velocities: [],
    allowMomentumBounce: undefined,
    isTouchEvent: undefined,
    startMoving: undefined
  };

  let attachEvents = (dom) => {
    let touchEvent = swiperDom.touchEvents;
    // initButton(dom);
    if (swiperDom.support.touch) {
      addEvent(dom, touchEvent.start, swiperDom.onTouchStart);
      addEvent(dom, touchEvent.move, swiperDom.onTouchMove);
      addEvent(dom, touchEvent.end, swiperDom.onTouchEnd);
      // addEvent(dom, touchEvent.cancel, swiperDom.onTouchEnd);
    } else {
      addEvent(dom, touchEvent.start, swiperDom.onTouchStart);
      addEvent(document, touchEvent.move, swiperDom.onTouchMove);
      addEvent(document, touchEvent.end, swiperDom.onTouchEnd);
    }

  }

  let initButton = (dom) => {
    let swiperBtnPrev = getElement('.zq-swiper-button-prev', dom);
    let swiperBtnNext = getElement('.zq-swiper-button-next', dom);
    for (let prevKey in swiperBtnPrev) {
      let prevItem = swiperBtnPrev[prevKey];
      if (prevItem.nodeType == 1) {
        addEvent(prevItem, 'touchend', swiperButtonPrevEvent, 'stop')
      };
    }

    for (let nextKey in swiperBtnNext) {
      let nextItem = swiperBtnNext[nextKey];
      if (nextItem.nodeType == 1) {
        addEvent(nextItem, 'touchend', swiperButtonNextEvent, 'stop');
      }
    }
  }

  let swiperButtonPrevEvent = () => {
    let sIndex = globalData.activeIndex - 1 < 0 ? 0 : --globalData.activeIndex;
    // console.log('sIndex', sIndex);
    swiperDom.slideTo(sIndex);
  }

  let swiperButtonNextEvent = () => {
    let childLength = globalData.childLength;
    let nIndex = globalData.activeIndex + 1 > childLength - 1 ? childLength - 1 : ++globalData.activeIndex;
    // console.log('nIndex', nIndex);
    swiperDom.slideTo(nIndex)
  }

  let swiperDom = (el, params) => {
    // console.log(el);
    let wrapperElDom = newDom('div', 'zq-swiper-wrapper');
    appendNode(wrapperElDom, getChildNodes(el));
    appendNode(el, wrapperElDom);
    globalData.wrapperEl = wrapperElDom;
    globalData.childLength = getChildNodesNodeTypeList(wrapperElDom).length;
    // console.log(globalData, swiperDom);
    attachEvents(el)
    return el;
  }

  swiperDom.support = {
    touch: !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch),
    pointerEvents: !!window.PointerEvent && 'maxTouchPoints' in window.navigator && window.navigator.maxTouchPoints >= 0,
    observer: function checkObserver() {
      return 'MutationObserver' in window || 'WebkitMutationObserver' in window;
    }(),
    passiveListener: function checkPassiveListener() {
      var supportsPassive = false;

      try {
        var opts = Object.defineProperty({}, 'passive', {
          // eslint-disable-next-line
          get: function get() {
            supportsPassive = true;
          }
        });
        window.addEventListener('testPassiveListener', null, opts);
      } catch (e) { // No support
      }

      return supportsPassive;
    }(),
    gestures: function checkGestures() {
      return 'ongesturestart' in window;
    }()
  };

  swiperDom.touchEvents = (() => {
    var touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
    var desktop = ['mousedown', 'mousemove', 'mouseup'];

    if (swiperDom.support.pointerEvents) {
      desktop = ['pointerdown', 'pointermove', 'pointerup'];
    }

    swiperDom.touchEventsTouch = {
      start: touch[0],
      move: touch[1],
      end: touch[2],
      cancel: touch[3]
    };
    swiperDom.touchEventsDesktop = {
      start: desktop[0],
      move: desktop[1],
      end: desktop[2]
    };
    return swiperDom.support.touch ? swiperDom.touchEventsTouch : swiperDom.touchEventsDesktop;
  })();

  swiperDom.onTouchStart = (e) => {
    // console.log(e);
    preventDefault(e);
    touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX || e.clientX;
    touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY || e.clientY;
    var startX = touches.currentX;
    var startY = touches.currentY;
    touches.startX = startX;
    touches.startY = startY;
    touchEventsData.touchStartTime = now();
    ZObject.assign(touchEventsData, {
      isTouched: true,
      isMoved: false
    })
  }

  swiperDom.onTouchMove = (e) => {
    let {
      childLength,
      defaultTransalte,
      activeIndex
    } = globalData;
    preventDefault(e);
    if (!touchEventsData.isTouched) {
      return;
    }

    var targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
    var pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX || e.clientX;
    var pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY || e.clientY;

    touches.currentX = pageX;
    touches.currentY = pageY;
    var diffX = touches.currentX - touches.startX;
    var diffY = touches.currentY - touches.startY;
    touches.diff = diffX;
    globalData.swiperDirection = diffX < 0 ? 'next' : 'prev'

    // console.log(defaultTransalte, '乐克乐克', activeIndex);
    if ((activeIndex == 0 && globalData.swiperDirection == 'prev') || (activeIndex == childLength - 1 && globalData.swiperDirection == 'next')) diffX /= 2;
    swiperDom.setTransition(defaultTransalte + diffX);
  }

  swiperDom.onTouchEnd = (e) => {
    let {
      childLength,
      defaultTransalte,
      swiperDirection
    } = globalData;
    // console.log(e);
    preventDefault(e);
    ZObject.assign(touchEventsData, {
      isTouched: false,
      isMoved: false
    })
    var touchEndTime = now();
    var timeDiff = touchEndTime - touchEventsData.touchStartTime;

    if (timeDiff < 300 && touchEndTime - touchEventsData.lastClickTime < 300) {
      // console.log("双击事件")
    }

    var speed = 1;
    if (timeDiff > 200) {
      speed = 0;
    }

    var diffX = touches.currentX - touches.startX;
    var diffY = touches.currentY - touches.startY;
    touches.diff = diffX;

    let pos = globalData.wrapperEl.offset().width;
    // console.log(diffX > pos / 3, diffX, pos);
    if (Math.abs(diffX) > 30 && (diffX + speed * pos > pos / 2 || Math.abs(diffX) > pos / 2)) {
      if (swiperDirection == 'next') {
        if (++globalData.activeIndex > childLength - 1) {
          globalData.activeIndex = childLength - 1;
        }
      } else {
        if (--globalData.activeIndex < 0) {
          globalData.activeIndex = 0;
        }
      }

      swiperDom.slideTo(globalData.activeIndex)
    } else {
      swiperDom.setTransition(defaultTransalte, 300);
    }

    touchEventsData.lastClickTime = now();
    // console.log(timeDiff, diffX, speed * pos / 2, pos / 2);

    touches.startX = touches.currentX;
    touches.startY = touches.currentY;

  }

  swiperDom.setTransition = (dis, duration) => {
    // globalData.wrapperEl.css('msTransform', 'translate(' + dis + 'px)');
    // globalData.wrapperEl.css('mozTransform', 'translate(' + dis + 'px)');
    // globalData.wrapperEl.css('oTransform', 'translate(' + dis + 'px)');
    // globalData.wrapperEl.css('webkitTransform', 'translate(' + dis + 'px)');
    // globalData.wrapperEl.css('transform', 'translate(' + (dis  - 10 * (globalData.activeIndex + 1) )+ 'px)');
    // globalData.wrapperEl.css('left', dis + 'px');
    animation(parseFloat(globalData.wrapperEl.css('left')), (dis - 10 * (globalData.activeIndex + 1)), 'Quad.easeInOut', (duration || 0), (val) => {
      globalData.wrapperEl.css('left', val + 'px');
    })
    // globalData.wrapperEl.css('transition-duration', (duration || 0) + 'ms');
    // setTimeout(() => {
    //   globalData.wrapperEl.css('transition-duration', '0ms');
    // }, 300)
  }

  swiperDom.slideTo = (index) => {
    let pos = globalData.wrapperEl.offset().width;
    globalData.defaultTransalte = -pos * index;
    swiperDom.setTransition(globalData.defaultTransalte, 300)
  }

  return swiperDom(paramsE, paramsP);

}