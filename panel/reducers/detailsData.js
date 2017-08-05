function detailsData(state = {}, action) {
  switch(action.type) {
    case 'GET_DETAILS_DATA':
      return {
      // take the current state
      ...state,
      // overwrite with a new one
      ...Object.values(action.detailsData.attributes)
      }
    default:
      return state;
  }
}

export default detailsData;
