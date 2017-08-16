export function loadTreeData(payload) {
  return {
    type: 'LOAD_TREE_DATA',
    payload
  }
}

export function loadNodeStore(store) {
  return {
    type: 'LOAD_NODESTORE_DATA', 
    store
  }
}

export function getNodeData(payload) {
  return {
    type: 'GET_NODE_DATA',
    payload
  }
}

export function selectedNode(ref) {
  return {
    type: 'SELECTED_NODE', 
    ref
  }
}


export function saveActionProperty(property, value) {
  return {
    type: 'SAVE_ACTION_PROPERTY',
    property: property,
    value: value
  }
}

export function setActionLocation(location) {
  return {
    type: 'SET_ACTION_LOCATION',
    location
  }
}

export function clearAction() {
  return {
    type: 'CLEAR_ACTION',
  }
}

export function saveTestProperty(property, value) {
  return {
    type: 'SAVE_TEST_PROPERTY',
    property: property,
    value: value
  }
}

export function setTestLocation(location) {
  return {
    type: 'SET_TEST_LOCATION',
    location
  }
}

export function clearTest() {
  return {
    type: 'CLEAR_TEST',
  }
}

export function saveAssertion(payload) {
  return {
    type: 'SAVE_ASSERTION',
    payload
  }
}

export function deleteAssertion(id) {
  return {
    type: 'DELETE_ASSERTION',
    id
  }
}

export function newAssertionBlock(name) {
  return {
    type: 'NEW_ASSERTION_BLOCK',
    name
  }
}


export function saveAssertionBlock(payload) {
  return {
    type: 'SAVE_ASSERTION_BLOCK',
    payload
  }
}

export function toggleAssertionBlock() {
  console.log('in toggle reducer');
  return {
    type: 'NEW_ASSERTION_BLOCK_TOGGLE'
  }
}


export function deleteAssertionBlock(name) {
  return {
    type: 'DELETE_ASSERTION_BLOCK',
    name
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

export function loadAssertionList(payload) {
  return {
    type: 'LOAD_ASSERTION_LIST', 
    payload
  }
}


export function renderEditMode() {
  return {
    type: 'RENDER_EDIT_BLOCK'
  }
}

export function renderActionMode() {
  return {
    type: 'RENDER_ACTION_MENU'
  }
}

export function renderTestMode() {
  return {
    type: 'RENDER_TEST_MENU'
  }
}

export function renderViewMode() {
  return {
    type: 'RENDER_VIEW_BLOCKS'
  }
}

export function renderNameAssertionMode() {
  return {
    type: 'RENDER_ASSERTION_NAME_MODE'
  }
}

export function renderTest1() {
  return {
    type: 'RENDER_TEST1_MODE'
  }
}
export function renderTest2() {
  return {
    type: 'RENDER_TEST2_MODE'
  }
}
export function renderTest3() {
  return {
    type: 'RENDER_TEST3_MODE'
  }
}

export function incrementAssertId() {
  return {
    type: 'INCREMENT_ASSERT_ID'
  }
}

export function createSearchButtons(payload) {
  return {
    type: 'SEARCH_BUTTON',
    payload
  }
}

// REMOVE THIS FOR PROD - DUMMY DATA
export function getTreeData() {
  return {
    type: 'GET_TREE_DATA'
  }
}