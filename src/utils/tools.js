export default {
  getFileName: function (url) {
    return url.split('/').pop().split('#')[0].split('?')[0];
  },
  setUserAgent: function (window, userAgent) {
    if (window.navigator.userAgent != userAgent) {
      var userAgentProp = {
        get: function () {
          return userAgent;
        }
      };
      try {
        Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
      } catch (e) {
        window.navigator = Object.create(navigator, {
          userAgent: userAgentProp
        });
      }
    }
  },
  isEmpty: function (val) {
    if (val == null) return true;
    if (typeof val === 'boolean') return val;
    if (typeof val === 'number') return false;
    switch (Object.prototype.toString.call(val)) {
      // String or Array
      case '[object String]':
      case '[object Array]':
        return !val.length;
        // Plain Object
      case '[object Object]': {
        return !Object.keys(val).length;
      }
    }
    return false;
  },
  transmitParams: function (key, value) {
    localStorage.setItem(key, value);
  },
  getTransmitParams: function (key) {
    var p = '';
    try {
      p = localStorage.getItem(key);
    } catch (error) {}
    return p;
  }
}