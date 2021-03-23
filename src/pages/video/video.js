import './video.less';
import $zq from '@/../zq.js';
import {
  domView,
  addEvent,
  delEvent
} from 'tools/utils/dom.js';
import tools from 'src/utils/tools.js';
import http from 'src/utils/http.js';

console.log(http)

var customUserAgent = 'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25';

// Object.defineProperty(navigator, 'userAgent', {
//   value: customUserAgent,
//   writable: false
// });

tools.setUserAgent(window, customUserAgent);

console.log(navigator.userAgent);


var searchBtn = document.getElementById('search-btn');
var searchInput = document.getElementById('search-input');
var videoContent = document.getElementById('zq-video-content');

addEvent(searchBtn, 'click', function (e) {
  var val = searchInput.value;
  if (tools.isEmpty(val)) {
    return $zq.toast('请输入检索条件');
  }
  http({
    method: 'GET',
    url: '/api/search',
    data: {
      keyword: val
    },
    success: function(res) {
      console.log(res);
      if (res.code != 0) {
        $zq.toast(res.message);
      } else {
        var html = ''
        for (var i = 0,len = res.data.length; i<len; i++) {
          var item = res.data[i];
          html += '<div><a href="'+ item.url +'"><img src="'+ item.logo +'" alt=""/><div>'+ item.title +'</div></a></div>'
        }

        videoContent.innerHTML = html;
      }
    }
  })
});


// $zq.video('video-zq', {controls: true, language: 'zh-cn'}, function(e) {
//   // this.src('http://vjs.zencdn.net/v/oceans.mp4')
//   this.src('https://lmbsy.qq.com/k022445cv0s.p201.1.mp4?platform=10201&vkey=0B961F61D503777101296DCE1623891DA0E4A6D89209CD22595BACF77C2E11363ED8D82AE64D44C16DC51D4A2745BE43B79AD93402A714B8CAB67BDBDC0CC560106FA79BC319E394EE27AA01EB464DA5FB1E3F1B734F0B6BEE2E755408AF60EF55301596E751124CBE5CD1D98AA7187C9606ABC080DEB92F&sdtfrom=&fmt=shd&level=0')
//   console.log(this);
//   // this.play()
// })

// var element = new Image();
// Object.defineProperty(element, 'id', {
//   get: function () {
//     window.location.href = "http://baidu.com"
//   }
// });
// alert(element)
// console.log(element);

// var dd = $zq.drawer({
//   el: '#zq-drawer',
//   onCallBack: function (type) {
//     console.log(type);
//   }
// });

// var iframeWebsite = document.getElementById('iframe-website');
// tools.setUserAgent(iframeWebsite.contentWindow, customUserAgent)
// console.log(iframeWebsite.contentWindow.navigator.userAgent);


// var videoCardEvent = document.getElementsByClassName('video-card-event');

// // console.log(videoCardEvent);

// for (let domIndex = 0; domIndex < videoCardEvent.length; domIndex++) {
//   var dom = videoCardEvent[domIndex];
//   console.log(dom);
//   addEvent(dom, 'click', function (e) {
//     dd.show();
//     tools.setUserAgent(iframeWebsite.contentWindow, customUserAgent)
//     // var iframeWebsite = document.getElementById('iframe-website');
//     console.log(iframeWebsite.contentWindow.navigator.userAgent);
//     // console.log(e, this, dom.getAttribute('data-url'), iframeWebsite)

//     iframeWebsite.setAttribute('src', this.getAttribute('data-url'));
//     // $zq.toast('kkkk')


//   });
// }