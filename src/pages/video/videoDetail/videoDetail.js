import './videoDetail.less';
import $zq from '@/../zq.js';
import tools from 'src/utils/tools.js';
import {
  getElement,
  setClassList,
  domView,
  addEvent,
  delEvent
} from 'tools/utils/dom.js';
import http from 'src/utils/http.js';

var params = tools.getTransmitParams('v-src');
if (tools.isEmpty(params)) {
  location.replace('/video.html');
};

window.onload = function () {
  // var jixieUrl = 'https://www.playm3u8.cn/jiexi.php?url=';
  var jixieUrl = 'https://jx.ap2p.cn/?url=';

  var videoIframe = getElement('#zq-video-iframe');
  var videoEpisodeList = getElement('#video-episode-list');
  videoIframe.src = jixieUrl + params;

  console.log(params);

  searchDetail(params)

  function handlePage(list) {
    var html = ''
    var curIndex;
    for (var i = 0, len = list.length; i < len; i++) {
      var item = list[i];
      // console.log(item.url, params, curIndex, i)
      var curVideoName = params.split('/').pop().split('.').shift();

      if (item.url == params || item.url == params.replace(curVideoName, curVideoName + '/' + curVideoName)) {
        curIndex = i;
      }

      html += `<a href="${item.url}" class="video-episode-item btn-hover ${curIndex == i ? 'video-episode-item-checked' : ''}">
      <div class="video-episode-txt">${item.episodes}</div>
    </a>`
    }

    // console.log(list)
    videoEpisodeList.innerHTML = html;

    var episodeList = getElement('.video-episode-item');

    if (!curIndex) {
      curIndex = 0;
      setClassList(episodeList[0], 'video-episode-item-checked');
    }
    // console.log(episodeList);
    for (var j = 0; j < episodeList.length; j++) {
      var episodeDom = episodeList[j];
      episodeDom.index = j;
      addEvent(episodeDom, 'click', function (e) {
        // console.log(this);
        setClassList(episodeList[curIndex], 'video-episode-item-checked', 'remove');
        setClassList(this, 'video-episode-item-checked');
        curIndex = this.index;
        tools.transmitParams('v-src', this.href);
        videoIframe.src = jixieUrl + encodeURIComponent(this.href);
      }, 'prevent')
    }
  }


  function searchDetail(url) {
    http({
      method: 'POST',
      url: '/video/detail',
      data: {
        url: url
      },
      success: function (res) {
        // console.log(res.data);
        if (res.code != 0) {
          $zq.toast(res.message);
        } else {
          handlePage(res.data);
        }
      },
      fail: function (error) {

      }
    })
  }

}