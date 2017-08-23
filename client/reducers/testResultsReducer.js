function testResultsReducer(state = {
  assertionBlock: '',
  assertID: '',
  expected: '',
  comparator: '',
  actual: '',
  result: '',
  }, action) {

  switch(action.type) {
    case 'LOAD_RESULTS':
      return action.payload;
    case 'CLEAR_RESULTS':
      return {
        assertionBlock: '',
        assertID: '',
        expected: '',
        comparator: '',
        actual: '',
        result: '',
      };
    default:
      return state;
  }
}

export default testResultsReducer;
