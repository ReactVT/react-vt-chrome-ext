function nodeStoreReducer(state = {
  address: {},
  id: {}, 
  class: {}, 
  node: {}, 
  tag: {} 
  }, action) {
  let newState;
  switch(action.type) {
    case 'LOAD_NODESTORE_DATA':
      return action.store; 
    default:
      return state;
  }
}

export default nodeStoreReducer;