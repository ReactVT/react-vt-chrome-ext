import { createStore } from 'redux';

// import the root reducer
import rootReducer from './reducers/index';

const store = createStore(rootReducer, {})

export default store;
