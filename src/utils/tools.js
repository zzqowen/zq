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
  }
}