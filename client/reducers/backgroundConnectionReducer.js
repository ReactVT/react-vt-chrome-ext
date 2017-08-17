import React, { Component } from 'react';

function backgroundConnectionReducer(state = null, action) {
  switch(action.type) {
    case 'SET_BACKGROUND_CONNECTION':
      return action.payload;
      break;
    default:
      return state;
  }
}

export default backgroundConnectionReducer;