function errorReducer(state = false, action) {
  
    switch(action.type) {
      case 'NO_DATA':
        return 'noData';
        break;
      case 'REACT_ROUTER':
        return 'reactRouter';
        break;
      case 'NO_ERROR':
        return false;
        break;
      default:
        return state;
    }
  }
  
  export default errorReducer;
  