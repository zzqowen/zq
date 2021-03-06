import {
  isObject,
  isEmpty
} from './tool';
import {
  getElement
} from './utils/dom';
import {
  ZObject
} from './compatibility';

export const initElParams = (arg1, arg2, defaultOptions) => {
  let el = arg1;
  let params = {};

  if (isObject(arg1) && isEmpty(arg2)) {
    params = arg1;
    el = null;
  } else if (isObject(arg2)) {
    params = arg2;
  }
  // console.log(el, params)
  if (!(!isEmpty(el) || !isEmpty(params.el))) throw new Error("节点不存在");
  params.el = el && !params.el ? getElement(el) : getElement(params.el);
  if (params.el.nodeType == 1) params.el = [params.el];
  return ZObject.assign(defaultOptions || {}, params);
}