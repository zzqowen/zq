var origDefineProperty = Object.defineProperty;

var arePropertyDescriptorsSupported = function () {
  var obj = {};
  try {
    origDefineProperty(obj, "x", {
      enumerable: false,
      value: obj
    });
    for (var _ in obj) {
      return false;
    }
    return obj.x === obj;
  } catch (e) {
    /* this is IE 8. */
    return false;
  }
};
var supportsDescriptors =
  origDefineProperty && arePropertyDescriptorsSupported();

if (!supportsDescriptors) {
  Object.defineProperty = function (a, b, c) {
    //IE8支持修改元素节点的属性
    if (origDefineProperty && a.nodeType == 1) {
      return origDefineProperty(a, b, c);
    } else {
      a[b] = c.value || (c.get && c.get());
    }
  };
}


var DONT_ENUM = "propertyIsEnumerable,isPrototypeOf,hasOwnProperty,toLocaleString,toString,valueOf,constructor".split(","),
  hasOwn = ({}).hasOwnProperty;
for (var i in {
    toString: 1
  }) {
  DONT_ENUM = false;
}


Object.keys = Object.keys || function (obj) { //ecma262v5 15.2.3.14
  var result = [];
  for (var key in obj)
    if (hasOwn.call(obj, key)) {
      result.push(key);
    }
  if (DONT_ENUM && obj) {
    for (var i = 0; key = DONT_ENUM[i++];) {
      if (hasOwn.call(obj, key)) {
        result.push(key);
      }
    }
  }
  return result;
};