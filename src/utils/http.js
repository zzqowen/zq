export default function (params) {
  var defaultP = {
    url: '',
    method: 'POST',
    dataType: 'text',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 30000,
    async: true,
    data: {},
    success: function () {},
    fail: function () {},
    complete: function () {}
  };


  var getQueryData = function (data) {
    if (!data) {
      return null;
    }
    if (typeof data === 'string') {
      return data;
    }
    try {
      if (data instanceof FormData) {
        return data;
      }
    } catch (err) {};
    return getQueryString(data);
  };

  var getQueryString = function (data) {
    var paramsArr = [];
    if (data instanceof Object) {
      for (var key in data) {
        var val = data[key];
        paramsArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
      }
    }
    return paramsArr.join('&');
  }

  var getUrlParam = function (url, data) {
    var str = '';
    if (!data) {
      str = url;
    }
    var paramsStr = data instanceof Object ? getQueryString(data) : data;
    str = (url.indexOf('?') !== -1) ? paramsStr : '?' + paramsStr;
    return url + str;
  };

  var p = {};
  for (var key in defaultP) {
    p[key] = !!params && params[key] ? params[key] : defaultP[key];
  }
  if (!p.url) console.error("请输入url");

  var xhr;
  try {
    xhr = new XMLHttpRequest();
  } catch (e) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  var pMethod = p.method.toUpperCase();
  if (pMethod === 'GET' || pMethod === 'DELETE') {
    p.url = getUrlParam(p.url, p.data);
  }

  xhr.open(p.method, p.url, p.async);

  xhr.responseType = p.dataType;

  for (var i in p.header) {
    xhr.setRequestHeader(i, p.header[i]);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var rType = p.dataType;
      var d = xhr.responseText;
      console.log(xhr, rType);
      if (rType == 'document') {
        p.success(xhr.responseXML)
      } else {
        try {
          d = JSON.parse(xhr.responseText);
        } catch (e) {
          try {
            d = (new Function("return " + xhr.responseText))();
          } catch (e2) {}
        }
        p.success(d)
      };
    }
  }

  xhr.onloadend = function () {
    p.complete(xhr, xhr.status);
  }

  xhr.onerror = function (error) {
    p.fail(xhr, xhr.status, error);
  }

  xhr.ontimeout = function (e) {
    p.fail(xhr, 408, e);
  }

  if (p.async && p.timeout) {
    xhr.timeout = p.timeout;
  }

  xhr.send(pMethod === 'GET' || pMethod === 'DELETE' ? null : getQueryData(p.data));
  
  return xhr;
}