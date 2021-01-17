import './video.less';
import $zq from '@/../zq.js';

$zq.video('video-zq', {controls: true, language: 'zh-cn'}, function(e) {
  // this.src('http://vjs.zencdn.net/v/oceans.mp4')
  this.src('https://lmbsy.qq.com/k022445cv0s.p201.1.mp4?platform=10201&vkey=0B961F61D503777101296DCE1623891DA0E4A6D89209CD22595BACF77C2E11363ED8D82AE64D44C16DC51D4A2745BE43B79AD93402A714B8CAB67BDBDC0CC560106FA79BC319E394EE27AA01EB464DA5FB1E3F1B734F0B6BEE2E755408AF60EF55301596E751124CBE5CD1D98AA7187C9606ABC080DEB92F&sdtfrom=&fmt=shd&level=0')
  console.log(this);
  // this.play()
})

// var element = new Image();
// Object.defineProperty(element, 'id', {
//   get: function () {
//     window.location.href = "http://baidu.com"
//   }
// });
// alert(element)
// console.log(element);