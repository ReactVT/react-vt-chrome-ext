function testAssertionReducer(state = [], action) {
  switch(action.type) {
    case 'SAVE_TEST_ASSERTION':
      return state.concat(action.payload)
    case 'EMPTY_TEST_ASSERTION':
      updateArray = []
      return updateArray
    default:
      return state;
  }
}

export default testAssertionReducer;