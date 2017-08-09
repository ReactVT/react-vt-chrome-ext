function linkDataReducer(state = [], action) {
  switch(action.type) {
    case 'GET_LINK_DATA':
      let updateArray = state.slice()
      updateArray.splice(0,1, action.payload)
      return updateArray
    default:
      return state;
  }
}

export default linkDataReducer;