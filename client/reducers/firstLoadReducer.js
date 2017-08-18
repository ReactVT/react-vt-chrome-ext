function firstLoadReducer(state = false, action) {

  switch(action.type) {
    case 'FIRST_LOAD':
      return true;
    case 'NOT_FIRST_LOAD':
      return false;
    default:
      return state;
  }
}

export default firstLoadReducer;
