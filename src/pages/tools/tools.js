import './tools.less';
import $zq from '@/../zq.js';
import {
  domView,
  addEvent,
  delEvent
} from 'tools/utils/dom.js';
console.log($zq);

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

  setTimeout(() => {
    $zq.dialog({
      title: '老卡了登记法拉斯科技风',
      maskClose: true,
      onCallBack(type) {
        console.log(type);
      }
    });
  }, 2000)
})

var aa = $zq.swiper('.zq-swiper-container');
console.log(aa);