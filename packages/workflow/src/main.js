import {
  initElParams
} from "tools/common";
import {
  newDom,
  createElement,
  appendNode,
  removeNode,
  domView,
  setClassList,
  addEvent
} from "tools/utils/dom";
import {
  isEmpty
} from "tools/tool";
import genId from "tools/hash/hashSum";
import defaultOptions from "./options";
import flowDom from './flowDom';
import testData from './data';

let addBtn = () => {
  let aBBtn = newDom('div', `zq-workflow__btn_box`);
  let bBtn = newDom('div', `zq-workflow__btn line-box`);
  bBtn.innerHTML = `<div class="zq-workflow_btn_plus"></div>`
  appendNode(aBBtn, bBtn);
  return aBBtn;
}

let addConditionBtn = () => {
  let conBtn = newDom('div', `zq-workflow__add_condition`);
  conBtn.innerText = '添加条件';
  return conBtn;
}

let coverLine = (type) => {
  let coverTopLine = newDom('div', `zq-workflow__cover_${type}_top_line`);
  let coverBottomLine = newDom('div', `zq-workflow__cover_${type}_bottom_line`);
  return [coverTopLine, coverBottomLine];
}

let arrowTrangle = () => {
  return newDom('div', 'zq-workflow_arrow-trangle')
}

let endWorkFlow = () => {
  return newDom('div', 'zq-workflow_end')
}

let flowEl = (el) => {
  let han = function (preEl, cNode) {
    if (cNode.type == 'route') {
      let conditionNode = cNode.conditionNodes;
      if (!isEmpty(conditionNode)) {
        let routeDomBox = newDom('div', `zq-workflow__route_box`);
        let routeDom = newDom('div', `zq-workflow__route`);
        for (let i in conditionNode) {
          let conditionDom = newDom('div', `zq-workflow__condition line-box`);
          let conditionItem = conditionNode[i];
          let nodeDom = newDom('div', `zq-workflow__condition_node line-box`);

          appendNode(nodeDom, new flowDom({
            type: '0',
            value: conditionItem.name
          }));

          appendNode(nodeDom, addBtn());

          if(i == 0) {
            let coverLineList = coverLine('left');
            console.log(coverLineList)
            for (let j in coverLineList) {
              appendNode(conditionDom, coverLineList[j]);
            }
          }

          if(i == conditionNode.length - 1) {
            let coverLineList = coverLine('right');
            for (let j in coverLineList) {
              appendNode(conditionDom, coverLineList[j]);
            }
          }
          if (!isEmpty(conditionItem.childNode)) {
            han(nodeDom, conditionItem.childNode)
          }

          appendNode(conditionDom, nodeDom)
          appendNode(routeDom, conditionDom);
          appendNode(routeDomBox, routeDom);
        }
        appendNode(routeDomBox, addConditionBtn());
        appendNode(routeDomBox, addBtn());
        appendNode(preEl, routeDomBox)
      }
    }

    if (cNode.type == 'start') {
      let nodeDom = newDom('div', `zq-workflow__node line-box`);
      appendNode(nodeDom, new flowDom({
        type: '1',
        value: testData.name
      }));
      appendNode(nodeDom, addBtn());
      appendNode(preEl, nodeDom)
    }

    if (cNode.type == 'approver') {
      let approverDom = newDom('div', `zq-workflow__approver line-box`);
      appendNode(approverDom, arrowTrangle());
      appendNode(approverDom, new flowDom({
        type: '2',
        value: cNode.name
      }));
      appendNode(approverDom, addBtn());
      appendNode(preEl, approverDom)
    }

    if (cNode.type == 'notifier') {
      let notifierDom = newDom('div', `zq-workflow__notifier line-box`);
      appendNode(notifierDom, arrowTrangle());
      appendNode(notifierDom, new flowDom({
        type: '3',
        value: cNode.name
      }));
      appendNode(notifierDom, addBtn());
      appendNode(preEl, notifierDom)
    }

    if (!isEmpty(cNode.childNode)) {
      han(preEl, cNode.childNode)
    }
  }

  han(el, testData);
  appendNode(el, endWorkFlow());
}


export default function (el, options) {
  let paramsAll = initElParams(el, options, defaultOptions);
  for (let i = 0, len = paramsAll.el.length; i < len; i++) {
    let elItem = paramsAll.el[i];
    flowEl(elItem)
  }


  console.log(paramsAll.el);
}