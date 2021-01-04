import './video.less';

var element = new Image();
Object.defineProperty(element, 'id', {
  get: function () {
    window.location.href = "http://baidu.com"
  }
});
// alert(element)
console.log(element);
