function treeDataReducer(state = {}, action) {
  switch(action.type) {
    case 'GET_TREE_DATA':
      // let newState = {data: action.payload}
      // return Object.assign(state, newState)
      return action.payload
    default:
      return state;
  }
}

export default treeDataReducer;