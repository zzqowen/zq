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
  isEmpty,
  isArray
} from "tools/tool";
import {
  now
} from "tools/time";
import genId from "tools/hash/hashSum";
import defaultOptions, {
  addTypeList
} from "./options";
import flowDom from './flowDom';
import testData from './data';
import popover from '@/popover'

let flowEl = (el, options) => {
  let createId = (preId, childId) => {
    let gStr = `${preId || ''}${now()}${childId || ''}`;
    return 'wf_' + genId(gStr);
  }

  let resetWorkflow = () => {
    el.innerHTML = '';
    han(el, testData);
    appendNode(el, endWorkFlow());
  }

  let initWorkFlowCondition = (data) => {
    let dataChild = data.childNode;
    if (dataChild && dataChild.type == 'route') {

      let conditionNodes = dataChild.conditionNodes;
      if (isEmpty(conditionNodes)) {
        if (isArray(conditionNodes) && conditionNodes.length == 0) delete data.conditionNodes;
      } else if (conditionNodes.length == 1) {
        function repeatChild(child) {
          if (isEmpty(child.childNode)) {
            dataChild.childNode.parentId = child.id;
            child.childNode = dataChild.childNode;
          } else {
            repeatChild(child.childNode)
          }
        }
        repeatChild(conditionNodes[0]);
        conditionNodes[0].childNode.parentId = data.id;
        data.childNode = conditionNodes[0].childNode;
      }
    }
    // console.log('可大可', data);
    return data;
  }

  let han = function (preEl, cNodeData) {
    let cNode = initWorkFlowCondition(cNodeData)
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
            type: cNode.type,
            value: conditionItem.name,
            id: conditionItem.id
          }));

          appendNode(nodeDom, addBtn(conditionItem));

          if (i == 0) {
            let coverLineList = coverLine('left');
            // console.log(coverLineList)
            for (let j in coverLineList) {
              appendNode(conditionDom, coverLineList[j]);
            }
          }

          if (i == conditionNode.length - 1) {
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
        appendNode(routeDomBox, addConditionBtn(cNode.conditionNodes, cNode.id, conditionNode.length + 1));
        if (conditionNode.length > 1) appendNode(routeDomBox, addBtn(cNode));
        appendNode(preEl, routeDomBox)
      }
    }

    if (['start', 'approver', 'notifier', 'audit'].indexOf(cNode.type) != -1) {
      let type = cNode.type;
      let name = cNode.name;
      let whetherStart = type == 'start';
      let nodeDom = newDom('div', `zq-workflow__${type} line-box`);

      if (!whetherStart) appendNode(nodeDom, arrowTrangle()); //发起人不显示箭头

      appendNode(nodeDom, new flowDom({
        type: type,
        value: name,
        closeable: !whetherStart, //发起人不显示close按钮
        id: cNode.id
      }));
      appendNode(nodeDom, addBtn(cNode)); //添加新增加号按钮
      appendNode(preEl, nodeDom)
    }

    if (!isEmpty(cNode.childNode)) {
      han(preEl, cNode.childNode)
    }
  }

  let addBtn = (parentItem) => {
    let aBBtn = newDom('div', `zq-workflow__btn_box line-box`);
    let bBtn = newDom('div', `zq-workflow__btn`);
    bBtn.innerHTML = `<div class="zq-workflow_btn_plus" slot="reference"></div>`;

    let addTypeBox = newDom('div', 'zq-workflow_add_type_box')

    for (let i = 0; i < addTypeList.length; i++) {
      let item = addTypeList[i];
      let listBtn = newDom('div', 'zq-workflow_add_type');
      listBtn.innerHTML = `<div class="zq-workflow_add_type_content zq-workflow_add_type_${item.color}"><i class="zq-workflow_type_svg">${item.svg}</i><span class="zq-workflow_add_type_txt">${item.label}</span></div>`;
      appendNode(addTypeBox, listBtn);
      addEvent(listBtn, 'click', function () {
        console.log(item, parentItem, testData);



        let eWf = {
          "name": "",
          "type": item.type,
          "parentId": parentItem.id,
          "id": createId(parentItem.id),
          "properties": {

          }
        };

        if (item.type == 'route') {

          eWf.conditionNodes = [{
            "name": "条件1",
            "type": "condition",
            "parentId": eWf.id,
            "id": createId(eWf.id),
            "properties": {

            }
          }, {
            "name": "条件2",
            "type": "condition",
            "parentId": eWf.id,
            "id": createId(eWf.id + '01'),
            "properties": {

            }
          }]

          if (!isEmpty(parentItem.childNode)) {
            parentItem.childNode.parentId = createId(eWf.id);
            eWf.conditionNodes[0].childNode = parentItem.childNode;
          }
        }

        if (isEmpty(parentItem.childNode) || item.type == 'route') {
          parentItem.childNode = eWf
        } else {
          let childN = parentItem.childNode;
          eWf.id = createId(parentItem.id, childN.id);
          childN.parentId = eWf.id;
          eWf.childNode = childN;
          parentItem.childNode = eWf;
        }

        bBtn.hide();

        resetWorkflow();
      }, 'stop');
    }
    appendNode(bBtn, addTypeBox);

    appendNode(aBBtn, popover(bBtn, {
      direction: 'right-start',
      trangleStatus: false,
      trigger: 'click'
    }));
    return aBBtn;
  }

  let addConditionBtn = (conditionArr, parentId, len) => {
    let conBtn = newDom('div', `zq-workflow__add_condition`);
    conBtn.innerText = '添加条件';

    addEvent(conBtn, 'click', function () {
      console.log(conditionArr)
      console.log(conditionArr);
      conditionArr.push({
        "name": "条件" + len,
        "type": "condition",
        "parentId": parentId,
        "id": genId(parentId + '' + len),
        "properties": {

        }
      })
      resetWorkflow();
    });
    console.log(testData)

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

  resetWorkflow();
}


export default function (el, options) {
  let paramsAll = initElParams(el, options, defaultOptions);
  for (let i = 0, len = paramsAll.el.length; i < len; i++) {
    let elItem = paramsAll.el[i];
    setClassList(elItem, 'zq-workflow-box')
    flowEl(elItem, options)
  }
}