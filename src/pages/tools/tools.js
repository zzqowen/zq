import './tools.less';
import $zq from '@/../zq.js';
import {
  domView,
  addEvent,
  delEvent
} from 'tools/utils/dom.js';
console.log($zq, swiper);

var adom = document.getElementById('itemA');
addEvent(adom, 'click', (e) => {
  // console.log(e);
  // $zq.toast('垃圾收到了伐')
  $zq.dialog({
    maskClose: true,
    onCallBack(type) {
      console.log(type);
    }
  });
})

$zq.swiper()