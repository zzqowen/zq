import './video.less';
import $zq from '@/../zq.js';

$zq.video('video-zq', {}, function(e) {
  this.src('http://vjs.zencdn.net/v/oceans.mp4')
  console.log(this);
  this.play()
})

// var element = new Image();
// Object.defineProperty(element, 'id', {
//   get: function () {
//     window.location.href = "http://baidu.com"
//   }
// });
// alert(element)
// console.log(element);
