import './video.less';
import $zq from '@/../zq.js';
import {
  getElement,
  domView,
  addEvent,
  delEvent
} from 'tools/utils/dom.js';
import tools from 'src/utils/tools.js';
import http from 'src/utils/http.js';

var searchBtn = getElement('#search-btn');
var searchInput = getElement('#search-input');
var videoContent = getElement('#zq-video-content');
var searchForm = getElement('#zq-search-form');

console.log(searchForm)

// var dData = [{
//   "desc": "剧集讲述了苏氏布商家的赘婿宁毅，帮助妻子苏檀儿一起搞事业，玩转武朝商界，成为江宁首富的故事；宁毅面对家事、国事、天下事，都勇往直前，从一个无人在意的小小赘婿，成长为真正为天下立心，为生民立命，顺应时代，也改变了时代的大人物。",
//   "director": ["邓科"],
//   "logo": "//puui.qpic.cn/vcover_vt_pic/0/sdp00100510nky2/260",
//   "performer": ["郭麒麟", "宋轶", "蒋依依", "高曙光", "海一天", "尚语贤", "朱珠", "张若昀", "田雨", "岳旸", "刘冠麟", "冯晖", "王成思", "叶项明", "赵柯", "张晓晨"],
//   "sub": "（普通话/2021）",
//   "title": "赘婿",
//   "type": "电视剧",
//   "url": "https://v.qq.com/search_redirect.html?cid=sdp00100510nky2&url=https%3A%2F%2Fwww.iqiyi.com%2Fv_260uudpmizo.html%3Fvfm%3Dm_103_txsp"
// }];

var statusList = [
  `<div class="zq-search-default">更多精彩等你发现</div>`,
  `<div class="zq-search-loading"><img class="zq-loading-icon" src="${require('src/images/loading.png')}" alt=""/></div>`,
  `<div class="zq-empty-history">记录走丢了</div>`,
  `<div class="zq-empty-history">网页走丢了</div>`,
]

function setSearchStatus(status) {
  var sta = status || 1;
  videoContent.innerHTML = statusList[sta - 1]
}

var jixieUrl = 'https://www.playm3u8.cn/jiexi.php?url='

setSearchStatus();

function handleUrl(url) {
  if (url.indexOf('url=') != -1) {
    return url.split('url=')[1]
  }
  return url;
}

addEvent(searchForm, 'keydown', function (e) {
  if (e.keyCode == 13) {
    // console.log(e.keyCode)
    searchData()
  }
})

addEvent(searchBtn, 'click', function (e) {
  searchData()
});


var handlePage = function (data) {
  var html = ''
  for (var i = 0, len = data.length; i < len; i++) {
    var item = data[i];
    html += `<div class="zq-v-box card"><a class="zq-v-url" href="${item.url}"><img class="zq-v-logo" src="${'item.logo' || require('src/images/video-img-bg.jpg')}" alt=""/><div class="zq-v-content"><div class="zq-v-title">${item.title}<span class="zq-v-sub-title">${item.sub}</span><span class="zq-v-type">${item.type}</span></div>
                <div class="zq-v-character">
                  <span class="zq-v-label">导演</span>
                  <span class="zq-v-value nowrap-ellipsis">${item.director.join("")}</span>
                </div>
                <div class="zq-v-character">
                  <span class="zq-v-label">演员</span>
                  <span class="zq-v-value nowrap-ellipsis" title="${item.performer.join(" ")}">${item.performer.join(" ")}</span>
                </div>
                <div class="zq-v-character zq-v-desc">
                  <span class="zq-v-label">简介</span>
                  <span class="zq-v-value zq-v-desc-value">${item.desc}</span>
                </div>
                </div></a></div>`
  }
  // console.log(html)
  videoContent.innerHTML = html;

  var urlAList = getElement('.zq-v-url');
  console.log(urlAList);
  for (var j = 0; j < urlAList.length; j++) {
    var aDom = urlAList[j];
    addEvent(aDom, 'click', function(e) {
      
      console.log(this);
      tools.transmitParams('v-src', this.href);
      location.href = "/html/videoDetail.html";
    }, 'prevent')
  }



  if (html == '') {
    setSearchStatus(3)
  }
}

// handlePage(dData)

var searchData = function () {
  var val = searchInput.value;
  if (tools.isEmpty(val)) {
    return $zq.toast('请输入检索条件');
  }

  setSearchStatus(2)
  http({
    method: 'GET',
    url: '/search',
    data: {
      keyword: val
    },
    success: function (res) {
      console.log(res.data);
      if (res.code != 0) {
        $zq.toast(res.message);
      } else {
        handlePage(res.data);
      }
    },
    fail: function (error) {
      setSearchStatus(4);
    }
  })
}


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