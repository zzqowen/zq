import {
  isEmpty,
  isString
} from "tools/tool";
import { isUndefined } from "tools/tool";
import frame from "./frame";

const DEFAULT_MSG = "等你很久了";
const DEFAULT_TITLE = "温馨提示";

let initParmas = (params) => {

}
let dialog = (params) => {
  if (isString(params)) {
    dialog.alert(params);
  } else if (isUndefined(params)) {
    dialog.alert(DEFAULT_MSG);
  } else {
    let {type, message, title} = params;
    if (isUndefined(type)) throw Error('请设置弹窗类型type')
    if (isUndefined(message)) message = DEFAULT_MSG
    if (isUndefined(title)) title = DEFAULT_TITLE

    dialog[type](message, title);
  }
}

dialog.alert = (msg, title) => {
  if (isUndefined(title)) title = DEFAULT_TITLE
  console.log(msg, isEmpty(msg));
  let dom = frame(msg, title);
}

dialog.confirm = (msg, title) => {
  console.log(msg, isEmpty(msg));
}

dialog.prompt = (msg, title) => {
  console.log(msg, isEmpty(msg));
}

export default dialog