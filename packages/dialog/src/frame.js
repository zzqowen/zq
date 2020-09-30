import {
  createElement,
  appendNode,
  removeNode,
  domView,
  setClassList,
  getChildNodes,
  addEvent,
  delEvent
} from "tools/utils/dom";

let head = (title) => {
  
  return `<div class="zq-dialog-head">
    <div class="zq-dialog-head__title">${title}</div>
  </div>`
}

let content = (msg) => {
  return `<div class="zq-dialog-content">
    <div class="zq-dialog-content__msg">${msg}</div>
  </div>`
}

let btns = () => {
  
  return `<div class="zq-dialog-btns">
    <button class="zq-button zq-button--small" onclick="cancel()">取消</button>
    <button class="zq-button zq-button--small zq-button--primary">确定</button>
  </div>`
}

export default (msg, title) => {
  let dialogDom = createElement("div");
  setClassList(dialogDom, "zq-dialog-box");
  let dialogWrap = createElement("div");
  setClassList(dialogWrap, "zq-dialog-wrap");

  let cancel = () => {
    console.log('空就按了多少')
  }

  let con = head(title) + content(msg) + btns();
  dialogWrap.innerHTML = con;
  appendNode(dialogDom, dialogWrap);
  appendNode(document.body, dialogDom);

  addEvent(dialogDom, "click", (e) => {
    console.log("是否关闭弹窗");
  }, "self");


  return dialogDom
}