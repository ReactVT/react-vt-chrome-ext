function actionReducer(state = { assertID: 0, type: 'action', event: 'click', loc: [] }, action) {
  let newState;
  switch(action.type) {
    case 'SAVE_ACTION_PROPERTY':
      newState = Object.assign({}, state);
      newState[action.property] = action.value;
      return newState;
    case 'SET_ACTION_LOCATION':
      newState = Object.assign({}, state);
      newState.loc = state.loc.slice();
      newState.loc.push(action.location)
      console.log('inactionlocation reducer', newState)
      return newState;
    case 'CLEAR_ACTION':
      let oldState = Object.assign({}, state);
      newState = { assertID: oldState.assertID, type: 'action', event: 'click', loc: [] };
      return newState;
    default:
      return state;
  }
}

export default actionReducer;
