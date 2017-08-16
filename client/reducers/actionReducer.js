function actionReducer(state = { assertID: 0, type: 'action', event: 'click', compName: '', loc: [], passed: '' }, action) {
  let newState;
  switch(action.type) {
    case 'SAVE_ACTION_PROPERTY':
      newState = Object.assign({}, state);
      newState[action.property] = action.value;
      console.log('IN SAVE ACTION PROPERTY', newState)
      return newState;
    case 'SET_ACTION_LOCATION':
      newState = Object.assign({}, state);
      newState.loc = state.loc.slice();
      newState.loc.push(action.location)
      console.log('inactionlocation reducer', newState)
      return newState;
    case 'CLEAR_ACTION':
      let oldState = Object.assign({}, state);
      newState = { assertID: oldState.assertID, type: 'action', event: 'click', compName: '', loc: [], passed: '' };
      return newState;
    default:
      return state;
  }
}

export default actionReducer;
