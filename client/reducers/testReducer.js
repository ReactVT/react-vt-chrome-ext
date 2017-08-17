function testReducer(state = { 
  assertID: 0,
  type: '',
  selector: '',
  selectorName: '',
  selectorModifier: '',
  source: '',
  property: '',
  modifier: '',
  value: '',
  dataType: '',
  compName: '',
  loc: [],
  passed: '',
}, action) {

  let newState;
  switch(action.type) {
    case 'SAVE_TEST_PROPERTY':
      newState = Object.assign({}, state);
      console.log('IN SAVE TEST PROPERTY', action)
      newState[action.property] = action.value;
      return newState;
    case 'SET_TEST_LOCATION':
      newState = Object.assign({}, state);
      newState.loc = state.loc.slice();
      newState.loc.push(action.location);
      return newState;
    case 'CLEAR_TEST':
      let oldState = Object.assign({}, state);
      newState = {
      assertID: oldState.assertID,
      type: '',
      selector: '',
      selectorName: '',
      selectorModifier: '',
      source: '',
      property: '',
      modifier: '',
      value: '',
      dataType: '',
      compName: '',
      loc: [],
      passed: '',
      }
      return newState;
    default:
      return state;
  }
}

export default testReducer;
