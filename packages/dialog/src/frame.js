import {
  newDom,
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

let msgContent = (msg) => {
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

export default (params) => {
  let {
    title,
    content,
    showCancel,
    cancelText,
    confirmText,
    modal,
    maskClose,
    onCallBack
  } = params;

  let dialogDom = newDom('div', "zq-dialog-box");
  let dialogMask = newDom('div', "zq-dialog-mask ani-opacity");
  let dialogWrap = newDom('div', "zq-dialog-wrap ani-opacity");

  let dialogBtns = newDom('div', "zq-dialog-btns");
  let cancelBtn = newDom('button', "zq-button zq-button--small", cancelText);
  cancelBtn.style.marginRight = "6px";
  let confirmBtn = newDom('button', "zq-button zq-button--small zq-button--primary", confirmText);
  if (!!showCancel) appendNode(dialogBtns, cancelBtn);
  appendNode(dialogBtns, confirmBtn);

  let con = head(title) + msgContent(content)
  dialogWrap.innerHTML = con;

  appendNode(dialogWrap, dialogBtns);
  if (modal) appendNode(dialogDom, dialogMask);
  appendNode(dialogDom, dialogWrap);
  // appendNode(document.body, dialogMask);
  appendNode(document.body, dialogDom);

  setTimeout(() => {
    setClassList(dialogMask, "ani-opacity-active");
    setClassList(dialogWrap, "ani-opacity-active");
  }, 1);

  function closeDialog() {
    setClassList(dialogMask, "ani-opacity-active", 'remove');
    setClassList(dialogWrap, "ani-opacity-active", 'remove');
    setTimeout(() => {
      // removeNode(dialogMask);
      removeNode(dialogDom);
    }, 300);
  }

  if (maskClose) {
    addEvent(dialogMask, "click", (e) => {
      console.log('kkkk')
      onCallBack('cancel');
      closeDialog();
    }, "self");
  }

  addEvent(cancelBtn, "click", (e) => {
    onCallBack('cancel');
    closeDialog();
  });

  addEvent(confirmBtn, "click", (e) => {
    onCallBack('confirm');
    closeDialog();
  });


  return dialogDom
}