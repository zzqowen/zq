import {
  isEmpty,
  isString,
  isObject,
  isUndefined
} from "tools/tool";
import frame from "./frame";

const DEFAULT_MSG = "等你很久了";
const DEFAULT_TITLE = "温馨提示";
const CONFIRM_TEXT = "确定";
const CANCEL_TEXT = "取消";
const SHOW_CANCEL = true;
const MODAL = true;
const MASKCLOSE = true;

let initParmas = (params, paramsT) => {
  let defaultParams = {
    type: 'alert',
    title: DEFAULT_TITLE,
    content: DEFAULT_MSG,
    showCancel: SHOW_CANCEL,
    cancelText: CANCEL_TEXT,
    confirmText: CONFIRM_TEXT,
    modal: MODAL,
    maskClose: MASKCLOSE,
    onCallBack: () => {

    }
  };
  if (isString(params)) {
    defaultParams.content = params;
    defaultParams.title = isUndefined(paramsT) ? DEFAULT_TITLE : paramsT;
  } else if (isObject(params)) {
    defaultParams = Object.assign(defaultParams, params);
  }

  return defaultParams;
}

let dialog = (params) => {
  let dParams = initParmas(params);
  if (dialog[dParams.type]) dialog[dParams.type](dParams);
}

dialog.alert = (msg, title) => {
  let dParams = initParmas(msg, title);
  // console.log(dParams);
  let dom = frame(dParams);
}

dialog.confirm = (msg, title) => {
  console.log(msg, isEmpty(msg));
}

dialog.prompt = (msg, title) => {
  console.log(msg, isEmpty(msg));
}

export default dialog