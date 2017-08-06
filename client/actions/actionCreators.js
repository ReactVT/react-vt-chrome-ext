export function loadTreeData(payload) {
  return {
    type: 'LOAD_TREE_DATA',
    payload
  }
}

export function getNodeData(payload) {
  return {
    type: 'GET_NODE_DATA',
    payload
  }
}

