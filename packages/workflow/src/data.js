export default {
    "childNode": {
        "type": "route",
        "prevId": "sid-startevent",
        "nodeId": "1826_2e16",
        "conditionNodes": [
            {
                "name": "条件1",
                "type": "condition",
                "prevId": "1826_2e16",
                "nodeId": "cfc9_10e8",
                "properties": {
                    "conditions": [
                        [
                            {
                                "type": "dingtalk_actioner_dept_component_condition",
                                "paramKey": "DepartmentField-K86TXDNB",
                                "paramLabel": "部门",
                                "isEmpty": false,
                                "conds": [
                                    {
                                        "type": "dept",
                                        "value": 82187207,
                                        "attrs": {
                                            "name": "技术部",
                                            "memberCount": 8
                                        }
                                    }
                                ],
                                "valid": "valid"
                            }
                        ]
                    ]
                },
                "childNode": {
                    "name": "UNKNOWN",
                    "type": "approver",
                    "prevId": "cfc9_10e8",
                    "nodeId": "00e2_e066",
                    "properties": {
                        "activateType": "ONE_BY_ONE",
                        "agreeAll": false,
                        "actionerRules": [
                            {
                                "type": "target_approval",
                                "approvals": [
                                    {
                                        "userName": "孟琦瑞",
                                        "workNo": "manager4113"
                                    }
                                ],
                                "isEmpty": false
                            }
                        ]
                    },
                    "childNode": {
                        "name": "UNKNOWN",
                        "type": "notifier",
                        "prevId": "00e2_e066",
                        "nodeId": "8ad9_41ea",
                        "properties": {
                            "actionerRules": [
                                {
                                    "type": "target_approval",
                                    "approvals": [
                                        {
                                            "userName": "乐天",
                                            "workNo": "0933541723644313"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "name": "条件2",
                "type": "condition",
                "prevId": "1826_2e16",
                "nodeId": "299d_f823",
                "properties": {
                    "conditions": [
                        [
                            {
                                "type": "dingtalk_actioner_dept_component_condition",
                                "paramKey": "DepartmentField-K86TXDNB",
                                "paramLabel": "部门",
                                "isEmpty": false,
                                "conds": [
                                    {
                                        "type": "dept",
                                        "value": 103556081,
                                        "attrs": {
                                            "name": "人事部",
                                            "memberCount": 1
                                        }
                                    },
                                    {
                                        "type": "dept",
                                        "value": 82245206,
                                        "attrs": {
                                            "name": "市场部",
                                            "memberCount": 5
                                        }
                                    }
                                ],
                                "valid": "valid"
                            }
                        ]
                    ]
                },
                "childNode": {
                    "name": "UNKNOWN",
                    "type": "approver",
                    "prevId": "299d_f823",
                    "nodeId": "7bc5_af74",
                    "properties": {
                        "activateType": "ONE_BY_ONE",
                        "agreeAll": false,
                        "actionerRules": [
                            {
                                "type": "target_approval",
                                "approvals": [
                                    {
                                        "userName": "钟志辉",
                                        "workNo": "194835612837360497"
                                    }
                                ],
                                "isEmpty": false
                            }
                        ]
                    }
                }
            }
        ],
        "properties": {},
        "childNode": {
            "name": "UNKNOWN",
            "type": "notifier",
            "prevId": "1826_2e16",
            "nodeId": "8494_9dc1",
            "properties": {
                "actionerRules": [
                    {
                        "type": "target_approval",
                        "approvals": [
                            {
                                "userName": "钟小冰",
                                "workNo": "051130342237314656"
                            }
                        ]
                    }
                ]
            }
        }
    },
    "name": "发起人",
    "nodeId": "sid-startevent",
    "type": "start"
}