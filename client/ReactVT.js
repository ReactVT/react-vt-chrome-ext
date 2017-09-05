import React from 'react';

import { render } from 'react-dom';


// Import Components
import ReactTree from './components/ReactTree';

// import react router deps
import { Provider } from 'react-redux';
import store from './store';
import 'semantic-ui-css/semantic.min.css';

const router = (
  <Provider store={store}>

      <ReactTree />

  </Provider>
)

render(router, document.getElementById('root'));
