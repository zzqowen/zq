export default {
    "name": "发起人",
    "id": "sid-startevent",
    "type": "start",
    "childNode": {
        "name": "",
        "type": "route",
        "parentId": "sid-startevent",
        "id": "wf_6bea828c",
        "properties": {},
        "conditionNodes": [
            {
                "name": "条件1",
                "type": "condition",
                "parentId": "wf_6bea828c",
                "id": "wf_61b57661",
                "properties": {},
                "childNode": {
                    "name": "",
                    "type": "approver",
                    "parentId": "wf_61b57661",
                    "id": "wf_bab579b6",
                    "properties": {}
                }
            },
            {
                "name": "条件2",
                "type": "condition",
                "parentId": "wf_6bea828c",
                "id": "wf_64d47fc0",
                "properties": {}
            }
        ]
    }
}