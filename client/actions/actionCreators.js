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

export function saveActionAssertion(payload) {
  return {
    type: 'SAVE_ACTION_ASSERTION',
    payload
  }
}

export function saveTestAssertion(payload) {
  return {
    type: 'SAVE_TEST_ASSERTION',
    payload
  }
}

export function saveAssertionBlock(payload) {
  return {
    type: 'SAVE_ASSERTION_BLOCK',
    payload
  }
}

export function sendAssertionBlock(payload) {
  return {
    type: 'SEND_ASSERTION_BLOCK',
    payload
  }
}

export function emptyAssertionBlock() {
  return {
    type: 'EMPTY_ASSERTION_BLOCK',
  }
}

export function emptyActionAssertion() {
  return {
    type: 'EMPTY_ACTION_ASSERTION',
  }
}

export function emptyTestAssertion() {
  return {
    type: 'EMPTY_TEST_ASSERTION',
  }
}

export function addAssertionToList(payload) {
  return {
    type: 'ADD_ASSERTION_TO_LIST',
    payload
  }
}

export function deleteAssertionList(payload) {
  return {
    type: 'DELETE_ASSERTION_LIST',
    payload
  }
}

export function deleteAssertionBlock(payload) {
  return {
    type: 'DELETE_ASSERTION_BLOCK',
    payload
  }
}