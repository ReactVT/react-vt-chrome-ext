import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';

// import the root reducer
import rootReducer from './reducers/index';

import detailsData from './data/detailsData';
import treeData from './data/treeData';


// create an object for the default data
const defaultState = {
  posts,
  comments,
  treeData,
  detailsData
};

const store = createStore(rootReducer, defaultState)
    // compose(
    //   applyMiddleware(thunk),
    //   typeof devToolsExtension === 'function' ? devToolsExtension() : f => f
    // ));


export const history = syncHistoryWithStore(browserHistory, store);

if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
