export default {
  getFileName: function (url) {
    return url.split('/').pop().split('#')[0].split('?')[0];
  }
}