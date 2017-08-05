import React from 'react';

import { render } from 'react-dom';


// Import Components
import App from './components/App';

import { Provider } from 'react-redux';
import store from './store';


const router = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(router, document.getElementById('root'));
