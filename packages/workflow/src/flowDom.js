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

let flowStatus = {
  '0': '条件',
  '1': '发起人',
  '2': '审批人',
  '3': '抄送人',
}

let flowStatusList = [{
    label: '条件',
    icon: null
  },
  {
    label: '发起人',
    icon: null
  },
  {
    label: '审批人',
    icon: 6
  },
  {
    label: '抄送人',
    icon: 6
  },
]

let svgDom = {
  '2': `<svg viewBox="0 0 1024 1024" focusable="false" width="1.3em" height="1.3em" fill="currentColor">
  <path
    d="M819.2 576H640l-30.24-90.73A191.9 191.9 0 0 0 704 320c0-106-86-192-192-192s-192 86-192 192a191.9 191.9 0 0 0 94.24 165.27L384 576H204.8c-42.24 0-76.8 28.8-76.8 64v192c0 35.2 34.56 64 76.8 64h614.4c42.24 0 76.8-28.8 76.8-64V640c0-35.2-34.56-64-76.8-64z"></path>
</svg>`,
  '3': `<svg viewBox="0 0 1024 1024" focusable="false" width="1.3em" height="1.3em" fill="currentColor">
  <path
    d="M382.293 692.497a37.956 37.956 0 0 1-32.29 7.373v0.205l-278.118-84.31a39.39 39.39 0 0 1-5.803-73.113l862.14-420.045a39.39 39.39 0 0 1 55.432 45.056L823.228 800.358a39.39 39.39 0 0 1-49.63 27.99l-295.595-89.566a15.428 15.428 0 0 1-12.083-14.814c0-4.437 1.98-8.397 5.12-11.196l356.762-401.135-445.44 380.792h-0.069z m98.031 93.867l54 17.886a15.428 15.428 0 0 1 7.986 23.142l-53.93 81.92a15.428 15.428 0 0 1-28.33-8.533v-99.806a15.428 15.428 0 0 1 20.274-14.61z"></path></svg>`
}

let closeDom = `<span class="zq-workflow__close">
  <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
  </span>`;

let head = (type) => {
  let t = type || '1';
  return `<div class="zq-workflow__header  zq-workflow__header_${t}">
  <span class="zq-workflow__header_icon" style="display: ${flowStatusList[t].icon == null ? 'none' : 'inline-block'}">${svgDom[t]}</span><span class="zq-workflow__header_title">${flowStatusList[t].label}</span>
  </div>`
}

let content = (value) => {
  return `<div class="zq-workflow__content">
  <div class="zq-workflow__content_txt">
    <div class="one-line-ellipsis">${value || '请选择'}</div>
  </div>
  </div>`
}

let flowBox = (options) => {
  let opt = options || {closeable: true};
  let {
    type,
    closeable,
    value
  } = opt;

  let fDom = newDom('div', `zq-workflow__container`);
  if (closeable) fDom.innerHTML = closeDom;
  let fcDom = newDom('div', `zq-workflow__container_content`);


  fcDom.innerHTML = head(type) + content(value);
  appendNode(fDom, fcDom);
  return fDom;
}

export default flowBox;