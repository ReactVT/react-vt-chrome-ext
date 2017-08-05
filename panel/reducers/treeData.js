

function treeData(state = {}, action) {
  switch(action.type) {
    case 'GET_TREE':
      const getState = Object.assign({}, state);
      getState[action.name] = Object.assign({}, action.obj);
      return getState;
    default:
      return state;
  }
}

export default treeData;