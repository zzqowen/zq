! function (n) {
  var r = {};

  function o(t) {
    if (r[t]) return r[t].exports;
    var e = r[t] = {
      i: t,
      l: !1,
      exports: {}
    };
    return n[t].call(e.exports, e, e.exports, o), e.l = !0, e.exports
  }
  o.m = n, o.c = r, o.d = function (t, e, n) {
    o.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: n
    })
  }, o.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    })
  }, o.t = function (e, t) {
    if (1 & t && (e = o(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var n = Object.create(null);
    if (o.r(n), Object.defineProperty(n, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e)
      for (var r in e) o.d(n, r, function (t) {
        return e[t]
      }.bind(null, r));
    return n
  }, o.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t["default"]
    } : function () {
      return t
    };
    return o.d(e, "a", e), e
  }, o.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, o.p = "./", o(o.s = 11)
}([function (e, t) {
  function n(t) {
    return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? e.exports = n = function n(t) {
      return typeof t
    } : e.exports = n = function n(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    }, n(t)
  }
  e.exports = n
}, function (t, e, n) {
  "use strict";

  function u(t, e) {
    var n, r;
    if (0 === e.length) return t;
    for (n = 0, r = e.length; n < r; n++) t = (t << 5) - t + e.charCodeAt(n), t |= 0;
    return t < 0 ? -2 * t : t
  }

  function s(t, n, r) {
    return Object.keys(n).sort().reduce(function (t, e) {
      return o(t, n[e], e, r)
    }, t)
  }

  function o(t, e, n, r) {
    var o, i = u(u(u(t, n), (o = e, Object.prototype.toString.call(o))), typeof e);
    if (null === e) return u(i, "null");
    if (e === undefined) return u(i, "undefined");
    if ("object" == typeof e || "function" == typeof e) {
      if (-1 !== r.indexOf(e)) return u(i, "[Circular]" + n);
      r.push(e);
      var a = s(i, e, r);
      if (!("valueOf" in e) || "function" != typeof e.valueOf) return a;
      try {
        return u(a, String(e.valueOf()))
      } catch (c) {
        return u(a, "[valueOf exception]" + (c.stack || c.message))
      }
    }
    return u(i, e.toString())
  }
  t.exports = function (t) {
    return function (t, e) {
      for (; t.length < e;) t = "0" + t;
      return t
    }(o(0, t, "", []).toString(16), 8)
  }
}, , , , , , , , , function (t, e, n) {}, function (t, e, n) {
  "use strict";
  n.r(e);
  n(10);
  var o, i, a = function a(t, e) {
      return t.currentStyle ? t.currentStyle[e] : getComputedStyle(t, !1)[e]
    },
    c = function c(t, e, n) {
      t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent && t.attachEvent("on".concat(e), n)
    },
    r = function r(t, e, n) {
      t.removeEventListener ? t.removeEventListener(e, n, !1) : t.attachEvent && t.detachEvent("on".concat(e), n)
    },
    u = function u(t) {
      var e = t || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = !1
    },
    h = function h(t) {
      var e = window.requestAnimationFrame ? window.requestAnimationFrame(t) : setTimeout(t, 17);
      return e
    },
    m = function m(t) {
      window.cancelAnimationFrame ? window.cancelAnimationFrame(t) : clearTimeout(t)
    },
    s = function () {
      return (Object.assign || function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n, r = arguments[e];
          for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
        }
        return t
      }).apply(null, arguments)
    },
    l = n(0),
    f = n.n(l),
    d = function d() {
      return !!window.navigator.userAgent.match(/firefox/i)
    },
    p = function p(t) {
      if (Array.prototype.slice) return Array.prototype.slice.call(t);
      for (var e = [], n = 0; n < t.length; n++) e.push(t[n]);
      return e
    },
    v = function v(t) {
      return void 0 === t
    },
    w = function w(t) {
      return "function" == typeof t
    },
    b = function b(t) {
      return "number" == typeof t
    },
    g = function g(t) {
      return "string" == typeof t
    },
    y = function (t) {
      return null !== t && "object" === f()(t) && "constructor" in t && t.constructor === Object
    },
    T = function T(t) {
      if (null == t) return !0;
      if ("boolean" == typeof t) return !1;
      if ("number" == typeof t) return !t;
      if (t instanceof Error) return "" === t.message;
      switch (Object.prototype.toString.call(t)) {
        case "[object String]":
        case "[object Array]":
          return !t.length;
        case "[object File]":
        case "[object Map]":
        case "[object Set]":
          return !t.size;
        case "[object Object]":
          return !Object.keys(t).length
      }
      return !1
    },
    M = function (t, e) {
      var n = null;
      if (t instanceof Object && 1 === t.nodeType ? n = t : "string" == typeof t && (n = v(e) || !e.querySelectorAll ? document.querySelectorAll(t) : e.querySelectorAll(t)), !n || 0 == n.length) throw new Error("节点不存在");
      return n
    },
    z = function z(t) {
      return document.createElement(t)
    },
    O = function O(t, e) {
      t.appendChild(e)
    },
    E = function E(t, e) {
      t.parentNode ? t.parentNode.removeChild(t) : e.removeChild(t)
    },
    x = function x(t, n, e) {
      var r;
      "replace" === e ? t.setAttribute("class", n) : "remove" === e ? (r = t.getAttribute("class").split(" ").filter(function (t, e) {
        return t != n
      }).join(" "), t.setAttribute("class", r)) : t.setAttribute("class", (t.getAttribute("class") ? t.getAttribute("class") + " " : "") + n)
    },
    S = function S(t, e, n) {
      var r = z(t || "div");
      return x(r, e), r.innerHTML = n || " ", r
    },
    q = function (r) {
      return r.css = function (t, e) {
        if (e) r.style[t] = e;
        else {
          if (!(t instanceof Object)) return a(r, t);
          for (var n in t) r.style[n] = t[n]
        }
      }, r.offset = function () {
        var t = r,
          e = t.getBoundingClientRect();
        return {
          top: e.top,
          left: e.left,
          width: e.width || t.offsetWidth,
          height: e.height || t.offsetHeight
        }
      }, r
    },
    I = function (n, r, o, i) {
      var a = function a(t) {
        var e = t || window.event;
        switch (i) {
          case "self":
            e.target == n && o(e);
            break;
          case "once":
            k(n, r, a), o(e);
            break;
          case "prevent":
            e.preventDefault(), o(e);
            break;
          case "stop":
            e.stopPropagation(), o(e);
            break;
          default:
            o(e)
        }
      };
      c(n, r, a)
    },
    k = function (t, e, n) {
      r(t, e, n)
    },
    j = n(1),
    C = n.n(j),
    P = {
      vertical: {
        offset: "offsetTop",
        offsetSize: "offsetHeight",
        scroll: "scrollTop",
        scrollSize: "scrollHeight",
        size: "height",
        key: "vertical",
        axis: "Y",
        client: "clientY",
        clientSize: "clientHeight",
        direction: "top"
      },
      horizontal: {
        offset: "offsetLeft",
        offsetSize: "offsetWidth",
        scroll: "scrollLeft",
        scrollSize: "scrollWidth",
        size: "width",
        key: "horizontal",
        axis: "X",
        client: "clientX",
        clientSize: "clientWidth",
        direction: "left"
      }
    },
    X = function (t, e, n, r) {
      var o = q(t);
      o.css(e.size, r), o.css(e.direction, n)
    },
    B = function (t, e) {
      var i, a, c, u, s, l, n = P[e ? "vertical" : "horizontal"],
        r = function (t) {
          var e = z("div");
          x(e, "zq-scrollbar__bar zq-scrollbar__" + t.key);
          var n = z("div");
          return x(n, "zq-scrollbar__thumb zq-scrollbar-thumb__" + t.key), O(e, n), [e, n]
        }(n),
        o = r[0],
        f = r[1];
      return i = t, a = o, u = n, l = !1, I(c = f, "mousedown", function (t) {
        t.stopImmediatePropagation(), l = !0, s = t[u.client] - c[u.offset], document.onselectstart = function () {
          return !1
        }, I(document, "mousemove", function (t) {
          var e, n, r = a[u.offsetSize],
            o = c[u.offsetSize];
          l && (n = (e = t[u.client] - s) < 0 ? 0 : 100 * Math.min(e, r - o) / r, X(c, u, n + "%"), i[u.scroll] = 0 == n ? 0 : i[u.scrollSize] * (n / 100))
        }), I(document, "mouseup", function (t) {
          l = !1, document.onselectstart = null
        })
      }), {
        bar: o,
        thumb: f,
        map: n
      }
    },
    A = X,
    Y = {
      Linear: function (t, e, n, r) {
        return n * t / r + e
      },
      Quad: {
        easeIn: function (t, e, n, r) {
          return n * (t /= r) * t + e
        },
        easeOut: function (t, e, n, r) {
          return -n * (t /= r) * (t - 2) + e
        },
        easeInOut: function (t, e, n, r) {
          return (t /= r / 2) < 1 ? n / 2 * t * t + e : -n / 2 * (--t * (t - 2) - 1) + e
        }
      },
      Cubic: {
        easeIn: function (t, e, n, r) {
          return n * (t /= r) * t * t + e
        },
        easeOut: function (t, e, n, r) {
          return n * ((t = t / r - 1) * t * t + 1) + e
        },
        easeInOut: function (t, e, n, r) {
          return (t /= r / 2) < 1 ? n / 2 * t * t * t + e : n / 2 * ((t -= 2) * t * t + 2) + e
        }
      },
      Quart: {
        easeIn: function (t, e, n, r) {
          return n * (t /= r) * t * t * t + e
        },
        easeOut: function (t, e, n, r) {
          return -n * ((t = t / r - 1) * t * t * t - 1) + e
        },
        easeInOut: function (t, e, n, r) {
          return (t /= r / 2) < 1 ? n / 2 * t * t * t * t + e : -n / 2 * ((t -= 2) * t * t * t - 2) + e
        }
      },
      Quint: {
        easeIn: function (t, e, n, r) {
          return n * (t /= r) * t * t * t * t + e
        },
        easeOut: function (t, e, n, r) {
          return n * ((t = t / r - 1) * t * t * t * t + 1) + e
        },
        easeInOut: function (t, e, n, r) {
          return (t /= r / 2) < 1 ? n / 2 * t * t * t * t * t + e : n / 2 * ((t -= 2) * t * t * t * t + 2) + e
        }
      },
      Sine: {
        easeIn: function (t, e, n, r) {
          return -n * Math.cos(t / r * (Math.PI / 2)) + n + e
        },
        easeOut: function (t, e, n, r) {
          return n * Math.sin(t / r * (Math.PI / 2)) + e
        },
        easeInOut: function (t, e, n, r) {
          return -n / 2 * (Math.cos(Math.PI * t / r) - 1) + e
        }
      },
      Expo: {
        easeIn: function (t, e, n, r) {
          return 0 == t ? e : n * Math.pow(2, 10 * (t / r - 1)) + e
        },
        easeOut: function (t, e, n, r) {
          return t == r ? e + n : n * (1 - Math.pow(2, -10 * t / r)) + e
        },
        easeInOut: function (t, e, n, r) {
          return 0 == t ? e : t == r ? e + n : (t /= r / 2) < 1 ? n / 2 * Math.pow(2, 10 * (t - 1)) + e : n / 2 * (2 - Math.pow(2, -10 * --t)) + e
        }
      },
      Circ: {
        easeIn: function (t, e, n, r) {
          return -n * (Math.sqrt(1 - (t /= r) * t) - 1) + e
        },
        easeOut: function (t, e, n, r) {
          return n * Math.sqrt(1 - (t = t / r - 1) * t) + e
        },
        easeInOut: function (t, e, n, r) {
          return (t /= r / 2) < 1 ? -n / 2 * (Math.sqrt(1 - t * t) - 1) + e : n / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + e
        }
      },
      Elastic: {
        easeIn: function (t, e, n, r, o, i) {
          var a;
          return 0 == t ? e : 1 == (t /= r) ? e + n : (void 0 === i && (i = .3 * r), !o || o < Math.abs(n) ? (a = i / 4, o = n) : a = i / (2 * Math.PI) * Math.asin(n / o), -(o * Math.pow(2, 10 * --t) * Math.sin((t * r - a) * (2 * Math.PI) / i)) + e)
        },
        easeOut: function (t, e, n, r, o, i) {
          var a;
          return 0 == t ? e : 1 == (t /= r) ? e + n : (void 0 === i && (i = .3 * r), a = !o || o < Math.abs(n) ? (o = n, i / 4) : i / (2 * Math.PI) * Math.asin(n / o), o * Math.pow(2, -10 * t) * Math.sin((t * r - a) * (2 * Math.PI) / i) + n + e)
        },
        easeInOut: function (t, e, n, r, o, i) {
          var a;
          return 0 == t ? e : 2 == (t /= r / 2) ? e + n : (void 0 === i && (i = r * (.3 * 1.5)), a = !o || o < Math.abs(n) ? (o = n, i / 4) : i / (2 * Math.PI) * Math.asin(n / o), t < 1 ? o * Math.pow(2, 10 * --t) * Math.sin((t * r - a) * (2 * Math.PI) / i) * -.5 + e : o * Math.pow(2, -10 * --t) * Math.sin((t * r - a) * (2 * Math.PI) / i) * .5 + n + e)
        }
      },
      Back: {
        easeIn: function (t, e, n, r, o) {
          return void 0 === o && (o = 1.70158), n * (t /= r) * t * ((o + 1) * t - o) + e
        },
        easeOut: function (t, e, n, r, o) {
          return void 0 === o && (o = 1.70158), n * ((t = t / r - 1) * t * ((o + 1) * t + o) + 1) + e
        },
        easeInOut: function (t, e, n, r, o) {
          return void 0 === o && (o = 1.70158), (t /= r / 2) < 1 ? n / 2 * (t * t * ((1 + (o *= 1.525)) * t - o)) + e : n / 2 * ((t -= 2) * t * ((1 + (o *= 1.525)) * t + o) + 2) + e
        }
      },
      Bounce: {
        easeIn: function (t, e, n, r) {
          return n - Tween.Bounce.easeOut(r - t, 0, n, r) + e
        },
        easeOut: function (t, e, n, r) {
          return (t /= r) < 1 / 2.75 ? n * (7.5625 * t * t) + e : t < 2 / 2.75 ? n * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? n * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : n * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
        },
        easeInOut: function (t, e, n, r) {
          return t < r / 2 ? .5 * Tween.Bounce.easeIn(2 * t, 0, n, r) + e : .5 * Tween.Bounce.easeOut(2 * t - r, 0, n, r) + .5 * n + e
        }
      }
    },
    L = d() ? "DOMMouseScroll" : "mousewheel",
    _ = "zq-scroll-box",
    D = function D(t) {
      var e, n = null;
      if (t instanceof Object ? (1 === t.nodeType && (n = t), n.id && (n = document.getElementById(id))) : n = "string" == typeof t ? (e = t.split("#").pop(), document.getElementById(e)) : document.getElementById(_), !n) throw new Error("节点不存在");
      return n
    },
    H = function (t, e) {
      var n = t.thumb,
        r = t.map,
        o = 100 * e[r.scroll] / e[r.scrollSize] + "%",
        i = 100 * e[r.clientSize] / e[r.scrollSize] + "%";
      A(n, r, o, "100%" == i ? 0 : i)
    },
    F = (i = !(o = function (t) {
      var e = W.wrap,
        n = t.wheelDelta ? t.wheelDelta : -t.detail;
      e.scrollLeft += n
    }), function () {
      for (var e = this, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
      i || (i = !0, h(function (t) {
        o.apply(e, n), i = !1
      }))
    }),
    W = function bt(t) {
      var e = D(t);
      x(e, _);
      var n = z("div");
      x(n, "zq-scroll-wrap");
      var r = z("div");
      x(r, "zq-scroll-view"), O(n, function (t) {
        for (var e = document.createDocumentFragment(), n = p(t.childNodes), r = 0; r < n.length; r++) e.appendChild(n[r]);
        return e
      }(e)), O(r, n), O(e, r);
      var o, i, a = B(n, !0),
        c = B(n, !1);
      return O(e, a.bar), O(e, c.bar), I(n, "scroll", function (t) {
        H(a, n), H(c, n)
      }), bt.dom = e, bt.wrap = n, bt.viewDom = r, bt.barBox = a, bt.barBoxH = c, bt.update(), i = o || W.dom, I(i, L, F), bt
    };
  W.update = function () {
    var t = W.viewDom,
      e = W.wrap,
      n = W.barBox,
      r = W.barBoxH;
    setTimeout(function () {
      H(n, e), H(r, e)
    }), "auto" != q(e).css("overflowX") && "scroll" != q(e).css("overflowX") || q(e).css({
      height: parseFloat(t.offsetHeight) + 17 + "px"
    })
  }, W.scrollTo = function (t) {
    var e = t.type;
    ! function (e, n, t, r, o) {
      var i = {},
        a = function a(t) {
          if (b(t)) return t;
          if (g(t)) {
            if (/\d+m?s$/.test(t)) return /ms/.test(t) ? +t.replace("ms", "") : 1e3 * t.replace("s", "");
            if (/^\d+$/.test(t)) return +t
          }
          return -1
        };
      if (!b(e) || !b(n)) return window.console && console.error("from和to两个参数必须且为数值");
      var c = {
          duration: 300,
          easing: "Linear",
          callback: function o() {}
        },
        u = function u(t) {
          w(t) ? c.callback = t : -1 != a(t) ? c.duration = a(t) : g(t) && (c.easing = t)
        };
      u(t), u(r), u(o);
      var s = 0,
        l = Math.ceil(c.duration / 17),
        f = null;
      c.easing = c.easing.slice(0, 1).toUpperCase() + c.easing.slice(1);
      var d, p = c.easing.split(".");
      if (1 == p.length ? d = Y[p[0]] : 2 == p.length && (d = Y[p[0]] && Y[p[0]][p[1]]), 0 != w(d)) {
        var v = function v() {
          var t = d(s, e, n - e, l);
          ++s <= l ? (c.callback(t), f = h(v)) : c.callback(n, !0)
        };
        return v(), i.stop = function () {
          m(f)
        }
      }
      console.error('没有找到名为"' + c.easing + '"的动画算法')
    }(W.wrap["x" == e ? "scrollLeft" : "scrollTop"], t.value, "Quad.easeInOut", function (t) {
      W.wrap["x" == e ? "scrollLeft" : "scrollTop"] = t
    })
  };
  var N = W,
    Q = function Q(t) {
      return '<div class="zq-dialog-head">\n    <div class="zq-dialog-head__title">'.concat(t, "</div>\n  </div>")
    },
    R = function R(t) {
      return '<div class="zq-dialog-content">\n    <div class="zq-dialog-content__msg">'.concat(t, "</div>\n  </div>")
    },
    $ = function (t, e) {
      var n = {
        type: "alert",
        title: "温馨提示",
        content: "等你很久了",
        showCancel: !0,
        cancelText: "取消",
        confirmText: "确定",
        modal: !0,
        maskClose: !0,
        onCallBack: function () {}
      };
      return g(t) ? (n.content = t, n.title = v(e) ? "温馨提示" : e) : y(t) && (n = s(n, t)), n
    },
    U = function U(t) {
      var e = $(t);
      U[e.type] && U[e.type](e)
    };
  U.alert = function (t, e) {
    ! function (t) {
      var e = t.title,
        n = t.content,
        r = t.showCancel,
        o = t.cancelText,
        i = t.confirmText,
        a = t.modal,
        c = t.maskClose,
        u = t.onCallBack,
        s = S("div", "zq-dialog-box"),
        l = S("div", "zq-dialog-mask ani-opacity"),
        f = S("div", "zq-dialog-wrap ani-opacity"),
        d = S("div", "zq-dialog-btns"),
        p = S("button", "zq-button zq-button--small", o);
      p.style.marginRight = "6px";
      var v = S("button", "zq-button zq-button--small zq-button--primary", i);
      r && O(d, p), O(d, v);
      var h = Q(e) + R(n);

      function m() {
        x(l, "ani-opacity-active", "remove"), x(f, "ani-opacity-active", "remove"), setTimeout(function () {
          E(s)
        }, 300)
      }
      f.innerHTML = h, O(f, d), a && O(s, l), O(s, f), O(document.body, s), setTimeout(function () {
        x(l, "ani-opacity-active"), x(f, "ani-opacity-active")
      }, 1), c && I(l, "click", function (t) {
        u("cancel"), m()
      }, "self"), I(p, "click", function (t) {
        u("cancel"), m()
      }), I(v, "click", function (t) {
        u("confirm"), m()
      })
    }($(t, e))
  }, U.confirm = function (t, e) {
    T(t)
  }, U.prompt = function (t, e) {
    T(t)
  };
  var V, G, J = U,
    K = 0,
    Z = function (t, e) {
      K++;
      var n = z("div");
      n.innerHTML = t, x(n, "zq-toast-box-test zq-toast-box"), O(document.body, n);
      var r, o = z("div"),
        i = z("div");
      o.id = "toast-".concat(K, "-").concat((r = "toast-".concat(K), C()(r))), x(o, "zq-toast-box ani-opacity-trans-bottom"), x(i, "zq-toast-content"), i.innerHTML = t, q(o).css("width", n.offsetWidth + "px"), O(o, i), O(document.body, o), E(n), setTimeout(function () {
        x(o, "opacity-trans-bottom-active")
      }, 1), setTimeout(function () {
        x(o, "opacity-trans-bottom-active", "remove"), setTimeout(function () {
          E(o)
        }, 500)
      }, e || 2e3)
    },
    tt = (d(), function D(t) {
      var e, n = null;
      if (t instanceof Object ? (1 === t.nodeType && (n = t), n.id && (n = document.getElementById(id))) : n = "string" == typeof t ? (e = t.split("#").pop(), document.getElementById(e)) : document.getElementById("zq-menu"), !n) throw new Error("节点不存在");
      return n
    }),
    et = function et(t) {
      tt(t)
    },
    nt = et,
    rt = {
      el: null,
      direction: "horizontal",
      wrapperEl: ".zq-swiper-wrapper",
      pagination: {
        el: ".zqswiper-pagination",
        type: "fraction"
      },
      navigation: {
        nextEl: ".zq-swiper-button-next",
        prevEl: ".zq-swiper-button-prev"
      }
    },
    ot = function ot() {
      return Date.now ? Date.now() : (new Date).getTime()
    },
    it = 0,
    at = "next",
    ct = 0,
    ut = 0,
    st = {
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      diff: 0
    },
    lt = {
      isTouched: undefined,
      isMoved: undefined,
      allowTouchCallbacks: undefined,
      touchStartTime: undefined,
      isScrolling: undefined,
      currentTranslate: undefined,
      startTranslate: undefined,
      allowThresholdMove: undefined,
      formElements: "input, select, option, textarea, button, video, label",
      lastClickTime: ot(),
      clickTimeout: undefined,
      velocities: [],
      allowMomentumBounce: undefined,
      isTouchEvent: undefined,
      startMoving: undefined
    },
    ft = function (t) {
      var e, n, r = M(".zq-swiper-button-prev", t),
        o = M(".zq-swiper-button-next", t);
      for (e in r) {
        var i = r[e];
        I(i, "click", dt)
      }
      for (n in o) {
        var a = o[n];
        I(a, "click", pt)
      }
    },
    dt = function dt() {
      var t = it - 1 < 0 ? 0 : --it;
      vt.slideTo(t)
    },
    pt = function pt() {
      var t = ut - 1 < it + 1 ? ut - 1 : ++it;
      vt.slideTo(t)
    },
    vt = function gt(t, e) {
      var n, r;
      return n = t, r = vt.touchEvents, I(n, r.start, vt.onTouchStart), I(document, r.move, vt.onTouchMove), I(document, r.end, vt.onTouchEnd), ft(n), gt.wrapperEl = q(M(".zq-swiper-wrapper", t)[0]), ut = gt.wrapperEl.childNodes.length, t
    };
  vt.support = {
    touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
    pointerEvents: !!window.PointerEvent && "maxTouchPoints" in window.navigator && 0 <= window.navigator.maxTouchPoints,
    observer: "MutationObserver" in window || "WebkitMutationObserver" in window,
    passiveListener: function () {
      var t = !1;
      try {
        var e = Object.defineProperty({}, "passive", {
          get: function () {
            t = !0
          }
        });
        window.addEventListener("testPassiveListener", null, e)
      } catch (n) {}
      return t
    }(),
    gestures: "ongesturestart" in window
  }, vt.touchEvents = (V = ["touchstart", "touchmove", "touchend", "touchcancel"], G = ["mousedown", "mousemove", "mouseup"], vt.support.pointerEvents && (G = ["pointerdown", "pointermove", "pointerup"]), vt.touchEventsTouch = {
    start: V[0],
    move: V[1],
    end: V[2],
    cancel: V[3]
  }, vt.touchEventsDesktop = {
    start: G[0],
    move: G[1],
    end: G[2]
  }, vt.support.touch ? vt.touchEventsTouch : vt.touchEventsDesktop), vt.onTouchStart = function (t) {
    u(t), st.currentX = "touchstart" === t.type ? t.targetTouches[0].pageX : t.pageX || t.clientX, st.currentY = "touchstart" === t.type ? t.targetTouches[0].pageY : t.pageY || t.clientY;
    var e = st.currentX,
      n = st.currentY;
    st.startX = e, st.startY = n, lt.touchStartTime = ot(), s(lt, {
      isTouched: !0,
      isMoved: !1
    })
  }, vt.onTouchMove = function (t) {
    var e, n, r, o;
    u(t), lt.isTouched && (e = "touchmove" === t.type && t.targetTouches && (t.targetTouches[0] || t.changedTouches[0]), n = "touchmove" === t.type ? e.pageX : t.pageX || t.clientX, r = "touchmove" === t.type ? e.pageY : t.pageY || t.clientY, st.currentX = n, st.currentY = r, o = st.currentX - st.startX, st.currentY, st.startY, st.diff = o, at = o < 0 ? "next" : "prev", (0 == it && "prev" == at || it == ut - 1 && "next" == at) && (o /= 2), vt.setTransition(ct + o))
  }, vt.onTouchEnd = function (t) {
    u(t), s(lt, {
      isTouched: !1,
      isMoved: !1
    });
    var e = ot(),
      n = e - lt.touchStartTime;
    n < 300 && lt.lastClickTime;
    var r = 1;
    200 < n && (r = 0);
    var o = st.currentX - st.startX;
    st.currentY, st.startY;
    st.diff = o;
    var i = vt.wrapperEl.offset().width;
    30 < Math.abs(o) && (i / 2 < o + r * i || Math.abs(o) > i / 2) ? ("next" == at ? ++it > ut - 1 && (it = ut - 1) : --it < 0 && (it = 0), vt.slideTo(it)) : vt.setTransition(ct, 300), lt.lastClickTime = ot(), st.startX = st.currentX, st.startY = st.currentY
  }, vt.setTransition = function (t, e) {
    vt.wrapperEl = q(M(".zq-swiper-wrapper")[0]);
    console.log(t);
    vt.wrapperEl.css("left", t + "px"),vt.wrapperEl.css("msTransform", "translate(" + t + "px)"), vt.wrapperEl.css("mozTransform", "translate(" + t + "px)"), vt.wrapperEl.css("oTransform", "translate(" + t + "px)"), vt.wrapperEl.css("webkitTransform", "translate(" + t + "px)"), vt.wrapperEl.css("transform", "translate(" + t + "px)"), vt.wrapperEl.css("transition-duration", (e || 0) + "ms")
  }, vt.slideTo = function (t) {
    var e = vt.wrapperEl.offset().width;
    ct = -e * t, vt.setTransition(ct, 300)
  };
  var ht = vt,
    mt = {
      scroll: N,
      dialog: J,
      toast: Z,
      menu: nt,
      swiper: function (t, e) {
        for (var n = function (t, e) {
            var n = t,
              r = {};
            if (y(t) && T(e) ? (r = t, n = null) : y(e) && (r = e), T(n) && T(r.el)) throw new Error("节点不存在");
            return r.el = n && !r.el ? M(n) : M(r.el), r
          }(t, s(rt, e)), r = [], o = 0, i = n.el.length; o < i; o++) {
          var a = n.el[o],
            c = new ht(a, n);
          r.push(c)
        }
        return r.length <= 1 ? r[0] : r
      }
    },
    wt = document.getElementById("itemA");
  I(wt, "click", function (t) {
    mt.dialog({
      maskClose: !0,
      onCallBack: function (t) {}
    })
  });
  mt.swiper(".zq-swiper-container")
}]);