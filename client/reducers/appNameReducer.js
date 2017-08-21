import React, { Component } from 'react';

function appNameReducer(state = '', action) {
  switch(action.type) {
    case 'SET_APP_NAME':
      return action.payload;
      break;
    default:
      return state;
  }
}

export default appNameReducer;