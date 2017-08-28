import React, { Component } from 'react';

function nodeDataReducer(state = {'state': null, 'props': null, 'address': null, 'name': null, 'debugId': null}, action) {
  switch(action.type) {
    case 'GET_NODE_DATA':
      let newState = Object.assign({}, state); 
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

export default nodeDataReducer;

