import React from 'react';

import { render } from 'react-dom';


// Import Components
import App from './components/App';

// import react router deps
import { Provider } from 'react-redux';
import store from './store';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const router = (
  <Provider store={store}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
)

render(router, document.getElementById('root'));
