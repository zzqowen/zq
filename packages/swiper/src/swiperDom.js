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
  now
} from "tools/time";

import {
  ZObject
} from 'tools/compatibility';
import {
  getElement
} from "../../../tools/utils/dom";

var activeIndex = 0;
var swiperDirection = 'next';
var defaultTransalte = 0;
var childLength = 0;

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
  addEvent(dom, touchEvent.start, swiperDom.onTouchStart);
  addEvent(document, touchEvent.move, swiperDom.onTouchMove);
  addEvent(document, touchEvent.end, swiperDom.onTouchEnd);
}

let swiperDom = (el, params) => {
  console.log(el);
  attachEvents(el)
  swiperDom.wrapperEl = domView(getElement('.zq-swiper-wrapper', el)[0]);
  childLength = swiperDom.wrapperEl.childNodes.length;
  console.log(childLength);
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
  touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
  touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
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
  if (!touchEventsData.isTouched) {
    return;
  }

  var targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
  var pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
  var pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;

  touches.currentX = pageX;
  touches.currentY = pageY;
  var diffX = touches.currentX - touches.startX;
  var diffY = touches.currentY - touches.startY;
  touches.diff = diffX;
  swiperDirection = diffX < 0 ? 'next' : 'prev'

  console.log(defaultTransalte, '乐克乐克');
  swiperDom.setTransition(defaultTransalte + diffX);
}

swiperDom.onTouchEnd = (e) => {
  // console.log(e);
  ZObject.assign(touchEventsData, {
    isTouched: false,
    isMoved: false
  })
  var touchEndTime = now();
  var timeDiff = touchEndTime - touchEventsData.touchStartTime;

  if (timeDiff < 300 && touchEndTime - touchEventsData.lastClickTime < 300) {
    console.log("双击事件")
  }

  var speed = 1;
  if (timeDiff > 150) {
    speed = 0;
  }

  var diffX = touches.currentX - touches.startX;
  var diffY = touches.currentY - touches.startY;
  touches.diff = diffX;

  let pos = swiperDom.wrapperEl.offset().width;

  if (diffX + speed * pos > pos / 2) {
    if(swiperDirection == 'next') {
      if (++activeIndex > childLength - 1) {
        activeIndex = childLength -1;
      }
    } else {
      if (--activeIndex < 0) {
        activeIndex = 0;
      }
    }

    swiperDom.slideTo(activeIndex)
  } else {
    swiperDom.setTransition(defaultTransalte, 300);
  }

  touchEventsData.lastClickTime = now();
  console.log(timeDiff, diffX, speed * pos / 2, pos / 2);

  touches.startX = touches.currentX;
  touches.startY = touches.currentY;

}

swiperDom.setTransition = (dis, duration) => {
  console.log(dis)
  swiperDom.wrapperEl.css('transform', 'translate(' + dis + 'px)')
  swiperDom.wrapperEl.css('transition-duration', (duration || 0) + 'ms')
}

swiperDom.slideTo = (index) => {
  let pos = swiperDom.wrapperEl.offset().width;
  console.log(index, 'slide', pos, defaultTransalte);
  defaultTransalte = -pos * index;
  swiperDom.setTransition(defaultTransalte, 600)
}


export default swiperDom