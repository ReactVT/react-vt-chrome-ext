function testResultsReducer(state = {
  assertionBlock: '',
  assertID: '', 
  expected: '', 
  comparator: '', 
  actual: '',
  result: '' 
  }, action) {

  switch(action.type) {
    case 'LOAD_RESULTS':
      console.log('in reducertest', action.payload)
      return action.payload; 
    default:
      return state;
  }
}

export default testResultsReducer;
