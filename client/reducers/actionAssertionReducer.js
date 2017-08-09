function actionAssertionReducer(state = [], action) {
  switch(action.type) {
    case 'SAVE_ACTION_ASSERTION':
      let updateArray = state.slice()
      updateArray.push(action.payload)
      return updateArray
    case 'EMPTY_ACTION_ASSERTION':
      updateArray = []
      return updateArray
    default:
      return state;
  }
}

export default actionAssertionReducer;